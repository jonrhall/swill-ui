import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import OutlinedButton from './OutlinedButton';

class HardwareTableTitle extends React.Component {
  static styles = theme => ({
    relativePosition: {
      position: 'relative'
    },
    button: {
      paddingTop: 0,
      paddingBottom: 0,
      marginRight: theme.spacing.unit * 2,
      fontWeight: 'bold'
    },
    deleteButton: {
      paddingTop: 0,
      paddingBottom: 0,
      fontWeight: 'bold',
      color: theme.palette.grey[700]
    },
    deleteButtonActive: {
      color: 'white'
    },
    buttons: {
      position: 'absolute',
      right: 0,
      bottom: theme.spacing.unit * 1.5
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    }
  });

  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string,
      buttons: PropTypes.string,
      deleteButton: PropTypes.string,
      deleteButtonActive: PropTypes.string,
      relativePosition: PropTypes.string,
      leftIcon: PropTypes.string
    }).isRequired,
    text: PropTypes.string.isRequired,
    deleteAction: PropTypes.func.isRequired,
    addAction: PropTypes.func.isRequired
  }

  state = {
    deleteToggle: false
  }

  toggleDelete = () => {
    this.setState({ deleteToggle: !this.state.deleteToggle });
    this.props.deleteAction();
  }

  render() {
    const {
      addAction,
      classes,
      text
    } = this.props;
    return (
      <div className={classes.relativePosition}>
        <Typography
          variant="display1"
          gutterBottom
          style={{ display: 'inline-block' }}
        >
          {text}
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant={this.state.deleteToggle ? 'raised' : 'outlined'}
            color={this.state.deleteToggle ? 'secondary' : 'default'}
            size="medium"
            className={classNames(
              classes.deleteButton,
              (this.state.deleteToggle ? classes.deleteButtonActive : null)
            )}
            onClick={this.toggleDelete}
          >
            <DeleteIcon className={classes.leftIcon} />
            Delete
          </Button>
          <OutlinedButton
            color="secondary"
            onClick={addAction}
            text="Add"
            icon={<AddIcon />}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(HardwareTableTitle.styles)(HardwareTableTitle);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

class TableTitle extends React.Component {
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
      marginRight: theme.spacing.unit * 2,
      fontWeight: 'bold',
      color: theme.palette.grey[700]
    },
    buttons: {
      position: 'absolute',
      right: `-${theme.spacing.unit * 2}px`,
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
      relativePosition: PropTypes.string,
      leftIcon: PropTypes.string
    }).isRequired,
    text: PropTypes.string.isRequired,
    deleteAction: PropTypes.func.isRequired,
    addAction: PropTypes.func.isRequired
  }

  render() {
    const {
      deleteAction,
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
            variant="outlined"
            color="default"
            size="medium"
            className={classes.deleteButton}
            onClick={deleteAction}
          >
            <DeleteIcon className={classes.leftIcon} />
            Delete
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            className={classes.button}
            onClick={addAction}
          >
            <AddIcon className={classes.leftIcon} />
            Add
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(TableTitle.styles)(TableTitle);

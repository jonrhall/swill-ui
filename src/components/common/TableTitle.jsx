import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class TableTitle extends React.Component {
  static styles = theme => ({
    button: {
      marginLeft: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2
    }
  });

  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string
    }).isRequired,
    text: PropTypes.string.isRequired,
    addAction: PropTypes.func.isRequired
  }

  render() {
    const { addAction, classes, text } = this.props;
    return (
      <div>
        <Typography variant="display1" gutterBottom style={{ display: 'inline-block' }}>{text}</Typography>
        <Button variant="fab" mini color="secondary" className={classes.button} onClick={addAction}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(TableTitle.styles)(TableTitle);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class MenuActionButtons extends Component {
  static style = theme => ({
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: theme.spacing.unit,
      marginRight: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit * 3,
      outline: 0
    },
    acceptButton: {
      fontWeight: 'bold'
    },
    cancelButton: {
      color: theme.palette.grey[500],
      fontWeight: 'bold'
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      actionButtons: PropTypes.string,
      acceptButton: PropTypes.string,
      cancelButton: PropTypes.string
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  }

  render() {
    const { classes, onSave, onCancel } = this.props;
    return (
      <div className={classes.actionButtons}>
        <Button
          className={classes.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          className={classes.acceptButton}
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    );
  }
}

MenuActionButtons.propTypes = {

};

export default withStyles(MenuActionButtons.style)(MenuActionButtons);

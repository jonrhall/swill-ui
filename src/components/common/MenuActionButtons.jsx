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
    button: {
      fontWeight: 'bold'
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      actionButtons: PropTypes.string,
      button: PropTypes.string
    }).isRequired,
    onSave: PropTypes.func.isRequired
  }

  render() {
    const { classes, onSave } = this.props;
    return (
      <div className={classes.actionButtons}>
        <Button
          color="secondary"
          className={classes.button}
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

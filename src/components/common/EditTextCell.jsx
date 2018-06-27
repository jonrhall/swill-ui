import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  menuContent: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 3,
    outline: 0
  },
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
  },
  textTransform: {
    textTransform: 'none'
  }
});

class EditText extends React.Component {
  state = {
    anchorEl: null,
    modalText: this.props.text
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      modalText: this.props.text
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      modalText: this.props.text
    });
  };

  handleChange = (event) => {
    this.setState({
      modalText: event.target.value
    });
  };

  saveChange = () => {
    if (this.props.text !== this.state.modalText) {
      this.props.onChange(this.state.modalText);
    }

    this.handleClose();
  };

  render() {
    const { anchorEl, modalText } = this.state;

    return (
      <TableCell>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          <Typography className={this.props.classes.textTransform}>{this.props.text}</Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <div className={this.props.classes.menuContent}>
            <TextField
              id="input-with-icon-grid"
              label="Edit name"
              helperText="Enter a name for the actor."
              margin="dense"
              value={modalText}
              onChange={this.handleChange}
            />
          </div>
          <div className={this.props.classes.actionButtons}>
            <Button
              color="secondary"
              className={this.props.classes.button}
              onClick={this.saveChange}
            >
              Save
            </Button>
          </div>
        </Menu>
      </TableCell>
    );
  }
}

EditText.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    menuContent: PropTypes.string,
    actionButtons: PropTypes.string,
    button: PropTypes.string,
    textTransform: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(EditText);

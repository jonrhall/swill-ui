import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';

import MenuActionButtons from './MenuActionButtons';
import TableCellButton from './TableCellButton';

class EditTextCell extends React.Component {
  static styles = theme => ({
    tableCell: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    menuContent: {
      margin: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 10,
      marginLeft: theme.spacing.unit * 3,
      outline: 0
    }
  })

  static propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      tableCell: PropTypes.string,
      menuContent: PropTypes.string
    }).isRequired
  }

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
      anchorEl: null
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
    const { classes, label, text } = this.props;

    return (
      <TableCell className={classes.tableCell}>
        <TableCellButton
          anchor={!!anchorEl}
          buttonText={text}
          onClick={this.handleOpen}
          menuName="edit-text-menu"
        />
        <Menu
          id="edit-text-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <div className={classes.menuContent}>
            <TextField
              id="input-with-icon-grid"
              label="Edit text"
              helperText={label}
              value={modalText}
              onChange={this.handleChange}
            />
          </div>
          <MenuActionButtons onSave={this.saveChange} onCancel={this.handleClose} />
        </Menu>
      </TableCell>
    );
  }
}

export default withStyles(EditTextCell.styles)(EditTextCell);

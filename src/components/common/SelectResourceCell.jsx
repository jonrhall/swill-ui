import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MenuActionButtons from './MenuActionButtons';
import TableCellButton from './TableCellButton';

class SelectResourceCell extends React.Component {
  static style = theme => ({
    tableCell: {
      padding: theme.spacing.unit
    },
    menuContent: {
      margin: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 10,
      marginLeft: theme.spacing.unit * 3,
      outline: 0,
      minWidth: 220
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
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      tableCell: PropTypes.string,
      menuContent: PropTypes.string,
      actionButtons: PropTypes.string,
      button: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    buttonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({})
    ]).isRequired,
    label: PropTypes.string.isRequired,
    emptyLabel: PropTypes.string,
    resourceList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired
  }

  static defaultProps = {
    emptyLabel: 'None'
  }

  state = {
    anchorEl: null,
    modalValue: this.props.value
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      modalValue: this.props.value
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleChange = (event) => {
    this.setState({
      modalValue: event.target.value
    });
  };

  saveChange = () => {
    if (this.props.value !== this.state.modalValue) {
      this.props.onChange(this.state.modalValue);
    }

    this.handleClose();
  };

  render() {
    const {
      classes,
      buttonText,
      label,
      resourceList,
      emptyLabel
    } = this.props;
    const {
      anchorEl,
      modalValue
    } = this.state;
    return (
      <TableCell className={classes.tableCell}>
        <TableCellButton
          anchor={!!anchorEl}
          buttonText={buttonText}
          onClick={this.handleOpen}
          menuName="select-resource-menu"
        />
        <Menu
          id="select-resource-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <FormControl className={classes.menuContent}>
            <InputLabel htmlFor="resource-choice">Select a resource</InputLabel>
            <Select
              value={modalValue}
              onChange={this.handleChange}
              inputProps={{
                name: 'resource',
                id: 'resource-choice'
              }}
            >
              <MenuItem value="">
                <em>{emptyLabel}</em>
              </MenuItem>
              {resourceList.map(({ id, name }) => (
                <MenuItem value={id.toString()} key={id}>{name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{label}</FormHelperText>
          </FormControl>
          <MenuActionButtons onSave={this.saveChange} onCancel={this.handleClose} />
        </Menu>
      </TableCell>
    );
  }
}

export default withStyles(SelectResourceCell.style)(SelectResourceCell);

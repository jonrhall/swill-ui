import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

class SelectResourceCell extends React.Component {
  static style = theme => ({
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
    },
    textTransform: {
      textTransform: 'none'
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      menuContent: PropTypes.string,
      actionButtons: PropTypes.string,
      button: PropTypes.string,
      textTransform: PropTypes.string
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
      <TableCell>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          <Typography className={classes.textTransform}>{buttonText}</Typography>
        </Button>
        <Menu
          id="simple-menu"
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
          <div className={classes.actionButtons}>
            <Button
              color="secondary"
              className={classes.button}
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

export default withStyles(SelectResourceCell.style)(SelectResourceCell);

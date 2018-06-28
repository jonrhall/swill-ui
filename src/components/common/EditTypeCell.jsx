import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GenerateTypeInputs from './GenerateTypeInputs';

const styles = theme => ({
  menuContent: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 3,
    outline: 0
  },
  formControl: {
    minWidth: 180
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

const generateDefaults = (actorType) => {
  const defaults = {};

  actorType.properties.forEach((prop) => {
    let defaultValue;

    switch (prop.type) {
      case 'number':
        defaultValue = 0;
        break;
      case 'select':
        [defaultValue] = prop.options;
        break;
      default:
        defaultValue = '';
    }

    defaults[prop.name] = defaultValue;
  });

  return defaults;
};

class EditTypeCell extends React.Component {
  constructor(props) {
    super(props);
    const actorType = props.options.find(option => option.name === this.props.type);

    this.state = {
      actorType,
      modalProperties: generateDefaults(actorType),
      anchorEl: null,
      modalType: props.type
    };
  }

  handleOpen = (event) => {
    const actorType = this.props.options.find(option => option.name === this.props.type);

    this.setState({
      anchorEl: event.currentTarget,
      actorType,
      modalType: this.props.type,
      modalProperties: generateDefaults(actorType)
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleTypeChange = (event) => {
    const actorType = this.props.options.find(option => option.name === event.target.value);

    this.setState({
      actorType,
      modalProperties: generateDefaults(actorType),
      modalType: event.target.value
    });
  };

  handleModalPropChange = (value) => {
    this.setState({ modalProperties: value });
  }

  saveChange = () => {
    if (this.props.type !== this.state.modalType) {
      this.props.onChange(this.state.modalType);
    }

    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <TableCell>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          <Typography className={this.props.classes.textTransform}>{this.props.type}</Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <div className={this.props.classes.menuContent}>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor="type-input">Edit Type</InputLabel>
              <Select
                value={this.state.modalType}
                onChange={this.handleTypeChange}
                inputProps={{
                  name: 'type',
                  id: 'type-input'
                }}
              >
                {this.props.options.map(({ name }) => (
                  <MenuItem value={name} key={name}>{name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{this.props.label}</FormHelperText>
            </FormControl>
            <GenerateTypeInputs
              type={this.state.actorType}
              values={this.state.modalProperties}
              onChange={this.handleModalPropChange}
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

EditTypeCell.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // This is validated in a higher order component
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string
  })).isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    menuContent: PropTypes.string,
    actionButtons: PropTypes.string,
    button: PropTypes.string,
    textTransform: PropTypes.string,
    formControl: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(EditTypeCell);

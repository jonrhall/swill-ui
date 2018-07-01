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

class EditTypeCell extends React.Component {
  static styles = theme => ({
    menuContent: {
      margin: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 10,
      marginLeft: theme.spacing.unit * 3,
      outline: 0,
      width: 360
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

  // Helper function for deep-comparing the values (but not references)
  // of two objects with nested properties.
  static jsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  static propTypes = {
    type: PropTypes.string.isRequired,
    config: PropTypes.shape({}).isRequired,
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
  }

  constructor(props) {
    super(props);
    const resourceType = props.options.find(option => option.name === this.props.type);

    this.state = {
      resourceType,
      modalProperties: this.generateConfig(resourceType),
      anchorEl: null,
      modalType: props.type
    };
  }

  // Function for generating a type's property values
  generateConfig = (resourceType) => {
    const config = {};

    resourceType.properties.forEach((prop) => {
      if (this.props.config[prop.name]) {
        config[prop.name] = this.props.config[prop.name];
      } else {
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

        config[prop.name] = defaultValue;
      }
    });

    return config;
  };

  handleOpen = (event) => {
    const resourceType = this.props.options.find(option => option.name === this.props.type);

    this.setState({
      anchorEl: event.currentTarget,
      resourceType,
      modalType: this.props.type,
      modalProperties: this.generateConfig(resourceType)
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleTypeChange = (event) => {
    const resourceType = this.props.options.find(option => option.name === event.target.value);

    this.setState({
      resourceType,
      modalProperties: this.generateConfig(resourceType),
      modalType: event.target.value
    });
  };

  handleModalPropChange = (value) => {
    this.setState({ modalProperties: Object.assign({}, this.state.modalProperties, value) });
  }

  saveChange = () => {
    // If the type of the resource is different, or the configuration is different,
    // emit a change event.
    if (this.props.type !== this.state.modalType ||
      !this.constructor.jsonEqual(
        this.generateConfig(this.state.resourceType),
        this.state.modalProperties
      )) {
      this.props.onChange(this.state.modalType, this.state.modalProperties);
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
            <FormControl>
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
              type={this.state.resourceType}
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

export default withStyles(EditTypeCell.styles)(EditTypeCell);

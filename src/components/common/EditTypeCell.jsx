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

import GenerateTypeInputs from './GenerateTypeInputs';
import MenuActionButtons from './MenuActionButtons';
import TableCellButton from './TableCellButton';
import TypeDescription from './TypeDescription';

class EditTypeCell extends React.Component {
  static styles = theme => ({
    menuContent: {
      margin: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 10,
      marginLeft: theme.spacing.unit * 3,
      outline: 0,
      width: 280
    }
  })

  // Helper function for deep-comparing the values (but not references)
  // of two objects with nested properties.
  static jsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  static propTypes = {
    type: PropTypes.string.isRequired,
    config: PropTypes.shape({}),
    onChange: PropTypes.func.isRequired,
    // This is validated in a higher order component
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired,
    label: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      menuContent: PropTypes.string
    }).isRequired
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    const resourceType = this.findResourceType();

    this.state = {
      resourceType,
      modalProperties: this.generateConfig(resourceType),
      anchorEl: null,
      modalType: props.type
    };
  }

  findResourceType = (comparator = option => option.name === this.props.type) => {
    let resourceType = this.props.options.find(comparator);

    if (!resourceType) {
      resourceType = { properties: [] };
    }

    return resourceType;
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
    const resourceType = this.findResourceType();

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
    const resourceType = this.findResourceType(option => option.name === event.target.value);

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
    const {
      anchorEl,
      modalType,
      resourceType,
      modalProperties
    } = this.state;
    const {
      classes,
      config,
      type,
      label,
      options
    } = this.props;
    return (
      <TableCell>
        <TableCellButton
          anchor={!!anchorEl}
          buttonText={type || <em>None</em>}
          onClick={this.handleOpen}
          menuName="edit-type-menu"
        />
        {type ? <TypeDescription values={config} emptyText="No associated config." /> : null}
        <Menu
          id="edit-type-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <div className={classes.menuContent}>
            <FormControl>
              <InputLabel htmlFor="type-input">Edit Type</InputLabel>
              <Select
                value={modalType}
                onChange={this.handleTypeChange}
                inputProps={{
                  name: 'type',
                  id: 'type-input'
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {options.map(({ name }) => (
                  <MenuItem value={name} key={name}>{name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{label}</FormHelperText>
            </FormControl>
            <GenerateTypeInputs
              type={resourceType}
              values={modalProperties}
              onChange={this.handleModalPropChange}
            />
          </div>
          <MenuActionButtons onSave={this.saveChange} onCancel={this.handleClose} />
        </Menu>
      </TableCell>
    );
  }
}

export default withStyles(EditTypeCell.styles)(EditTypeCell);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import { setValue } from '../../actions/config';
import { getKettles } from '../../actions/kettles';
import { getTypes } from '../../actions/steps';
import SystemSettingsRow from './SystemSettingsRow';
import EditTextCell from '../common/EditTextCell';
import SelectResourceCell from '../common/SelectResourceCell';

class SystemSettingsList extends React.Component {
  static mapStateToProps = state => ({
    stepTypes: state.steps.stepTypes,
    stepsLoading: state.steps.loadingTypes,
    kettles: state.kettles.kettles,
    kettlesLoading: state.kettles.loadingList
  })

  static mapDispatchToProps = dispatch => ({
    loadStepTypes: () => dispatch(getTypes()),
    loadKettles: () => dispatch(getKettles()),
    setValue: (property, value) => dispatch(setValue(property, value))
  })

  static styles = theme => ({
    root: {
      marginBottom: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    tableCell: {
      paddingRight: 0
    },
    header: {
      fontWeight: 'bold',
      color: theme.palette.grey[500],
      marginBottom: theme.spacing.unit * 1.5
    }
  })

  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    })).isRequired,
    loadStepTypes: PropTypes.func.isRequired,
    stepTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    stepsLoading: PropTypes.bool.isRequired,
    loadKettles: PropTypes.func.isRequired,
    kettles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.name
    })).isRequired,
    kettlesLoading: PropTypes.bool.isRequired,
    setValue: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (this.props.stepTypes.length < 1 && !this.props.stepsLoading) {
      this.props.loadStepTypes();
    }

    if (this.props.kettles.length < 1 && !this.props.kettlesLoading) {
      this.props.loadKettles();
    }
  }

  // Generates display text for the cell given a list and a prop to use as the id
  buttonText = (list, prop, label) => {
    const resource = list.find(({ id }) =>
      id.toString() === prop) || {};
    return resource.name || (<em>{`No ${label}`}</em>);
  }

  editProperty = property => value => this.props.setValue(property, value)

  generateCell = (property) => {
    const { classes, kettles, stepTypes } = this.props;
    const editValue = this.editProperty(property);

    switch (property.type) {
      case 'text':
      case 'number':
        return (
          <EditTextCell text={property.value} onChange={editValue} />
        );
      case 'step':
        return (
          <SelectResourceCell
            value={property.value}
            buttonText={property.value}
            label="Select step type."
            resourceList={stepTypes}
            onChange={editValue}
          />
        );
      case 'select':
        return (
          <SelectResourceCell
            value={property.value}
            buttonText={property.value}
            resourceList={property.options.map(o => ({ name: o.toString() }))}
            onChange={editValue}
          />
        );
      case 'kettle':
        return (
          <SelectResourceCell
            value={property.value}
            buttonText={this.buttonText(kettles, property.value, 'kettle')}
            label="Select kettle."
            resourceList={kettles}
            onChange={editValue}
          />
        );
      default:
        return (
          <TableCell className={classes.tableCell}>
            {property.value}
          </TableCell>
        );
    }
  }

  render() {
    const {
      classes,
      label,
      list
    } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="button"
          className={classes.header}
        >
          {label} ({list.length})
        </Typography>
        <Paper className={classes.root}>
          <Table>
            <TableBody>
              {list.map(property => (
                <SystemSettingsRow
                  name={property.label}
                  description={property.description}
                  key={property.name}
                >
                  {this.generateCell(property)}
                </SystemSettingsRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default connect(
  SystemSettingsList.mapStateToProps,
  SystemSettingsList.mapDispatchToProps
)(withStyles(SystemSettingsList.styles)(SystemSettingsList));

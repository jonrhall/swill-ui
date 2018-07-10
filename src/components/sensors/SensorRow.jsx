import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  editSensorName,
  editSensorType,
  removeSensor
} from '../../actions/sensors';
import EditTextCell from '../common/EditTextCell';
import EditTypeCell from '../common/EditTypeCell';
import RemoveResourceCell from '../common/RemoveResourceCell';

class SensorRow extends React.Component {
  static styles = theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static mapStateToProps = () => ({})

  static mapDispatchToProps = dispatch => ({
    editName: (sensor, name) => dispatch(editSensorName(sensor, name)),
    editType: (sensor, type, config) => dispatch(editSensorType(sensor, type, config)),
    removeSensor: sensor => dispatch(removeSensor(sensor))
  })

  static propTypes = {
    sensor: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      state: PropTypes.bool,
      agitator: PropTypes.string
    }).isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    deleteMode: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
      row: PropTypes.string
    }).isRequired,
    editName: PropTypes.func.isRequired,
    editType: PropTypes.func.isRequired,
    removeSensor: PropTypes.func.isRequired
  }

  editField = func => (...props) => func(this.props.sensor, ...props);

  render() {
    const {
      sensor,
      classes,
      types,
      deleteMode,
      editName,
      editType
    } = this.props;
    return (
      <TableRow className={classes.row} key={sensor.id}>
        {deleteMode ?
          <RemoveResourceCell
            onClick={this.editField(this.props.removeSensor)}
          /> : null}
        <EditTextCell
          text={sensor.name}
          onChange={this.editField(editName)}
          label="Enter a name for the sensor."
        />
        <EditTypeCell
          type={sensor.type}
          config={sensor.config}
          options={types}
          onChange={this.editField(editType)}
          label="Choose a type for the sensor."
        />
      </TableRow>
    );
  }
}

export default connect(
  SensorRow.mapStateToProps,
  SensorRow.mapDispatchToProps
)(withStyles(SensorRow.styles)(SensorRow));

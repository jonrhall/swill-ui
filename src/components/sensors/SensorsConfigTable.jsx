import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import { getSensors, getSensorTypes, createSensor } from '../../actions/sensors';
import SensorRow from './SensorRow';
import TableHeader from '../common/TableHeader';
import TableTitle from '../common/TableTitle';

class SensorsConfigTable extends React.Component {
  static styles = theme => ({
    root: {
      marginBottom: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static mapStateToProps = state => ({
    sensorList: state.sensors.sensors,
    sensorTypes: state.sensors.types
  })

  static mapDispatchToProps = dispatch => ({
    getSensors: () => dispatch(getSensors()),
    getSensorTypes: () => dispatch(getSensorTypes()),
    addSensor: () => dispatch(createSensor())
  })

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string
    }).isRequired,
    sensorList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    sensorTypes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      properties: PropTypes.arrayOf(PropTypes.shape({
        configurable: PropTypes.bool,
        description: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    })).isRequired,
    getSensors: PropTypes.func.isRequired,
    getSensorTypes: PropTypes.func.isRequired,
    addSensor: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (this.props.sensorList.length < 1) {
      this.props.getSensors();
    }

    if (this.props.sensorTypes.length < 1) {
      this.props.getSensorTypes();
    }
  }

  render() {
    const {
      addSensor,
      classes,
      sensorList,
      sensorTypes
    } = this.props;
    return (
      <React.Fragment>
        <TableTitle text="Sensors" addAction={addSensor} />
        <Paper className={classes.root}>
          <Table>
            <TableHeader columns={['Name', 'Type', 'Remove']} />
            <TableBody>
              {sensorList.map(sensor => (
                <SensorRow key={sensor.id} sensor={sensor} types={sensorTypes} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default connect(
  SensorsConfigTable.mapStateToProps,
  SensorsConfigTable.mapDispatchToProps
)(withStyles(SensorsConfigTable.styles)(SensorsConfigTable));

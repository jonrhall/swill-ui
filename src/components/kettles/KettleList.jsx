import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { getActors } from '../../actions/actors';
import { getKettles } from '../../actions/kettles';
import { getSensors } from '../../actions/sensors';
import KettleCardButtons from './KettleCardButtons';
import KettleCardContent from './KettleCardContent';

class KettleList extends React.Component {
  static styles = theme => ({
    card: {
      position: 'relative'
    },
    cardHighlight: {
      background: theme.palette.primary.light
    }
  })

  static mapStateToProps = (state) => {
    const activeStep = state.steps.steps.find(step => step.state === 'A');
    const activeKettle = activeStep ? activeStep.config.kettle : null;
    const activeTimer = (activeStep && activeStep.stepstate && activeStep.stepstate.timer_end) ?
      new Date(1000 * activeStep.stepstate.timer_end) : null;

    return {
      actors: state.actors.actors,
      kettles: state.kettles.kettles,
      sensors: state.sensors.sensors,
      tempUnit: state.appState.config.find(prop => prop.name === 'unit').value,
      activeKettle,
      activeTimer
    };
  }

  static mapDispatchToProps = dispatch => ({
    getActors: () => dispatch(getActors()),
    getKettles: () => dispatch(getKettles()),
    getSensors: () => dispatch(getSensors())
  })

  static propTypes = {
    activeKettle: PropTypes.string,
    activeTimer: PropTypes.shape({}),
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      cardHighlight: PropTypes.string.isRequired
    }).isRequired,
    actors: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      state: PropTypes.number
    })).isRequired,
    getActors: PropTypes.func.isRequired,
    kettles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      target_temp: PropTypes.number,
      agitator: PropTypes.string,
      heater: PropTypes.string
    })).isRequired,
    getKettles: PropTypes.func.isRequired,
    sensors: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      instance: PropTypes.shape({})
    })).isRequired,
    getSensors: PropTypes.func.isRequired,
    tempUnit: PropTypes.string.isRequired
  }

  static defaultProps = {
    activeKettle: null,
    activeTimer: null
  }

  componentWillMount() {
    if (this.props.actors.length < 1) {
      this.props.getActors();
    }

    if (this.props.kettles.length < 1) {
      this.props.getKettles();
    }

    if (this.props.sensors.length < 1) {
      this.props.getSensors();
    }
  }

  getUnit = () => <React.Fragment>&#176;{this.props.tempUnit}</React.Fragment>

  getKettleTemp = (sensorId) => {
    const sensor = this.props.sensors.find(s => s.id.toString() === sensorId.toString());

    if (sensor) {
      const { value, unit } = sensor.instance;
      return `${value}${unit}`;
    }

    return <React.Fragment>Nil{this.getUnit()}</React.Fragment>;
  }

  getUnit = () => <React.Fragment>&#176;{this.props.tempUnit}</React.Fragment>

  render() {
    const {
      actors,
      activeKettle,
      activeTimer,
      classes,
      kettles
    } = this.props;
    return (
      <Grid container spacing={24}>
        {kettles.map(kettle => (
          <Grid item zeroMinWidth xs={12} md={6} lg={4} key={kettle.id}>
            <Card className={classNames(
              classes.card,
              activeKettle === kettle.id.toString() ? classes.cardHighlight : null
            )}
            >
              <KettleCardButtons
                actors={actors}
                kettle={kettle}
              />
              <KettleCardContent
                kettle={kettle}
                activeKettle={activeKettle}
                activeTimer={activeTimer}
                sensor={this.props.sensors.find(s => s.id.toString() === kettle.sensor.toString())}
                tempUnit={this.getUnit()}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default connect(
  KettleList.mapStateToProps,
  KettleList.mapDispatchToProps
)(withStyles(KettleList.styles)(KettleList));

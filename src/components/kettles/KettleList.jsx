import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GamesIcon from '@material-ui/icons/Games';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import Button from '@material-ui/core/Button';

import ActionToggle from '../common/ActionToggle';
import { getActors } from '../../actions/actors';
import { getKettles } from '../../actions/kettles';
import { getSensors } from '../../actions/sensors';

class KettleList extends React.Component {
  static styles = theme => ({
    card: {
      position: 'relative'
    },
    buttonWrapper: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit * 1.5,
      minWidth: 70
    },
    chartIcon: {
      fontSize: 36,
      color: theme.palette.text.secondary
    },
    topLeft: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    kettleTitle: {
      marginTop: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 2
    },
    actualTemp: {
      fontSize: '3.6rem',
      fontFamily: 'Share',
      lineHeight: '2.6rem'
    },
    targetTemp: {
      marginBottom: theme.spacing.unit * 7,
      display: 'flex',
      fontSize: '1.6rem',
      fontFamily: 'Share',
      justifyContent: 'center',
      position: 'relative',
      right: '0.4rem'
    },
    targetTempText: {
      position: 'relative',
      bottom: '0.4rem',
      paddingLeft: theme.spacing.unit,
      fontSize: '2rem'
    }
  })

  static mapStateToProps = state => ({
    actors: state.actors.actors,
    kettles: state.kettles.kettles,
    sensors: state.sensors.sensors,
    tempUnit: state.appState.config.find(prop => prop.name === 'unit').value
  })

  static mapDispatchToProps = dispatch => ({
    getActors: () => dispatch(getActors()),
    getKettles: () => dispatch(getKettles()),
    getSensors: () => dispatch(getSensors())
  })

  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string,
      chartIcon: PropTypes.string,
      kettleTitle: PropTypes.string,
      actualTemp: PropTypes.string,
      targetTemp: PropTypes.string,
      targetTempText: PropTypes.string
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

  getActorState = (actorId) => {
    const actor = this.props.actors.find(a => a.id.toString() === actorId.toString());

    if (actor) {
      return !!actor.state;
    }

    return false;
  }

  render() {
    const { classes, kettles } = this.props;
    return (
      <Grid container spacing={24}>
        {kettles.map(kettle => (
          <Grid item zeroMinWidth xs={12} md={6} lg={4} key={kettle.id}>
            <Card className={classes.card}>
              <div className={classes.topLeft}>
                <Button className={classes.buttonWrapper}>
                  <AssessmentIcon className={classes.chartIcon} />
                </Button>
              </div>
              <ActionToggle
                checked={kettle.state}
                text="Auto"
                alignment="topRight"
              />
              <ActionToggle
                checked={this.getActorState(kettle.agitator)}
                text="Agitator"
                alignment="bottomLeft"
              />
              <ActionToggle
                checked={this.getActorState(kettle.heater)}
                text="Heater"
                alignment="bottomRight"
              />
              <CardContent>
                <Typography className={classes.kettleTitle} color="textSecondary" align="center">
                  {kettle.name}
                </Typography>
                <Typography className={classes.actualTemp} variant="title" gutterBottom align="center">
                  {this.getKettleTemp(kettle.sensor)}
                </Typography>
                <Typography className={classes.targetTemp} color="textSecondary" align="center">
                  <GamesIcon />
                  <span className={classes.targetTempText}>
                    {kettle.target_temp}{this.getUnit()}
                  </span>
                </Typography>
              </CardContent>
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

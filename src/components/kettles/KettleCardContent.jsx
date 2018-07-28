import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GamesIcon from '@material-ui/icons/Games';

import CountdownTimer from '../common/CountdownTimer';

class KettleCardContent extends React.Component {
  static styles = theme => ({
    countdown: {
      position: 'absolute',
      top: theme.spacing.unit * 3,
      left: 'calc(50% - 2.6rem)',
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      fontSize: '1.6rem',
      textShadow: '0 0 1px black',
      fontFamily: 'Share'
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

  static propTypes = {
    activeKettle: PropTypes.string,
    activeTimer: PropTypes.shape({}),
    classes: PropTypes.shape({}).isRequired,
    kettle: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      target_temp: PropTypes.number,
      agitator: PropTypes.string,
      heater: PropTypes.string
    }).isRequired,
    sensor: PropTypes.shape({
      instance: PropTypes.shape({
        value: PropTypes.string,
        unit: PropTypes.string
      })
    }),
    tempUnit: PropTypes.node.isRequired
  }

  static defaultProps = {
    activeKettle: null,
    activeTimer: null,
    sensor: null
  }

  getKettleTemp = () => {
    const { sensor, tempUnit } = this.props;

    if (sensor) {
      const { value, unit } = sensor.instance;
      return `${value}${unit}`;
    }

    return <React.Fragment>Nil{tempUnit}</React.Fragment>;
  }

  render() {
    const {
      activeKettle,
      activeTimer,
      classes,
      kettle,
      tempUnit
    } = this.props;
    return (
      <CardContent>
        {activeKettle === kettle.id.toString() && activeTimer ?
          <CountdownTimer fromDate={activeTimer} className={classes.countdown} /> : null}
        <Typography className={classes.kettleTitle} color="textSecondary" align="center">
          {kettle.name}
        </Typography>
        <Typography className={classes.actualTemp} variant="title" gutterBottom align="center">
          {this.getKettleTemp()}
        </Typography>
        <Typography className={classes.targetTemp} color="textSecondary" align="center">
          <GamesIcon />
          <span className={classes.targetTempText}>
            {kettle.target_temp}{tempUnit}
          </span>
        </Typography>
      </CardContent>
    );
  }
}

export default withStyles(KettleCardContent.styles)(KettleCardContent);

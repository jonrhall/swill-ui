import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import Button from '@material-ui/core/Button';

import {
  switchKettleOff,
  switchKettleOn
} from '../../actions/kettles';
import {
  switchActorOff,
  switchActorOn
} from '../../actions/actors';
import ActionToggle from '../common/ActionToggle';

class KettleCardButtons extends React.Component {
  static styles = theme => ({
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
    }
  })

  static propTypes = {
    actors: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number
    })).isRequired,
    classes: PropTypes.shape({
      buttonWrapper: PropTypes.string.isRequired,
      chartIcon: PropTypes.string.isRequired,
      topLeft: PropTypes.string.isRequired
    }).isRequired,
    kettle: PropTypes.shape({
      agitator: PropTypes.string,
      heater: PropTypes.string,
      state: PropTypes.bool.isRequired
    }).isRequired
  }

  getActorState = (actorId) => {
    const actor = this.props.actors.find(a => a.id.toString() === actorId.toString());

    if (actor) {
      return !!actor.state;
    }

    return false;
  }

  toggleKettleAuto = kettle => () => {
    if (kettle.state) {
      switchKettleOff(kettle);
    } else {
      switchKettleOn(kettle);
    }
  }

  toggleActor = actorId => () => {
    const actor = this.props.actors.find(a => a.id.toString() === actorId.toString());

    if (actor.state) {
      switchActorOff(actor);
    } else {
      switchActorOn(actor);
    }
  }

  render() {
    const { classes, kettle } = this.props;
    return (
      <React.Fragment>
        <div className={classes.topLeft}>
          <Button className={classes.buttonWrapper}>
            <AssessmentIcon className={classes.chartIcon} />
          </Button>
        </div>
        <ActionToggle
          checked={kettle.state}
          text="Auto"
          alignment="topRight"
          onClick={this.toggleKettleAuto(kettle)}
        />
        {kettle.agitator ? (
          <ActionToggle
            checked={this.getActorState(kettle.agitator)}
            text="Agitator"
            alignment="bottomLeft"
            onClick={this.toggleActor(kettle.agitator)}
          />
        ) : null}
        {kettle.heater ? (
          <ActionToggle
            checked={this.getActorState(kettle.heater)}
            text="Heater"
            alignment="bottomRight"
            onClick={this.toggleActor(kettle.heater)}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default withStyles(KettleCardButtons.styles)(KettleCardButtons);

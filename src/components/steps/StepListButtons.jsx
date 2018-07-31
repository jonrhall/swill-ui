import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import StartIcon from '@material-ui/icons/PlayArrow';
import NextButtonIcon from '@material-ui/icons/SkipNext';
import RestartIcon from '@material-ui/icons/Replay';
import StopIcon from '@material-ui/icons/Stop';
import FinishIcon from '@material-ui/icons/Done';

import {
  startSteps,
  nextStep,
  restartStep,
  resetSteps
} from '../../actions/steps';
import OutlinedButton from '../common/OutlinedButton';

class StepListButtons extends React.Component {
  static mapStateToProps = (state) => {
    const disabledList = {
      play: false,
      reset: false,
      next: false,
      stop: false
    };

    let inProgress = false;
    let lastStep = false; // eslint-disable-line

    state.steps.steps.forEach((step, index) => {
      if (step.state === 'A') {
        inProgress = true;
      }

      if (step.state === 'A' && index === (state.steps.steps.length - 1)) {
        lastStep = true;
      }
    });

    if (inProgress) {
      disabledList.play = true;

      if (lastStep) {
        disabledList.next = true;
      }
    } else {
      disabledList.reset = true;
      disabledList.next = true;
      disabledList.stop = true;
    }

    return {
      disabledList,
      inProgress,
      lastStep
    };
  }

  static mapDispatchToProps = dispatch => ({
    startSteps: () => dispatch(startSteps()),
    nextStep: () => dispatch(nextStep()),
    restartStep: () => dispatch(restartStep()),
    resetSteps: () => dispatch(resetSteps())
  })

  static styles = theme => ({
    stepButtons: {
      paddingBottom: theme.spacing.unit
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      stepButtons: PropTypes.string
    }).isRequired,
    disabledList: PropTypes.shape({
      play: PropTypes.bool,
      reset: PropTypes.bool,
      next: PropTypes.bool,
      stop: PropTypes.bool
    }).isRequired,
    lastStep: PropTypes.bool.isRequired,
    inProgress: PropTypes.bool.isRequired,
    startSteps: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    restartStep: PropTypes.func.isRequired,
    resetSteps: PropTypes.func.isRequired
  }

  render() {
    const {
      classes,
      disabledList,
      inProgress,
      lastStep
    } = this.props;
    return (
      <div className={classes.stepButtons}>
        <OutlinedButton
          icon={<StartIcon color={inProgress ? 'inherit' : 'secondary'} />}
          onClick={this.props.startSteps}
          disabled={disabledList.play}
        />
        <OutlinedButton
          icon={<RestartIcon />}
          onClick={this.props.restartStep}
          disabled={disabledList.reset}
        />
        <OutlinedButton
          icon={<NextButtonIcon />}
          onClick={this.props.nextStep}
          disabled={disabledList.next}
        />
        <OutlinedButton
          icon={lastStep ? <FinishIcon color="secondary" /> : <StopIcon />}
          onClick={this.props.resetSteps}
          disabled={disabledList.stop}
        />
      </div>
    );
  }
}

export default connect(
  StepListButtons.mapStateToProps,
  StepListButtons.mapDispatchToProps
)(withStyles(StepListButtons.styles)(StepListButtons));

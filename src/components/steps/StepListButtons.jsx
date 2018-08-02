import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import StartIcon from '@material-ui/icons/PlayArrow';
import NextButtonIcon from '@material-ui/icons/SkipNext';
import PreviousButtonIcon from '@material-ui/icons/SkipPrevious';
import RestartIcon from '@material-ui/icons/Replay';
import StopIcon from '@material-ui/icons/Stop';
import FinishIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import {
  editSteps,
  startSteps,
  previousStep,
  nextStep,
  restartStep,
  resetSteps
} from '../../actions/steps';
import OutlinedButton from '../common/OutlinedButton';

class StepListButtons extends React.Component {
  static mapStateToProps = (state) => {
    const disabledList = {
      previous: false,
      reset: false,
      next: false,
      stop: false
    };

    let inProgress = false;
    let currentStep = null;
    let lastStep = false; // eslint-disable-line

    state.steps.steps.forEach((step, index) => {
      if (step.state === 'A') {
        inProgress = true;
        currentStep = index;
      }

      if (step.state === 'A' && index === (state.steps.steps.length - 1)) {
        lastStep = true;
      }
    });

    if (inProgress) {
      if (currentStep === 0) {
        disabledList.previous = true;
      }

      if (lastStep) {
        disabledList.next = true;
      }
    } else {
      disabledList.previous = true;
      disabledList.reset = true;
      disabledList.next = true;
      disabledList.stop = true;
    }

    return {
      currentStep,
      disabledList,
      inProgress,
      lastStep,
      editMode: state.steps.editing,
      steps: state.steps.steps
    };
  }

  static mapDispatchToProps = dispatch => ({
    startSteps: () => dispatch(startSteps()),
    previousStep: previousStepId => dispatch(previousStep(previousStepId)),
    nextStep: () => dispatch(nextStep()),
    restartStep: () => dispatch(restartStep()),
    resetSteps: () => dispatch(resetSteps()),
    editSteps: editMode => dispatch(editSteps(editMode))
  })

  static styles = theme => ({
    stepButtons: {
      paddingBottom: theme.spacing.unit
    },
    doubleWide: {
      width: `calc(50% - ${theme.spacing.unit}px)`,
      marginLeft: theme.spacing.unit
    },
    quarterWide: {
      width: `calc(25% - ${theme.spacing.unit}px)`
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      stepButtons: PropTypes.string,
      doubleWide: PropTypes.string,
      quarterWide: PropTypes.string
    }).isRequired,
    disabledList: PropTypes.shape({
      play: PropTypes.bool,
      reset: PropTypes.bool,
      next: PropTypes.bool,
      stop: PropTypes.bool
    }).isRequired,
    currentStep: PropTypes.number,
    editMode: PropTypes.bool.isRequired,
    lastStep: PropTypes.bool.isRequired,
    inProgress: PropTypes.bool.isRequired,
    startSteps: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    restartStep: PropTypes.func.isRequired,
    resetSteps: PropTypes.func.isRequired,
    editSteps: PropTypes.func.isRequired
  }

  static defaultProps = {
    currentStep: 0
  }

  stepEditMode = () => {
    this.props.editSteps(!this.props.editMode);
  }

  previous = previousStepId => () => {
    this.props.previousStep(previousStepId);
  }

  render() {
    const {
      classes,
      currentStep,
      disabledList,
      editMode,
      inProgress,
      lastStep
    } = this.props;
    return (
      <div className={classes.stepButtons}>
        {inProgress ? (
          <React.Fragment>
            <OutlinedButton
              icon={<PreviousButtonIcon />}
              onClick={this.previous(currentStep)}
              disabled={disabledList.previous}
              className={classes.quarterWide}
            />
            <OutlinedButton
              icon={<RestartIcon />}
              onClick={this.props.restartStep}
              disabled={disabledList.reset}
              className={classes.quarterWide}
            />
            <OutlinedButton
              icon={<NextButtonIcon />}
              onClick={this.props.nextStep}
              disabled={disabledList.next}
              className={classes.quarterWide}
            />
            <OutlinedButton
              icon={lastStep ? <FinishIcon color="secondary" /> : <StopIcon />}
              onClick={this.props.resetSteps}
              disabled={disabledList.stop}
              className={classes.quarterWide}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <OutlinedButton
              icon={<StartIcon color={editMode ? 'inherit' : 'secondary'} />}
              onClick={this.props.startSteps}
              disabled={editMode}
              className={classes.doubleWide}
              text="Start"
            />
            {editMode ? (
              <OutlinedButton
                icon={<FinishIcon color="secondary" />}
                className={classes.doubleWide}
                onClick={this.stepEditMode}
                text="Finish"
              />
            ) : (
              <OutlinedButton
                icon={<EditIcon />}
                className={classes.doubleWide}
                onClick={this.stepEditMode}
                text="Edit"
              />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  StepListButtons.mapStateToProps,
  StepListButtons.mapDispatchToProps
)(withStyles(StepListButtons.styles)(StepListButtons));

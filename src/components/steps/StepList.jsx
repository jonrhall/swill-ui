import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import { getSteps } from '../../actions/steps';
import ActiveStepContent from './ActiveStepContent';
import StepListButtons from './StepListButtons';

class StepList extends React.Component {
  static stepTypes = {
    BoilStep: 'Boil Step',
    ChilStep: 'Chill Step',
    MashInStep: 'Mash-in Step',
    MashStep: 'Mash Step',
    PumpStep: 'Pump Step'
  }

  static translateStepType = type => StepList.stepTypes[type] || type

  static mapStateToProps = state => ({
    loading: state.steps.loadingList,
    stepList: state.steps.steps,
    tempUnit: (
      <React.Fragment>
        &#176;{state.appState.config.find(prop => prop.name === 'unit').value}
      </React.Fragment>
    )
  })

  static mapDispatchToProps = dispatch => ({
    getSteps: () => dispatch(getSteps())
  })

  static styles = theme => ({
    secondary: {
      color: `${theme.palette.secondary.main} !important`
    },
    stepper: {
      backgroundColor: 'transparent',
      padding: 0
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      secondary: PropTypes.string,
      stepper: PropTypes.string
    }).isRequired,
    stepList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      state: PropTypes.string,
      start: PropTypes.number,
      stepstate: PropTypes.shape({
        timer_end: PropTypes.number,
        temp: PropTypes.string
      })
    })).isRequired,
    getSteps: PropTypes.func.isRequired,
    tempUnit: PropTypes.node.isRequired
  }

  componentWillMount() {
    if (this.props.stepList.length < 1) {
      this.props.getSteps();
    }
  }

  getStepTemp = (step) => {
    if (step.stepstate) {
      return step.stepstate.temp;
    }

    return step.config.temp;
  }

  parseTimer = () => {
    let timer = null;
    this.props.stepList.some((step) => {
      if (step.stepstate && step.stepstate.timer_end) {
        timer = new Date(1000 * step.stepstate.timer_end);
        return true;
      }

      return false;
    });

    return timer;
  }

  render() {
    const {
      classes,
      stepList,
      tempUnit
    } = this.props;
    const currentStep = stepList.find(step => step.state === 'A');
    const timer = this.parseTimer();
    let activeStep = 99;

    if (currentStep) {
      activeStep = currentStep.order - 1;
    }

    return (
      <React.Fragment>
        <StepListButtons />
        <Stepper
          activeStep={activeStep}
          className={classes.stepper}
          orientation="vertical"
        >
          {stepList.map((step) => {
            const labelProps = {
              StepIconProps: {
                classes: {
                  active: classes.secondary
                }
              },
              optional: (
                <React.Fragment>
                  <Typography variant="caption">{StepList.translateStepType(step.type)}</Typography>
                  <Typography variant="caption">Set Temp: {this.getStepTemp(step)}{tempUnit}</Typography>
                </React.Fragment>
              )
            };
            return (
              <Step key={step.name} completed={step.state === 'D'} active={step.state === 'A'}>
                <StepLabel {...labelProps}>{step.name}</StepLabel>
                <ActiveStepContent step={step} timer={timer} />
              </Step>
            );
          })}
        </Stepper>
      </React.Fragment>
    );
  }
}

export default connect(
  StepList.mapStateToProps,
  StepList.mapDispatchToProps
)(withStyles(StepList.styles)(StepList));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getSteps } from '../../actions/steps';

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

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
    stepList: state.steps.steps
  })

  static mapDispatchToProps = dispatch => ({
    getSteps: () => dispatch(getSteps())
  })

  static styles = theme => ({
    button: {
      marginRight: theme.spacing.unit
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    next: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      color: theme.palette.grey[400]
    },
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
      next: PropTypes.string,
      secondary: PropTypes.string,
      stepper: PropTypes.string
    }).isRequired,
    stepList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    getSteps: PropTypes.func.isRequired
  }

  state = {
    activeStep: 0
  };

  componentWillMount() {
    if (this.props.stepList.length < 1) {
      this.props.getSteps();
    }
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  }

  render() {
    const { classes, stepList } = this.props;
    const currentStep = stepList.find(step => step.state === 'A');
    let activeStep = 99;

    if (currentStep) {
      activeStep = currentStep.order - 1;
    }

    return (
      <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          className={classes.stepper}
          orientation="vertical"
        >
          {stepList.map((label) => {
            const labelProps = {
              StepIconProps: {
                classes: {
                  active: classes.secondary
                }
              },
              optional: <Typography variant="caption">{StepList.translateStepType(label.type)}</Typography>
            };
            return (
              <Step key={label.name} completed={label.state === 'D'} active={label.state === 'A'}>
                <StepLabel {...labelProps}>{label.name}</StepLabel>
                <StepContent>
                  <Typography>Timer: 00:00:00</Typography>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === stepList.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === stepList.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  StepList.mapStateToProps,
  StepList.mapDispatchToProps
)(withStyles(StepList.styles)(StepList));

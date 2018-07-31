import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

class ActiveStepContent extends React.Component {
  static styles = () => ({
  })

  static propTypes = {
    step: PropTypes.shape({}).isRequired,
    timer: PropTypes.shape({})
  }

  static defaultProps = {
    timer: null
  }

  render() {
    const { step, timer } = this.props;
    return (
      <StepContent {...this.props}>
        <Typography variant="caption">Start: {new Date(1000 * step.start).toLocaleTimeString()}</Typography>
        {timer ? <Typography variant="caption">Approx. End: {timer.toLocaleTimeString()}</Typography> : null}
      </StepContent>
    );
  }
}

export default withStyles(ActiveStepContent.styles)(ActiveStepContent);

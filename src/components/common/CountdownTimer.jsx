import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class CountdownTimer extends React.Component {
  static prependZero = num => (num < 10 ? `0${num}` : num.toString())

  static propTypes = {
    fromDate: PropTypes.shape({}).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      timer: this.generateCountdown()
    };

    setInterval(() => {
      this.setState({
        timer: this.generateCountdown()
      });
    }, 1000);
  }

  generateCountdown = () => {
    const t = (Date.parse(this.props.fromDate) - Date.parse(new Date())) / 1000;
    const hours = CountdownTimer.prependZero(Math.floor((t / 3600) % 60));
    const minutes = CountdownTimer.prependZero(Math.floor((t / 60) % 60));
    const seconds = CountdownTimer.prependZero(Math.floor(t % 60));
    return `${hours}:${minutes}:${seconds}`;
  }

  render() {
    const { fromDate, ...props } = this.props;
    const { timer } = this.state;
    return (
      <Typography {...props}>{timer}</Typography>
    );
  }
}

export default withStyles(CountdownTimer.styles)(CountdownTimer);

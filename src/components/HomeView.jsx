import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class HomeView extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <div>
        <Typography variant="headline" gutterBottom>{this.props.location.pathname}</Typography>
        <div><Typography variant="body1" gutterBottom>Welcome to Swill UI!</Typography></div>
        <Link to="/ferment"><Typography variant="button" gutterBottom>Ferment</Typography></Link>
      </div>
    );
  }
}

export default HomeView;

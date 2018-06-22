import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const HomeView = props => (
  <div>
    <Typography variant="headline" gutterBottom>{props.location.pathname}</Typography>
    <div><Typography variant="body1" gutterBottom>Welcome to Swill UI!</Typography></div>
    <Link to="/fermentation"><Typography variant="button" gutterBottom>Fermentation</Typography></Link>
  </div>
);

HomeView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default HomeView;

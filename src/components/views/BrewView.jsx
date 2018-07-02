import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import PageHeader from '../common/PageHeader';

class HomeView extends React.Component {
  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <div className={this.props.classes.margin}>
        <PageHeader text="Brew" />
        <Typography variant="headline" gutterBottom>{this.props.location.pathname}</Typography>
        <div><Typography variant="body1" gutterBottom>Welcome to Swill UI!</Typography></div>
        <Link to="/ferment"><Typography variant="button" gutterBottom>Ferment</Typography></Link>
      </div>
    );
  }
}

export default withStyles(HomeView.styles)(HomeView);

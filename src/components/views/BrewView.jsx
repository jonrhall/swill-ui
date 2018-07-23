import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PageHeader from '../common/PageHeader';
import StepList from '../steps/StepList';

class HomeView extends React.Component {
  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <div className={this.props.classes.margin}>
        <PageHeader text="Brew" />
        <Grid container spacing={24}>
          <Grid item xs={9}>
            Some content
          </Grid>
          <Grid item xs={3}>
            <StepList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(HomeView.styles)(HomeView);

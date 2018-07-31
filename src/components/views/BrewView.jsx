import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PageHeader from '../common/PageHeader';
import KettleList from '../kettles/KettleList';
import StepList from '../steps/StepList';

class HomeView extends React.Component {
  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    },
    rightSide: {
      position: 'relative',
      bottom: theme.spacing.unit * 2
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string,
      rightSide: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <div className={this.props.classes.margin}>
        <PageHeader text="Brew" />
        <Grid container spacing={24}>
          <Grid item xs={9}>
            <KettleList />
          </Grid>
          <Grid item xs={3} className={this.props.classes.rightSide}>
            <StepList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(HomeView.styles)(HomeView);

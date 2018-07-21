import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PageHeader from '../common/PageHeader';
import SystemActions from '../system/SystemActions';
import SystemSettings from '../system/SystemSettings';

class SystemView extends React.Component {
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
    const { classes } = this.props;
    return (
      <div className={classes.margin}>
        <PageHeader text="System" />
        <SystemActions />
        <SystemSettings />
      </div>
    );
  }
}

export default withStyles(SystemView.styles)(SystemView);

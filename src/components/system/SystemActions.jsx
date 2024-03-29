import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import RefreshIcon from '@material-ui/icons/Refresh';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import SyncIcon from '@material-ui/icons/Sync';
import { Typography } from '@material-ui/core';

import OutlinedButton from '../common/OutlinedButton';
import SystemCard from './SystemCard';

class SystemActions extends React.Component {
  static mapStateToProps = () => ({})

  static mapDispatchToProps = () => ({})

  static styles = theme => ({
    marginBottom: {
      marginBottom: theme.spacing.unit * 2
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      marginBottom: PropTypes.string
    }).isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="display1"
          gutterBottom
        >
          Actions
        </Typography>
        <Grid container spacing={16} className={classes.marginBottom}>
          <SystemCard
            typeheader="System action"
            header="Shutdown RaspberryPi"
            subheader="Shut down the entire system that CrafBeerPi is installed on."
            button={<OutlinedButton color="secondary" text="Shutdown" icon={<PowerIcon />} />}
          />
          <SystemCard
            typeheader="System action"
            header="Restart RaspberryPi"
            subheader="Restart the entire system that CrafBeerPi is installed on."
            button={<OutlinedButton color="secondary" text="Restart" icon={<RefreshIcon />} />}
          />
          <SystemCard
            typeheader="CBPi action"
            header="Pull CraftBeerPi Update"
            subheader="Check for updates on Github and pull them down for installation."
            button={<OutlinedButton color="secondary" text="Pull" icon={<SyncIcon />} />}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  SystemActions.mapStateToProps,
  SystemActions.mapDispatchToProps
)(withStyles(SystemActions.styles)(SystemActions));

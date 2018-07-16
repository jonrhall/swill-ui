import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

class LogExpansionPanel extends React.Component {
  static styles = theme => ({
    expansionDetails: {
      padding: theme.spacing.unit * 3,
      borderTop: `1px solid ${theme.palette.secondary.light}`,
      backgroundColor: theme.palette.grey[100]
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      expansionDetails: PropTypes.string
    }).isRequired,
    log: PropTypes.shape({
      dateModified: PropTypes.shape({})
    }).isRequired
  }

  render() {
    const { classes, log } = this.props;
    return (
      <ExpansionPanelDetails className={classes.expansionDetails}>
        <Typography>
          {log.dateModified.toString()}
        </Typography>
      </ExpansionPanelDetails>
    );
  }
}

export default withStyles(LogExpansionPanel.styles)(LogExpansionPanel);

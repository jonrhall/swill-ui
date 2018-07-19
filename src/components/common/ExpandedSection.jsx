import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';

class ExpandedSection extends React.Component {
  static styles = theme => ({
    expansionDetails: {
      padding: theme.spacing.unit * 3,
      borderTop: `1px solid ${theme.palette.secondary.light}`
    },
    secondPanel: {
      borderLeft: `1px solid ${theme.palette.grey[500]}`
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      expansionDetails: PropTypes.string,
      secondPanel: PropTypes.string
    }).isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired
  }

  render() {
    const { classes, children } = this.props;
    return (
      <ExpansionPanelDetails className={classes.expansionDetails}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            {children[0]}
          </Grid>
          <Grid className={classes.secondPanel} item xs={6}>
            {children[1]}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    );
  }
}

export default connect(
  ExpandedSection.mapStateToProps,
  ExpandedSection.mapDispatchToProps
)(withStyles(ExpandedSection.styles)(ExpandedSection));

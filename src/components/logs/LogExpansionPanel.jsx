import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { deleteLog } from '../../actions/logs';

class LogExpansionPanel extends React.Component {
  static mapStateToProps = () => ({})

  static mapDispatchToProps = dispatch => ({
    deleteLog: name => dispatch(deleteLog(name))
  })

  static styles = theme => ({
    expansionDetails: {
      padding: theme.spacing.unit * 3,
      borderTop: `1px solid ${theme.palette.secondary.light}`
    },
    secondPanel: {
      borderLeft: `1px solid ${theme.palette.grey[500]}`
    },
    bold: {
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing.unit
    },
    button: {
      paddingTop: 0,
      paddingBottom: 0,
      marginLeft: theme.spacing.unit * 2,
      fontWeight: 'bold',
      color: theme.palette.grey[700]
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      expansionDetails: PropTypes.string,
      secondPanel: PropTypes.string,
      bold: PropTypes.string,
      button: PropTypes.string,
      leftIcon: PropTypes.string
    }).isRequired,
    log: PropTypes.shape({
      name: PropTypes.string,
      dateModified: PropTypes.shape({}),
      href: PropTypes.string
    }).isRequired,
    deleteLog: PropTypes.func.isRequired
  }

  delete = () => this.props.deleteLog(this.props.log.name)

  render() {
    const { classes, log } = this.props;
    return (
      <ExpansionPanelDetails className={classes.expansionDetails}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Typography className={classes.bold}>
              Date Modified
            </Typography>
            <Typography>
              {log.dateModified.toString()}
            </Typography>
          </Grid>
          <Grid className={classes.secondPanel} item xs={6}>
            <Button
              variant="outlined"
              color="default"
              size="medium"
              className={classes.button}
              onClick={this.delete}
            >
              <DeleteIcon className={classes.leftIcon} />
              Delete
            </Button>
            <Button
              variant="outlined"
              color="default"
              size="medium"
              className={classes.button}
              href={log.href}
            >
              <CloudDownloadIcon className={classes.leftIcon} />
              Download
            </Button>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    );
  }
}

export default connect(
  LogExpansionPanel.mapStateToProps,
  LogExpansionPanel.mapDispatchToProps
)(withStyles(LogExpansionPanel.styles)(LogExpansionPanel));

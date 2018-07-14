import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class LogSection extends React.Component {
  static styles = theme => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing.unit * 5
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    expansionDetails: {
      padding: theme.spacing.unit * 3,
      borderTop: `1px solid ${theme.palette.secondary.light}`,
      backgroundColor: theme.palette.grey[100]
    },
    activeColor: {
      color: theme.palette.primary.main
    }
  })

  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    header: PropTypes.string.isRequired,
    logList: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }

  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes, header, logList } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <Typography
          variant="display1"
          gutterBottom
        >
          {header}
        </Typography>
        {logList.length > 0 ? logList.map((log, index) => (
          <ExpansionPanel
            expanded={expanded === `panel-${index}`}
            onChange={this.handleChange(`panel-${index}`)}
            key={log.name}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classNames(
                classes.heading,
                (expanded === `panel-${index}` ? classes.activeColor : null)
              )}
              >
                {log.name}
              </Typography>
              <Typography className={classes.secondaryHeading}>{log.size}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionDetails}>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam. <br />
                {log.dateModified.toString()}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )) : (
          <Typography gutterBottom variant="caption">{`No ${header} logs`}</Typography>
        )}
      </div>
    );
  }
}

export default withStyles(LogSection.styles)(LogSection);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LogTitleDetail from './LogTitleDetail';
import LogExpansionPanel from './LogExpansionPanel';

class LogSection extends React.Component {
  static styles = theme => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing.unit * 5
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      fontWeight: 'bold',
      color: theme.palette.grey[700]
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

  convertName = (name) => {
    const match = /^(.+)_(\d+).log$/.exec(name);

    if (match) {
      const resource = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      return `${resource} ${match[2]}`;
    }

    if (name === 'app.log') {
      return 'Application log';
    }

    return name;
  }

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
        {logList.length > 0 ? logList.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }).map(log => (
          <ExpansionPanel
            expanded={expanded === `panel-${log.name}`}
            onChange={this.handleChange(`panel-${log.name}`)}
            key={log.name}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classNames(
                classes.heading,
                (expanded === `panel-${log.name}` ? classes.activeColor : null)
              )}
              >
                {this.convertName(log.name)}
              </Typography>
              <LogTitleDetail label="Size" text={log.size} />
              <LogTitleDetail label="Name" text={log.name} />
            </ExpansionPanelSummary>
            <LogExpansionPanel log={log} />
          </ExpansionPanel>
        )) : (
          <Typography gutterBottom variant="caption">{`No ${header} logs`}</Typography>
        )}
      </div>
    );
  }
}

export default withStyles(LogSection.styles)(LogSection);

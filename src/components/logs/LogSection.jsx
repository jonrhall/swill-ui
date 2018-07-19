import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LogExpandedSection from './LogExpandedSection';
import ExpandableSection from '../common/ExpandableSection';

class LogSection extends React.Component {
  static styles = theme => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing.unit * 5
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
        {logList.length > 0 ? logList.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }).map(log => (
          <ExpandableSection
            name={this.convertName(log.name)}
            titleDetails={[
              { label: 'Size', text: log.size },
              { label: 'Name', text: log.name }
            ]}
            expanded={expanded === `panel-${log.name}`}
            onClick={this.handleChange(`panel-${log.name}`)}
            key={log.name}
          >
            <LogExpandedSection log={log} />
          </ExpandableSection>
        )) : (
          <Typography gutterBottom variant="caption">{`No ${header} logs`}</Typography>
        )}
      </div>
    );
  }
}

export default withStyles(LogSection.styles)(LogSection);

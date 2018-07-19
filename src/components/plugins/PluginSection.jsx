import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import PluginExpandedSection from './PluginExpandedSection';
import ExpandableSection from '../common/ExpandableSection';

class PluginSection extends React.Component {
  static styles = theme => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing.unit * 3
    },
    header: {
      fontWeight: 'bold',
      color: theme.palette.grey[500],
      marginBottom: theme.spacing.unit * 1.5
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      header: PropTypes.string
    }).isRequired,
    header: PropTypes.string.isRequired,
    pluginList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    filter: PropTypes.string.isRequired
  }

  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  filterPlugins = pluginArr =>
    pluginArr.filter(plugin =>
      plugin.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) > -1)

  render() {
    const { classes, header, pluginList } = this.props;
    const { expanded } = this.state;
    const filteredList = this.filterPlugins(pluginList);
    const filtered = this.props.filter.length > 0;
    const count = filtered ? `(${filteredList.length}/${pluginList.length})` : `(${pluginList.length})`;
    return (
      <div className={classes.root}>
        <Typography
          variant="button"
          className={classes.header}
        >
          {header} {count}
        </Typography>
        {filteredList.length > 0 ? filteredList.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }).map(plugin => (
          <ExpandableSection
            name={plugin.name}
            titleDetails={[
              { label: 'Author', text: plugin.author }
            ]}
            expanded={expanded === `panel-${plugin.name}`}
            onClick={this.handleChange(`panel-${plugin.name}`)}
            key={plugin.name}
          >
            <PluginExpandedSection plugin={plugin} />
          </ExpandableSection>
        )) : null}
      </div>
    );
  }
}

export default withStyles(PluginSection.styles)(PluginSection);

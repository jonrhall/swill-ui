import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getPlugins } from '../../actions/plugins';
import PageHeader from '../common/PageHeader';
import PluginSection from '../plugins/PluginSection';
import SearchField from '../common/SearchField';

class PluginsView extends React.Component {
  static mapStateToProps = state => ({
    loading: state.plugins.loadingList,
    pluginList: state.plugins.plugins
  })

  static mapDispatchToProps = dispatch => ({
    getPlugins: () => dispatch(getPlugins())
  })

  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    },
    filterFields: {
      display: 'flex',
      marginBottom: theme.spacing.unit * 3
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string,
      filterFields: PropTypes.string,
      textField: PropTypes.string
    }).isRequired,
    pluginList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired,
    loading: PropTypes.bool.isRequired,
    getPlugins: PropTypes.func.isRequired
  }

  state = {
    searchText: ''
  }

  componentWillMount() {
    this.props.getPlugins();
  }

  setSearchText = (event) => {
    this.setState({
      searchText: event.target.value
    });
  }

  render() {
    const { classes, loading, pluginList } = this.props;
    const { searchText } = this.state;
    const installedPlugins = [];
    const otherPlugins = [];

    pluginList.forEach((plugin) => {
      if (plugin.installed) {
        installedPlugins.push(plugin);
      } else {
        otherPlugins.push(plugin);
      }
    });

    return (
      <div className={classes.margin}>
        <PageHeader text="Plugins" />
        {loading ? 'Loading' : (
          <React.Fragment>
            <div className={classes.filterFields}>
              <SearchField value={searchText} onChange={this.setSearchText} />
            </div>
            <PluginSection
              header="Installed"
              pluginList={installedPlugins}
              filter={searchText}
            />
            <PluginSection
              header="Not Installed"
              pluginList={otherPlugins}
              filter={searchText}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  PluginsView.mapStateToProps,
  PluginsView.mapDispatchToProps
)(withStyles(PluginsView.styles)(PluginsView));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import { installPlugin, updatePlugin, deletePlugin } from '../../actions/plugins';
import ExpandedSection from '../common/ExpandedSection';
import ExpandableSectionDetail from '../common/ExpandableSectionDetail';
import OutlinedButton from '../common/OutlinedButton';

class PluginExpandedSection extends React.Component {
  static mapStateToProps = () => ({})

  static mapDispatchToProps = dispatch => ({
    installPlugin: name => dispatch(installPlugin(name)),
    updatePlugin: name => dispatch(updatePlugin(name)),
    deletePlugin: name => dispatch(deletePlugin(name))
  })

  static styles = theme => ({
    leftIcon: {
      marginRight: theme.spacing.unit
    }
  })

  static propTypes = {
    plugin: PropTypes.shape({
      name: PropTypes.string,
      api: PropTypes.number
    }).isRequired,
    installPlugin: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    updatePlugin: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    deletePlugin: PropTypes.func.isRequired // eslint-disable-line react/no-unused-prop-types
  }

  pluginAction = func => () => this.props[func](this.props.plugin.name)

  render() {
    const {
      plugin
    } = this.props;
    return (
      <ExpandedSection>
        <React.Fragment>
          <ExpandableSectionDetail label="Description" text={plugin.description} />
          <ExpandableSectionDetail
            label="Repo URL"
            text={<a target="blank" href={plugin.repo_url}>{plugin.repo_url}</a>}
          />
          <ExpandableSectionDetail label="API Version" text={plugin.api} />
        </React.Fragment>
        <React.Fragment>
          {plugin.installed ? (
            <React.Fragment>
              <OutlinedButton
                onClick={this.pluginAction('deletePlugin')}
                text="Delete"
                icon={<DeleteIcon />}
              />
              <OutlinedButton
                onClick={this.pluginAction('updatePlugin')}
                text="Update"
                icon={<SyncIcon />}
              />
            </React.Fragment>
          ) : (
            <OutlinedButton
              onClick={this.pluginAction('installPlugin')}
              text="Install"
              icon={<SaveAltIcon />}
            />
          )}
        </React.Fragment>
      </ExpandedSection>
    );
  }
}

export default connect(
  PluginExpandedSection.mapStateToProps,
  PluginExpandedSection.mapDispatchToProps
)(withStyles(PluginExpandedSection.styles)(PluginExpandedSection));

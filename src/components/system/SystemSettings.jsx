import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import SystemSettingsList from './SystemSettingsList';

class SystemSettings extends React.Component {
  static mapStateToProps = state => ({
    settings: state.appState.config
  })

  static mapDispatchToProps = () => ({})

  static categories = {
    core: {
      brew_name: null,
      brewery_name: null,
      buzzer: null,
      donation_notification: null,
      port: 'Server Port',
      unit: 'Unit of Temperature'
    },
    other: {
      actor_cols: 'Actor Columns',
      buzzer_beep_level: 'Buzzer Noise Level',
      kettle_cols: 'Kettle Columns',
      sensor_cols: 'Sensor Columns',
      setup: 'Setup Dialog',
      step_boil: 'Default Boil Step',
      step_boil_kettle: 'Default Boil Kettle',
      step_chil: 'Default Chill Step',
      step_mash: 'Default Mash Step',
      step_mash_kettle: 'Default Mash Tun',
      step_mashin: 'Default Mash In Step'
    }
  }

  static transformName = (name) => {
    if (SystemSettings.categories.core[name]) {
      return SystemSettings.categories.core[name];
    }

    if (SystemSettings.categories.other[name]) {
      return SystemSettings.categories.other[name];
    }

    try {
      return name
        .split('_')
        .map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
        .join(' ');
    } catch (e) {
      return name;
    }
  }

  static listByName = (a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  }

  static propTypes = {
    settings: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      value: PropTypes.string
    })).isRequired
  }

  render() {
    const { settings } = this.props;
    const parsedSettings = settings.map(setting => Object.assign({}, setting, {
      label: SystemSettings.transformName(setting.name)
    })).sort(SystemSettings.listByName);
    const coreSettings = [];
    const otherSettings = [];
    const pluginSettings = [];

    parsedSettings.forEach((setting) => {
      if (SystemSettings.categories.core[setting.name] !== undefined) {
        coreSettings.push(setting);
      } else if (SystemSettings.categories.other[setting.name] !== undefined) {
        otherSettings.push(setting);
      } else {
        pluginSettings.push(setting);
      }
    });

    return (
      <React.Fragment>
        <Typography
          variant="display1"
          gutterBottom
        >
          Settings
        </Typography>
        <SystemSettingsList label="Core" list={coreSettings} />
        {pluginSettings.length > 0 ?
          <SystemSettingsList label="Plugins" list={pluginSettings} /> : null}
        <SystemSettingsList label="Other" list={otherSettings} />
      </React.Fragment>
    );
  }
}

export default connect(
  SystemSettings.mapStateToProps,
  SystemSettings.mapDispatchToProps
)(SystemSettings);

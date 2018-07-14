import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getLogs } from '../../actions/logs';
import PageHeader from '../common/PageHeader';
import LogSection from '../logs/LogSection';

class LogsView extends React.Component {
  static mapStateToProps = state => ({
    loading: state.logs.loadingList,
    logList: state.logs.logs.map((log) => {
      const [dateStr] = /^\d+-\d+-\d+\s\d+:\d+:\d+/.exec(log['last-modified']);
      return {
        name: log.name,
        size: `${Math.ceil(log['content-length'] / 100000)}mb`,
        dateModified: new Date(dateStr)
      };
    })
  })

  static mapDispatchToProps = dispatch => ({
    getLogs: () => dispatch(getLogs())
  })

  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    logList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      'content-length': PropTypes.string
    })).isRequired,
    getLogs: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getLogs();
  }

  render() {
    const kettleLogs = [];
    const fermenterLogs = [];
    const sensorLogs = [];
    const appLogs = [];

    this.props.logList.forEach((log) => {
      if (/^kettle/.test(log.name)) {
        kettleLogs.push(log);
      } else if (/^fermenter/.test(log.name)) {
        fermenterLogs.push(log);
      } else if (/^sensor/.test(log.name)) {
        sensorLogs.push(log);
      } else {
        appLogs.push(log);
      }
    });

    return (
      <div className={this.props.classes.margin}>
        <PageHeader text="Logs" />
        {this.props.loading ? 'Loading' : (
          <React.Fragment>
            <LogSection header="App" logList={appLogs} />
            <LogSection header="Sensors" logList={sensorLogs} />
            <LogSection header="Kettles" logList={kettleLogs} />
            <LogSection header="Fermenters" logList={fermenterLogs} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  LogsView.mapStateToProps,
  LogsView.mapDispatchToProps
)(withStyles(LogsView.styles)(LogsView));

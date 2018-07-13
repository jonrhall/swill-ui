import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getLogs } from '../../actions/logs';
import PageHeader from '../common/PageHeader';

class LogsView extends React.Component {
  static mapStateToProps = state => ({
    loading: state.logs.loadingList,
    logList: state.logs.logs
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
    getLogs: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getLogs();
  }

  render() {
    return (
      <div className={this.props.classes.margin}>
        <PageHeader text="Logs" />
        {this.props.loading ? 'Loading' : 'Got Logs!'}
      </div>
    );
  }
}

export default connect(
  LogsView.mapStateToProps,
  LogsView.mapDispatchToProps
)(withStyles(LogsView.styles)(LogsView));

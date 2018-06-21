import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppView from '../components/AppView';
import { loadAppConfig } from '../actions';

class App extends React.Component {
  async componentWillMount() {
    this.props.loadAppConfig();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {this.props.appLoading ?
          <h2>Loading...</h2> :
          <AppView />
        }
      </React.Fragment>
    );
  }
}

App.propTypes = {
  appLoading: PropTypes.bool.isRequired,
  loadAppConfig: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appLoading: state.appState.loading
});

const mapDispatchToProps = dispatch => ({
  loadAppConfig: () => dispatch(loadAppConfig())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

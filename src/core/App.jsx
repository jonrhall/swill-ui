import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import lightBlue from '@material-ui/core/colors/lightBlue';
import deepOrange from '@material-ui/core/colors/deepOrange';

import AppView from '../core/AppView';
import { loadAppConfig } from '../actions';

// Theme: https://goo.gl/2FQxdQ
const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[800],
      contrastText: '#fff'
    },
    secondary: {
      main: deepOrange[400],
      contrastText: '#fff'
    }
  }
});

class App extends React.Component {
  async componentWillMount() {
    this.props.loadAppConfig();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          {this.props.appLoading ?
            <h2>Loading...</h2> :
            <AppView />
          }
        </React.Fragment>
      </MuiThemeProvider>
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

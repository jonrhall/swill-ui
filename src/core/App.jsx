import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import lightBlue from '@material-ui/core/colors/lightBlue';
import deepOrange from '@material-ui/core/colors/deepOrange';

import AppViews from '../core/AppViews';
import { loadAppConfig } from '../actions';

class App extends React.Component {
  static mapStateToProps = state => ({
    appLoading: state.appState.loading
  })

  static mapDispatchToProps = dispatch => ({
    loadAppConfig: () => dispatch(loadAppConfig())
  })

  static propTypes = {
    appLoading: PropTypes.bool.isRequired,
    loadAppConfig: PropTypes.func.isRequired
  }

  async componentWillMount() {
    this.props.loadAppConfig();
  }

  // Theme: https://goo.gl/2FQxdQ
  theme = createMuiTheme({
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
  })

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <React.Fragment>
          <CssBaseline />
          {this.props.appLoading ?
            <h2>Loading...</h2> :
            <AppViews />
          }
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  App.mapStateToProps,
  App.mapDispatchToProps
)(App);

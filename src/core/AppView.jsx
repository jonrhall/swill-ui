import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import { connectSdk, openMenu, closeMenu } from '../actions';
import HomeView from '../components/HomeView';
import HardwareView from '../components/HardwareView';

class AppView extends React.Component {
  static styles = theme => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    },
    routes: {
      position: 'absolute',
      overflow: 'auto',
      height: 'calc(100% - 64px)',
      width: 'calc(100% - 72px)'
    }
  })

  static mapStateToProps = state => ({
    drawerExpanded: state.appState.menuOpen,
    breweryName: state.appState.breweryName
  })

  static mapDispatchToProps = (dispatch) => {
    connectSdk(dispatch);

    return {
      openDrawer: () => dispatch(openMenu()),
      closeDrawer: () => dispatch(closeMenu())
    };
  }

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      content: PropTypes.string,
      toolbar: PropTypes.string,
      routes: PropTypes.string
    }).isRequired,
    drawerExpanded: PropTypes.bool.isRequired,
    openDrawer: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    breweryName: PropTypes.string.isRequired
  }

  render() {
    const {
      breweryName,
      classes,
      closeDrawer,
      drawerExpanded,
      openDrawer
    } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <AppBar
            expanded={drawerExpanded}
            openDrawer={openDrawer}
            name={breweryName}
          />
          <AppDrawer expanded={drawerExpanded} closeDrawer={closeDrawer} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.routes}>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/brew" />}
              />
              <Route
                exact
                path="/brew"
                component={HomeView}
              />
              <Route
                exact
                path="/hardware"
                component={HardwareView}
              />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(AppView.styles, { withTheme: true })(connect(
  AppView.mapStateToProps,
  AppView.mapDispatchToProps
)(AppView));

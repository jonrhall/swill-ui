import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import { connectSdk, openMenu, closeMenu } from '../actions';
import Views from '../components/views';

class AppViews extends React.Component {
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
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
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

  static routes = [
    { path: '/brew', component: Views.BrewView },
    { path: '/dashboard', component: Views.DashboardView },
    { path: '/ferment', component: Views.FermentView },
    { path: '/hardware', component: Views.HardwareView },
    { path: '/logs', component: Views.LogsView },
    { path: '/plugins', component: Views.PluginsView },
    { path: '/system', component: Views.SystemView }
  ]

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
            <div className={classes.routes} style={{ width: drawerExpanded ? 'calc(100% - 220px)' : 'calc(100% - 72px)' }}>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/brew" />}
              />
              {this.constructor.routes.map(({ path, component }) => (
                <Route
                  exact
                  path={path}
                  component={component}
                  key={path}
                />
              ))}
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(AppViews.styles, { withTheme: true })(connect(
  AppViews.mapStateToProps,
  AppViews.mapDispatchToProps
)(AppViews));

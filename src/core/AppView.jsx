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

const styles = theme => ({
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const AppView = props => (
  <Router>
    <div className={props.classes.root}>
      <AppBar
        expanded={props.drawerExpanded}
        openDrawer={props.openDrawer}
        name={props.breweryName}
      />
      <AppDrawer expanded={props.drawerExpanded} closeDrawer={props.closeDrawer} />
      <main className={props.classes.content}>
        <div className={props.classes.toolbar} />
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
      </main>
    </div>
  </Router>
);

AppView.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    content: PropTypes.string,
    toolbar: PropTypes.string
  }).isRequired,
  drawerExpanded: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  breweryName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  drawerExpanded: state.appState.menuOpen,
  breweryName: state.appState.breweryName
});

const mapDispatchToProps = (dispatch) => {
  connectSdk(dispatch);

  return {
    openDrawer: () => dispatch(openMenu()),
    closeDrawer: () => dispatch(closeMenu())
  };
};

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView));

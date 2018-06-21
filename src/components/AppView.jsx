import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppDrawer from './AppDrawer';
import { getActors } from '../actions';

class AppState extends Component {
  async componentWillMount() {
    this.props.getActors();
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <AppDrawer />
            )}
          />
        </div>
      </Router>
    );
  }
}

AppState.propTypes = {
  getActors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  actorsLoading: state.actors.loading,
  actors: state.actors.actors ? state.actors.actors : []
});

const mapDispatchToProps = dispatch => ({
  getActors: () => dispatch(getActors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppState);

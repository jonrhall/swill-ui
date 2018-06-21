import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ResourceList from './ResourceList';
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
              <div>
              Hello world <br />
                { this.props.actorsLoading ? 'Actors loading!' : 'Actors not loading.' } <br />
                { this.props.actors.length ?
                  <ResourceList list={this.props.actors} resource="Actor" /> : 'No actors loaded'}
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

AppState.propTypes = {
  actorsLoading: PropTypes.bool.isRequired,
  actors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    power: PropTypes.number.isRequired,
    state: PropTypes.number.isRequired
  })).isRequired,
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

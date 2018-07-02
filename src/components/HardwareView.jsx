import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ActorsConfigTable from './actors/ActorsConfigTable';
import { getActors, getActorTypes, createActor } from '../actions';
import PageHeader from './common/PageHeader';

class HardwareView extends React.Component {
  static mapStateToProps = state => ({
    actorList: state.actors.actors,
    actorTypes: state.actors.types,
    loading: state.actors.loading
  })

  static mapDispatchToProps = dispatch => ({
    getActors: () => dispatch(getActors()),
    getActorTypes: () => dispatch(getActorTypes()),
    createActor: () => dispatch(createActor())
  })

  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    }
  });

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    actorList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    actorTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    getActors: PropTypes.func.isRequired,
    getActorTypes: PropTypes.func.isRequired,
    createActor: PropTypes.func.isRequired
  }

  async componentWillMount() {
    if (this.props.actorList.length < 1) {
      this.props.getActors();
    }

    if (this.props.actorTypes.length < 1) {
      this.props.getActorTypes();
    }
  }

  render() {
    const {
      classes,
      actorList,
      actorTypes,
      loading
    } = this.props;
    return (
      <div className={classes.margin}>
        <PageHeader text="Hardware" />
        {!loading && actorTypes.length > 0 ?
          <ActorsConfigTable
            list={actorList}
            types={actorTypes}
            addActor={this.props.createActor}
          /> :
          'Loading...'}
      </div>
    );
  }
}

export default connect(
  HardwareView.mapStateToProps,
  HardwareView.mapDispatchToProps
)(withStyles(HardwareView.styles)(HardwareView));

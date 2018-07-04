import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import actions from '../../actions';
import PageHeader from '../common/PageHeader';
import ActorsConfigTable from '../actors/ActorsConfigTable';
import KettlesConfigTable from '../kettles/KettlesConfigTable';

class HardwareView extends React.Component {
  static mapStateToProps = state => ({
    actorList: state.actors.actors,
    actorTypes: state.actors.types,
    kettleList: state.kettles.kettles,
    kettleTypes: state.kettles.types,
    loading: state.actors.loading || state.kettles.loading
  })

  static mapDispatchToProps = dispatch => ({
    getActors: () => dispatch(actions.actors.getActors()),
    getActorTypes: () => dispatch(actions.actors.getActorTypes()),
    createActor: () => dispatch(actions.actors.createActor()),
    getKettles: () => dispatch(actions.kettles.getKettles()),
    getKettleTypes: () => dispatch(actions.kettles.getKettleTypes()),
    createKettle: () => dispatch(actions.kettles.createKettle())
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
    kettleList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    kettleTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    getActors: PropTypes.func.isRequired,
    getActorTypes: PropTypes.func.isRequired,
    createActor: PropTypes.func.isRequired,
    getKettles: PropTypes.func.isRequired,
    getKettleTypes: PropTypes.func.isRequired,
    createKettle: PropTypes.func.isRequired
  }

  async componentWillMount() {
    if (this.props.actorList.length < 1) {
      this.props.getActors();
    }

    if (this.props.actorTypes.length < 1) {
      this.props.getActorTypes();
    }

    if (this.props.kettleList.length < 1) {
      this.props.getKettles();
    }

    if (this.props.kettleTypes.length < 1) {
      this.props.getKettleTypes();
    }
  }

  render() {
    const {
      classes,
      actorList,
      actorTypes,
      kettleList,
      kettleTypes,
      loading
    } = this.props;
    return (
      <div className={classes.margin}>
        <PageHeader text="Hardware" />
        {!loading ?
          <React.Fragment>
            <ActorsConfigTable
              list={actorList}
              types={actorTypes}
              addActor={this.props.createActor}
            />
            <KettlesConfigTable
              list={kettleList}
              types={kettleTypes}
              addKettle={this.props.createKettle}
            />
          </React.Fragment> :
          'Loading...'}
      </div>
    );
  }
}

export default connect(
  HardwareView.mapStateToProps,
  HardwareView.mapDispatchToProps
)(withStyles(HardwareView.styles)(HardwareView));

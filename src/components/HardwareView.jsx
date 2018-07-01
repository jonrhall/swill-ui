import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import ActorsConfigTable from './actors/ActorsConfigTable';
import { getActors, getActorTypes } from '../actions';

class HardwareView extends React.Component {
  static mapStateToProps = state => ({
    actorList: state.actors.actors,
    actorTypes: state.actors.types,
    loading: state.actors.loading
  })

  static mapDispatchToProps = dispatch => ({
    getActors: () => dispatch(getActors()),
    getActorTypes: () => dispatch(getActorTypes())
  })

  static styles = theme => ({
    button: {
      marginLeft: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
      paddingTop: '2px',
      paddingBottom: '2px',
      color: theme.palette.secondary.main
    },
    icon: {
      marginRight: theme.spacing.unit
    },
    margin: {
      margin: theme.spacing.unit * 2
    }
  });

  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string,
      icon: PropTypes.string,
      margin: PropTypes.string
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    actorList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    actorTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    getActors: PropTypes.func.isRequired,
    getActorTypes: PropTypes.func.isRequired
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
        <Typography variant="button" gutterBottom style={{ fontWeight: 'bold', marginBottom: 16 }}>
          Hardware &#x25B8;
        </Typography>
        <div>
          <Typography variant="display1" gutterBottom style={{ display: 'inline-block' }}>Actors</Typography>
          <Button variant="outlined" size="small" className={classes.button}>
            <AddIcon className={classes.icon} />
            <Typography variant="button" color="textSecondary">Add</Typography>
          </Button>
        </div>
        {!loading && actorTypes.length > 0 ?
          <ActorsConfigTable resource="Actors" list={actorList} types={actorTypes} /> :
          'Loading...'}
        {!loading && actorTypes.length > 0 ?
          <ActorsConfigTable resource="Actors" list={actorList} types={actorTypes} /> :
          'Loading...'}
        {!loading && actorTypes.length > 0 ?
          <ActorsConfigTable resource="Actors" list={actorList} types={actorTypes} /> :
          'Loading...'}
        {!loading && actorTypes.length > 0 ?
          <ActorsConfigTable resource="Actors" list={actorList} types={actorTypes} /> :
          'Loading...'}
        {!loading && actorTypes.length > 0 ?
          <ActorsConfigTable resource="Actors" list={actorList} types={actorTypes} /> :
          'Loading...'}
        {!loading && actorTypes.length > 0 ?
          <ActorsConfigTable resource="Actors" list={actorList} types={actorTypes} /> :
          'Loading...'}
      </div>
    );
  }
}

export default connect(
  HardwareView.mapStateToProps,
  HardwareView.mapDispatchToProps
)(withStyles(HardwareView.styles)(HardwareView));

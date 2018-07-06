import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  switchActorOff,
  switchActorOn,
  editActorName,
  editActorPower,
  editActorType,
  removeActor
} from '../../actions/actors';
import EditTextCell from '../common/EditTextCell';
import EditRangeCell from '../common/EditRangeCell';
import ToggleSwitchCell from '../common/ToggleSwitchCell';
import EditTypeCell from '../common/EditTypeCell';
import RemoveResourceCell from '../common/RemoveResourceCell';

class ActorRow extends React.Component {
  static styles = theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static mapStateToProps = () => ({})

  static mapDispatchToProps = dispatch => ({
    editName: (actor, name) => dispatch(editActorName(actor, name)),
    editType: (actor, type, config) => dispatch(editActorType(actor, type, config)),
    removeActor: actor => dispatch(removeActor(actor))
  })

  static propTypes = {
    actor: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      state: PropTypes.number,
      config: PropTypes.shape({})
    }).isRequired,
    // This is validated in a higher order component
    types: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    classes: PropTypes.shape({
      row: PropTypes.string
    }).isRequired,
    editName: PropTypes.func.isRequired,
    editType: PropTypes.func.isRequired,
    removeActor: PropTypes.func.isRequired
  }

  toggleActor = () => {
    if (this.props.actor.state === 0) {
      switchActorOn(this.props.actor);
    } else {
      switchActorOff(this.props.actor);
    }
  }

  editField = func => (...props) => func(this.props.actor, ...props);

  render() {
    const {
      actor,
      types,
      classes,
      editName,
      editType
    } = this.props;
    return (
      <TableRow className={classes.row} key={actor.id}>
        <EditTextCell
          text={actor.name}
          onChange={this.editField(editName)}
          label="Enter a name for the actor."
        />
        <ToggleSwitchCell
          checked={actor.state === 1}
          onChange={this.toggleActor}
        />
        <EditRangeCell
          value={actor.power}
          onChange={this.editField(editActorPower)}
          lowRange={0}
          highRange={100}
          label="Enter power value for the actor."
        />
        <EditTypeCell
          type={actor.type}
          config={actor.config}
          options={types}
          onChange={this.editField(editType)}
          label="Choose a type for the actor."
        />
        <RemoveResourceCell
          onClick={this.editField(this.props.removeActor)}
        />
      </TableRow>
    );
  }
}

export default connect(
  ActorRow.mapStateToProps,
  ActorRow.mapDispatchToProps
)(withStyles(ActorRow.styles)(ActorRow));

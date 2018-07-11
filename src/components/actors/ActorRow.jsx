import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  editActorName,
  editActorPower,
  editActorType,
  removeActor
} from '../../actions/actors';
import EditTextCell from '../common/EditTextCell';
import EditRangeCell from '../common/EditRangeCell';
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
      config: PropTypes.shape({})
    }).isRequired,
    // This is validated in a higher order component
    types: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    deleteMode: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
      row: PropTypes.string
    }).isRequired,
    editName: PropTypes.func.isRequired,
    editType: PropTypes.func.isRequired,
    removeActor: PropTypes.func.isRequired
  }

  editField = func => (...props) => func(this.props.actor, ...props);

  render() {
    const {
      actor,
      types,
      deleteMode,
      classes,
      editName,
      editType
    } = this.props;
    return (
      <TableRow className={classes.row} key={actor.id}>
        {deleteMode ?
          <RemoveResourceCell
            onClick={this.editField(this.props.removeActor)}
          /> : null}
        <EditTextCell
          text={actor.name}
          onChange={this.editField(editName)}
          label="Enter a name for the actor."
        />
        <EditTypeCell
          type={actor.type}
          config={actor.config}
          options={types}
          onChange={this.editField(editType)}
          label="Choose a type for the actor."
        />
        <EditRangeCell
          value={actor.power}
          onChange={this.editField(editActorPower)}
          lowRange={0}
          highRange={100}
          label="Enter power value for the actor."
        />
      </TableRow>
    );
  }
}

export default connect(
  ActorRow.mapStateToProps,
  ActorRow.mapDispatchToProps
)(withStyles(ActorRow.styles)(ActorRow));

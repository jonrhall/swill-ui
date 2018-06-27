import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  switchActorOff,
  switchActorOn,
  editActorName,
  editActorPower
} from '../../actions';
import EditTextCell from '../common/EditTextCell';
import EditRangeCell from '../common/EditRangeCell';
import ToggleSwitchCell from '../common/ToggleSwitchCell';

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

class ActorRow extends React.Component {
  toggleActor = () => {
    if (this.props.actor.state === 0) {
      switchActorOn(this.props.actor);
    } else {
      switchActorOff(this.props.actor);
    }
  }

  editField = func => prop => func(this.props.actor, prop);

  render() {
    const {
      actor,
      classes,
      editName
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
      </TableRow>
    );
  }
}

ActorRow.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    state: PropTypes.number
  }).isRequired,
  classes: PropTypes.shape({
    row: PropTypes.string
  }).isRequired,
  editName: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  editName: (actor, name) => dispatch(editActorName(actor, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ActorRow));

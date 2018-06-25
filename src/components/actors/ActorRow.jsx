import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { switchActorOff, switchActorOn, editActorName } from '../../actions';
import EditTextCell from '../common/EditTextCell';

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

  editName = (name) => {
    this.props.editActorName(this.props.actor, name);
  }

  render() {
    const { actor, classes } = this.props;
    return (
      <TableRow className={classes.row} key={actor.id}>
        <EditTextCell text={actor.name} onChange={this.editName} />
        <TableCell>
          <Switch
            checked={actor.state === 1}
            onChange={this.toggleActor}
            value="checkedA"
          />
        </TableCell>
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
  editActorName: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  editActorName: (actor, name) => dispatch(editActorName(actor, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ActorRow));

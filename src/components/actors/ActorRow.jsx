import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { switchActorOff, switchActorOn } from '../../actions';

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

  render() {
    const { actor, classes } = this.props;
    return (
      <TableRow className={classes.row} key={actor.id}>
        <TableCell>{actor.name}</TableCell>
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
  }).isRequired
};

export default withStyles(styles)(ActorRow);

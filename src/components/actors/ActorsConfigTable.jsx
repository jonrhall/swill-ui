import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import { getActors, getActorTypes, createActor } from '../../actions/actors';
import ActorRow from './ActorRow';
import TableHeader from '../common/TableHeader';
import HardwareTableTitle from '../common/HardwareTableTitle';

class ActorsConfigTable extends React.Component {
  static styles = theme => ({
    root: {
      marginBottom: theme.spacing.unit * 5,
      overflowX: 'auto'
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static mapStateToProps = state => ({
    actorList: state.actors.actors,
    actorTypes: state.actors.types
  })

  static mapDispatchToProps = dispatch => ({
    getActors: () => dispatch(getActors()),
    getActorTypes: () => dispatch(getActorTypes()),
    addActor: () => dispatch(createActor())
  })

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string
    }).isRequired,
    actorList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    actorTypes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      properties: PropTypes.arrayOf(PropTypes.shape({
        configurable: PropTypes.bool,
        description: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    })).isRequired,
    getActors: PropTypes.func.isRequired,
    getActorTypes: PropTypes.func.isRequired,
    addActor: PropTypes.func.isRequired
  }

  state = {
    deleteMode: false
  }

  componentWillMount() {
    if (this.props.actorList.length < 1) {
      this.props.getActors();
    }

    if (this.props.actorTypes.length < 1) {
      this.props.getActorTypes();
    }
  }

  toggleDelete = () => {
    this.setState({ deleteMode: !this.state.deleteMode });
  }

  render() {
    const {
      addActor,
      classes,
      actorList,
      actorTypes
    } = this.props;
    return (
      <React.Fragment>
        <HardwareTableTitle text="Actors" addAction={addActor} deleteAction={this.toggleDelete} />
        <Paper className={classes.root}>
          <Table>
            <TableHeader columns={this.state.deleteMode ?
              ['Delete?', 'Name', 'Type', 'Power %'] :
              ['Name', 'Type', 'Power %']}
            />
            <TableBody>
              {actorList.map(actor => (
                <ActorRow
                  key={actor.id}
                  actor={actor}
                  types={actorTypes}
                  deleteMode={this.state.deleteMode}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default connect(
  ActorsConfigTable.mapStateToProps,
  ActorsConfigTable.mapDispatchToProps
)(withStyles(ActorsConfigTable.styles)(ActorsConfigTable));

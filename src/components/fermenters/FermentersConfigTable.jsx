import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import { getFermenters, getFermenterTypes, createFermenter } from '../../actions/fermenters';
import FermenterRow from './FermenterRow';
import TableHeader from '../common/TableHeader';
import HardwareTableTitle from '../common/HardwareTableTitle';

class FermentersConfigTable extends React.Component {
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
    fermenterList: state.fermenters.fermenters,
    fermenterTypes: state.fermenters.types
  })

  static mapDispatchToProps = dispatch => ({
    getFermenters: () => dispatch(getFermenters()),
    getFermenterTypes: () => dispatch(getFermenterTypes()),
    addFermenter: () => dispatch(createFermenter())
  })

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string
    }).isRequired,
    fermenterList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    fermenterTypes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      properties: PropTypes.arrayOf(PropTypes.shape({
        configurable: PropTypes.bool,
        description: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    })).isRequired,
    getFermenters: PropTypes.func.isRequired,
    getFermenterTypes: PropTypes.func.isRequired,
    addFermenter: PropTypes.func.isRequired
  }

  state = {
    deleteMode: false
  }

  componentWillMount() {
    if (this.props.fermenterList.length < 1) {
      this.props.getFermenters();
    }

    if (this.props.fermenterTypes.length < 1) {
      this.props.getFermenterTypes();
    }
  }

  toggleDelete = () => {
    this.setState({ deleteMode: !this.state.deleteMode });
  }

  render() {
    const {
      addFermenter,
      classes,
      fermenterList,
      fermenterTypes
    } = this.props;
    return (
      <React.Fragment>
        <HardwareTableTitle text="Fermenters" addAction={addFermenter} deleteAction={this.toggleDelete} />
        <Paper className={classes.root}>
          <Table>
            <TableHeader columns={this.state.deleteMode ?
              ['Delete?', 'Name', 'Logic', 'Heater', 'Cooler', 'Sensor1', 'Sensor2', 'Sensor3'] :
              ['Name', 'Logic', 'Heater', 'Cooler', 'Sensor1', 'Sensor2', 'Sensor3']}
            />
            <TableBody>
              {fermenterList.map(fermenter => (
                <FermenterRow
                  key={fermenter.id}
                  fermenter={fermenter}
                  types={fermenterTypes}
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
  FermentersConfigTable.mapStateToProps,
  FermentersConfigTable.mapDispatchToProps
)(withStyles(FermentersConfigTable.styles)(FermentersConfigTable));

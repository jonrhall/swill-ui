import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  editFermenterName,
  editFermenterLogic,
  editFermenterHeater,
  editFermenterCooler,
  editFermenterSensor1,
  editFermenterSensor2,
  editFermenterSensor3,
  removeFermenter
} from '../../actions/fermenters';
import EditTextCell from '../common/EditTextCell';
import RemoveResourceCell from '../common/RemoveResourceCell';
import SelectResourceCell from '../common/SelectResourceCell';
import EditTypeCell from '../common/EditTypeCell';

class FermenterRow extends React.Component {
  static styles = theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static mapStateToProps = state => ({
    actorList: state.actors.actors,
    sensorList: state.sensors.sensors
  })

  static mapDispatchToProps = dispatch => ({
    editName: (fermenter, name) => dispatch(editFermenterName(fermenter, name)),
    editLogic: (fermenter, logic, config) => dispatch(editFermenterLogic(fermenter, logic, config)),
    editHeater: (fermenter, heater) => dispatch(editFermenterHeater(fermenter, heater)),
    editCooler: (fermenter, cooler) => dispatch(editFermenterCooler(fermenter, cooler)),
    editSensor1: (fermenter, sensor) => dispatch(editFermenterSensor1(fermenter, sensor)),
    editSensor2: (fermenter, sensor) => dispatch(editFermenterSensor2(fermenter, sensor)),
    editSensor3: (fermenter, sensor) => dispatch(editFermenterSensor3(fermenter, sensor)),
    removeFermenter: fermenter => dispatch(removeFermenter(fermenter))
  })

  static propTypes = {
    fermenter: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      heater: PropTypes.string,
      cooler: PropTypes.string,
      sensor: PropTypes.string,
      sensor1: PropTypes.string,
      sensor2: PropTypes.string,
      config: PropTypes.shape({}),
      logic: PropTypes.string
    }).isRequired,
    actorList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })),
    sensorList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })),
    classes: PropTypes.shape({
      row: PropTypes.string
    }).isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    deleteMode: PropTypes.bool.isRequired,
    editName: PropTypes.func.isRequired,
    editLogic: PropTypes.func.isRequired,
    editHeater: PropTypes.func.isRequired,
    editCooler: PropTypes.func.isRequired,
    editSensor1: PropTypes.func.isRequired,
    editSensor2: PropTypes.func.isRequired,
    editSensor3: PropTypes.func.isRequired,
    removeFermenter: PropTypes.func.isRequired
  }

  static defaultProps = {
    actorList: [],
    sensorList: []
  }

  editField = func => (...props) => func(this.props.fermenter, ...props);

  // Generates display text for the cell given a list and a prop to use as the id
  buttonText = (list, prop) => {
    const resource = list.find(({ id }) =>
      id.toString() === this.props.fermenter[prop]) || {};
    return resource.name || (<em>{`No ${prop}`}</em>);
  }

  render() {
    const {
      fermenter,
      actorList,
      sensorList,
      classes,
      types,
      deleteMode,
      editName,
      editLogic,
      editHeater,
      editCooler,
      editSensor1,
      editSensor2,
      editSensor3
    } = this.props;

    if (types.length > 0) {
      // The 'Hysteresis' logic type has very long descriptions that need to be shortened.
      types[0].properties[0].description = 'Offset when the cooler is switched off. Should be less than "Cooler Offset ON".';
      types[0].properties[1].description = 'Offset when the cooler is switched on. Should be greater than "Cooler Offset OFF".';
      types[0].properties[2].description = 'Offset when the heater is switched off. Should be less than "Heater Offset ON".';
      types[0].properties[3].description = 'Offset when the heater is switched on. Should be greater than "Heater Offset OFF".';
    }

    return (
      <TableRow className={classes.row} key={fermenter.id}>
        {deleteMode ?
          <RemoveResourceCell
            onClick={this.editField(this.props.removeFermenter)}
          /> : null}
        <EditTextCell
          text={fermenter.name}
          onChange={this.editField(editName)}
          label="Enter a name for the fermenter."
        />
        <EditTypeCell
          type={fermenter.logic}
          config={fermenter.config || {}}
          options={types}
          onChange={this.editField(editLogic)}
          label="Choose a type for the fermenter."
        />
        <SelectResourceCell
          value={fermenter.heater}
          buttonText={this.buttonText(actorList, 'heater')}
          label="Choose an actor for the heating element."
          resourceList={actorList}
          onChange={this.editField(editHeater)}
        />
        <SelectResourceCell
          value={fermenter.cooler}
          buttonText={this.buttonText(actorList, 'cooler')}
          label="Choose an actor for the cooling element."
          resourceList={actorList}
          onChange={this.editField(editCooler)}
        />
        <SelectResourceCell
          value={fermenter.sensor}
          buttonText={this.buttonText(sensorList, 'sensor')}
          label="Choose a primary sensor for the fermenter."
          resourceList={sensorList}
          onChange={this.editField(editSensor1)}
        />
        <SelectResourceCell
          value={fermenter.sensor2}
          buttonText={this.buttonText(sensorList, 'sensor')}
          label="Choose a second sensor for the fermenter."
          resourceList={sensorList}
          onChange={this.editField(editSensor2)}
        />
        <SelectResourceCell
          value={fermenter.sensor3}
          buttonText={this.buttonText(sensorList, 'sensor')}
          label="Choose a third sensor for the fermenter."
          resourceList={sensorList}
          onChange={this.editField(editSensor3)}
        />
      </TableRow>
    );
  }
}

export default connect(
  FermenterRow.mapStateToProps,
  FermenterRow.mapDispatchToProps
)(withStyles(FermenterRow.styles)(FermenterRow));

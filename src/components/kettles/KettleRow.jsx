import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  editKettleName,
  editKettleLogic,
  editKettleAgitator,
  editKettleHeater,
  editKettleSensor,
  removeKettle
} from '../../actions/kettles';
import EditTextCell from '../common/EditTextCell';
import RemoveResourceCell from '../common/RemoveResourceCell';
import SelectResourceCell from '../common/SelectResourceCell';
import EditTypeCell from '../common/EditTypeCell';

class KettleRow extends React.Component {
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
    editName: (kettle, name) => dispatch(editKettleName(kettle, name)),
    editLogic: (kettle, logic, config) => dispatch(editKettleLogic(kettle, logic, config)),
    editAgitator: (kettle, agitator) => dispatch(editKettleAgitator(kettle, agitator)),
    editHeater: (kettle, heater) => dispatch(editKettleHeater(kettle, heater)),
    editSensor: (kettle, sensor) => dispatch(editKettleSensor(kettle, sensor)),
    removeKettle: kettle => dispatch(removeKettle(kettle))
  })

  static propTypes = {
    kettle: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      agitator: PropTypes.string,
      heater: PropTypes.string,
      sensor: PropTypes.string,
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
    editAgitator: PropTypes.func.isRequired,
    editHeater: PropTypes.func.isRequired,
    editSensor: PropTypes.func.isRequired,
    removeKettle: PropTypes.func.isRequired
  }

  static defaultProps = {
    actorList: [],
    sensorList: []
  }

  editField = func => (...props) => func(this.props.kettle, ...props);

  // Generates display text for the cell given a list and a prop to use as the id
  buttonText = (list, prop) => {
    const resource = list.find(({ id }) =>
      id.toString() === this.props.kettle[prop]) || {};
    return resource.name || (<em>{`No ${prop}`}</em>);
  }

  render() {
    const {
      kettle,
      actorList,
      sensorList,
      classes,
      types,
      deleteMode,
      editName,
      editLogic,
      editAgitator,
      editHeater,
      editSensor
    } = this.props;
    return (
      <TableRow className={classes.row} key={kettle.id}>
        {deleteMode ?
          <RemoveResourceCell
            onClick={this.editField(this.props.removeKettle)}
          /> : null}
        <EditTextCell
          text={kettle.name}
          onChange={this.editField(editName)}
          label="Enter a name for the kettle."
        />
        <EditTypeCell
          type={kettle.logic}
          config={kettle.config || {}}
          options={types}
          onChange={this.editField(editLogic)}
          label="Choose a type for the kettle."
        />
        <SelectResourceCell
          value={kettle.heater}
          buttonText={this.buttonText(actorList, 'heater')}
          label="Choose an actor for the heating element."
          resourceList={actorList}
          onChange={this.editField(editHeater)}
        />
        <SelectResourceCell
          value={kettle.agitator}
          buttonText={this.buttonText(actorList, 'agitator')}
          label="Choose an actor for the agitator."
          resourceList={actorList}
          onChange={this.editField(editAgitator)}
        />
        <SelectResourceCell
          value={kettle.sensor}
          buttonText={this.buttonText(sensorList, 'sensor')}
          label="Choose a sensor for the kettle."
          resourceList={sensorList}
          onChange={this.editField(editSensor)}
        />
      </TableRow>
    );
  }
}

export default connect(
  KettleRow.mapStateToProps,
  KettleRow.mapDispatchToProps
)(withStyles(KettleRow.styles)(KettleRow));

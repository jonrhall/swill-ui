import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  switchKettleOn,
  switchKettleOff,
  editKettleName,
  editKettleAgitator,
  editKettleHeater,
  removeKettle
} from '../../actions/kettles';
import EditTextCell from '../common/EditTextCell';
import RemoveResourceCell from '../common/RemoveResourceCell';
import ToggleSwitchCell from '../common/ToggleSwitchCell';
import SelectResourceCell from '../common/SelectResourceCell';

class KettleRow extends React.Component {
  static styles = theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static mapStateToProps = state => ({
    actorList: state.actors.actors
  })

  static mapDispatchToProps = dispatch => ({
    editName: (kettle, name) => dispatch(editKettleName(kettle, name)),
    editAgitator: (kettle, agitator) => dispatch(editKettleAgitator(kettle, agitator)),
    editHeater: (kettle, heater) => dispatch(editKettleHeater(kettle, heater)),
    removeKettle: kettle => dispatch(removeKettle(kettle))
  })

  static propTypes = {
    kettle: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      state: PropTypes.bool,
      agitator: PropTypes.string
    }).isRequired,
    actorList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })),
    classes: PropTypes.shape({
      row: PropTypes.string
    }).isRequired,
    editName: PropTypes.func.isRequired,
    editAgitator: PropTypes.func.isRequired,
    editHeater: PropTypes.func.isRequired,
    removeKettle: PropTypes.func.isRequired
  }

  static defaultProps = {
    actorList: []
  }

  toggleKettle = () => {
    if (this.props.kettle.state === false) {
      switchKettleOn(this.props.kettle);
    } else {
      switchKettleOff(this.props.kettle);
    }
  }

  editField = func => (...props) => func(this.props.kettle, ...props);

  buttonText = (prop) => {
    const resource = this.props.actorList.find(({ id }) =>
      id.toString() === this.props.kettle[prop]) || {};
    return resource.name || (<em>{`No ${prop}`}</em>);
  }

  render() {
    const {
      kettle,
      actorList,
      classes,
      editName,
      editAgitator,
      editHeater
    } = this.props;
    return (
      <TableRow className={classes.row} key={kettle.id}>
        <EditTextCell
          text={kettle.name}
          onChange={this.editField(editName)}
          label="Enter a name for the kettle."
        />
        <SelectResourceCell
          value={kettle.heater}
          buttonText={this.buttonText('heater')}
          label="Choose an actor for the heating element."
          resourceList={actorList}
          onChange={this.editField(editHeater)}
        />
        <SelectResourceCell
          value={kettle.agitator}
          buttonText={this.buttonText('agitator')}
          label="Choose an actor for the agitator."
          resourceList={actorList}
          onChange={this.editField(editAgitator)}
        />
        <ToggleSwitchCell
          checked={kettle.state}
          onChange={this.toggleKettle}
        />
        <RemoveResourceCell
          onClick={this.editField(this.props.removeKettle)}
        />
      </TableRow>
    );
  }
}

export default connect(
  KettleRow.mapStateToProps,
  KettleRow.mapDispatchToProps
)(withStyles(KettleRow.styles)(KettleRow));
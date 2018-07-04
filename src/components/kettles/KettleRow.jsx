import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import {
  switchKettleOn,
  switchKettleOff,
  editKettleName,
  removeKettle
} from '../../actions/kettles';
import EditTextCell from '../common/EditTextCell';
import RemoveResourceCell from '../common/RemoveResourceCell';
import ToggleSwitchCell from '../common/ToggleSwitchCell';

class KettleRow extends React.Component {
  static styles = theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static mapStateToProps = () => ({})

  static mapDispatchToProps = dispatch => ({
    editName: (kettle, name) => dispatch(editKettleName(kettle, name)),
    removeKettle: kettle => dispatch(removeKettle(kettle))
  })

  static propTypes = {
    kettle: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      state: PropTypes.bool
    }).isRequired,
    classes: PropTypes.shape({
      row: PropTypes.string
    }).isRequired,
    editName: PropTypes.func.isRequired,
    removeKettle: PropTypes.func.isRequired
  }

  toggleKettle = () => {
    if (this.props.kettle.state === false) {
      switchKettleOn(this.props.kettle);
    } else {
      switchKettleOff(this.props.kettle);
    }
  }

  editField = func => (...props) => func(this.props.kettle, ...props);

  render() {
    const {
      kettle,
      classes,
      editName
    } = this.props;
    return (
      <TableRow className={classes.row} key={kettle.id}>
        <EditTextCell
          text={kettle.name}
          onChange={this.editField(editName)}
          label="Enter a name for the kettle."
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

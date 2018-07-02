import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

import { editKettleName } from '../../actions';
import EditTextCell from '../common/EditTextCell';

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
    editName: (kettle, name) => dispatch(editKettleName(kettle, name))
  })

  static propTypes = {
    kettle: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }).isRequired,
    classes: PropTypes.shape({
      row: PropTypes.string
    }).isRequired,
    editName: PropTypes.func.isRequired
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
      </TableRow>
    );
  }
}

export default connect(
  KettleRow.mapStateToProps,
  KettleRow.mapDispatchToProps
)(withStyles(KettleRow.styles)(KettleRow));

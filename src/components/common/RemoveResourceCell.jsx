import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';

class RemoveResourceCell extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render() {
    const { onClick } = this.props;
    return (
      <TableCell>
        <IconButton onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    );
  }
}

export default RemoveResourceCell;

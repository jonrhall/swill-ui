import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import TableCell from '@material-ui/core/TableCell';

const ToggleSwitchCell = ({ checked, onChange }) => (
  <TableCell>
    <Switch
      checked={checked}
      onChange={onChange}
    />
  </TableCell>
);

ToggleSwitchCell.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ToggleSwitchCell;

import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import TableCell from '@material-ui/core/TableCell';

class ToggleSwitchCell extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { checked, onChange } = this.props;
    return (
      <TableCell>
        <Switch
          checked={checked}
          onChange={onChange}
        />
      </TableCell>
    );
  }
}

export default ToggleSwitchCell;

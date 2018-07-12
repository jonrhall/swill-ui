import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';

class RemoveResourceCell extends React.Component {
  static styles = theme => ({
    tableCell: {
      paddingRight: 0
    },
    iconButton: {
      height: theme.spacing.unit * 3
    }
  })
  static propTypes = {
    classes: PropTypes.shape({
      tableCell: PropTypes.string,
      iconButton: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const { classes, onClick } = this.props;
    return (
      <TableCell className={classes.tableCell}>
        <IconButton color="secondary" onClick={onClick} className={classes.iconButton}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    );
  }
}

export default withStyles(RemoveResourceCell.styles)(RemoveResourceCell);

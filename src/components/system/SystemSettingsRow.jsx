import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class SystemSettingsRow extends React.Component {
  static styles = theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    },
    tableCell: {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      paddingRight: 0
    },
    description: {
      color: theme.palette.text.secondary
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      row: PropTypes.string,
      tableCell: PropTypes.string,
      description: PropTypes.string
    }).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    const {
      children,
      classes,
      description,
      name
    } = this.props;
    return (
      <TableRow className={classes.row}>
        <TableCell className={classes.tableCell}>
          <Typography>{name}</Typography>
          <Typography className={classes.description}>{description}</Typography>
        </TableCell>
        {children}
      </TableRow>
    );
  }
}

export default withStyles(SystemSettingsRow.styles)(SystemSettingsRow);

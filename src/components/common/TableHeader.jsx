import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class TableHeader extends React.Component {
  static styles = theme => ({
    header: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold'
    }
  });

  static propTypes = {
    classes: PropTypes.shape({
      header: PropTypes.string
    }).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.columns.map(title => (
            <TableCell className={this.props.classes.header} key={title}>{title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(TableHeader.styles)(TableHeader);

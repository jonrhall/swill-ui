import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Typography } from '@material-ui/core';

import PageHeader from '../common/PageHeader';
import SystemActions from '../system/SystemActions';

class SystemView extends React.Component {
  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    },
    root: {
      marginBottom: theme.spacing.unit * 5,
      overflowX: 'auto'
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    },
    tableCell: {
      paddingRight: 0
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string,
      root: PropTypes.string,
      row: PropTypes.string,
      tableCell: PropTypes.string
    }).isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.classes.margin}>
        <PageHeader text="System" />
        <Typography
          variant="display1"
          gutterBottom
        >
          Actions
        </Typography>
        <SystemActions />
        <Typography
          variant="display1"
          gutterBottom
        >
          Settings
        </Typography>
        <Paper className={classes.root}>
          <Table>
            <TableBody>
              <TableRow className={classes.row}>
                <TableCell className={classes.tableCell}>
                  Some Text
                </TableCell>
                <TableCell className={classes.tableCell}>
                  Some Text2
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(SystemView.styles)(SystemView);

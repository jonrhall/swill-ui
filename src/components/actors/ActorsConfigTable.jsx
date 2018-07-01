import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ActorRow from './ActorRow';

class ActorsConfigTable extends React.Component {
  static styles = theme => ({
    root: {
      marginBottom: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    },
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold'
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string,
      head: PropTypes.string
    }).isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      properties: PropTypes.arrayOf(PropTypes.shape({
        configurable: PropTypes.bool,
        description: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    })).isRequired
  }

  render() {
    const { classes, list, types } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'On/Off', 'Power %', 'Type'].map(title => (
                  <TableCell className={classes.head} key={title}>{title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(instance => (
                <ActorRow key={instance.id} actor={instance} types={types} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(ActorsConfigTable.styles)(ActorsConfigTable);

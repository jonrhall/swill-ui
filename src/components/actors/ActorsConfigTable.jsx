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

const styles = theme => ({
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
});

const ActorsConfigTable = props => (
  <React.Fragment>
    <Paper className={props.classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            {['Name', 'On/Off'].map(title => (
              <TableCell className={props.classes.head} key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map(instance => (
            <ActorRow key={instance.id} actor={instance} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
);

ActorsConfigTable.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    table: PropTypes.string,
    head: PropTypes.string
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired
};

export default withStyles(styles)(ActorsConfigTable);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import KettleRow from './KettleRow';
import TableHeader from '../common/TableHeader';
import TableTitle from '../common/TableTitle';

class KettlesConfigTable extends React.Component {
  static styles = theme => ({
    root: {
      marginBottom: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string
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
    })).isRequired,
    addKettle: PropTypes.func.isRequired
  }

  render() {
    const {
      addKettle,
      classes,
      list,
      types
    } = this.props;
    return (
      <React.Fragment>
        <TableTitle text="Kettles" addAction={addKettle} />
        <Paper className={classes.root}>
          <Table>
            <TableHeader columns={['Name']} />
            <TableBody>
              {list.map(kettle => (
                <KettleRow key={kettle.id} kettle={kettle} types={types} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(KettlesConfigTable.styles)(KettlesConfigTable);

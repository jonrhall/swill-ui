import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import { getKettles, getKettleTypes, createKettle } from '../../actions/kettles';
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

  static mapStateToProps = state => ({
    kettleList: state.kettles.kettles,
    kettleTypes: state.kettles.types
  })

  static mapDispatchToProps = dispatch => ({
    getKettles: () => dispatch(getKettles()),
    getKettleTypes: () => dispatch(getKettleTypes()),
    addKettle: () => dispatch(createKettle())
  })

  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string
    }).isRequired,
    kettleList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })).isRequired,
    kettleTypes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      properties: PropTypes.arrayOf(PropTypes.shape({
        configurable: PropTypes.bool,
        description: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    })).isRequired,
    getKettles: PropTypes.func.isRequired,
    getKettleTypes: PropTypes.func.isRequired,
    addKettle: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (this.props.kettleList.length < 1) {
      this.props.getKettles();
    }

    if (this.props.kettleTypes.length < 1) {
      this.props.getKettleTypes();
    }
  }

  render() {
    const {
      addKettle,
      classes,
      kettleList,
      kettleTypes
    } = this.props;
    return (
      <React.Fragment>
        <TableTitle text="Kettles" addAction={addKettle} />
        <Paper className={classes.root}>
          <Table>
            <TableHeader columns={['Name', 'Heater', 'Agitator', 'Auto', 'Remove']} />
            <TableBody>
              {kettleList.map(kettle => (
                <KettleRow key={kettle.id} kettle={kettle} types={kettleTypes} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default connect(
  KettlesConfigTable.mapStateToProps,
  KettlesConfigTable.mapDispatchToProps
)(withStyles(KettlesConfigTable.styles)(KettlesConfigTable));
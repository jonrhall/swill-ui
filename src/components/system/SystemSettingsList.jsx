import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import SystemSettingsRow from './SystemSettingsRow';

class SystemSettingsList extends React.Component {
  static styles = theme => ({
    root: {
      marginBottom: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    tableCell: {
      paddingRight: 0
    },
    header: {
      fontWeight: 'bold',
      color: theme.palette.grey[500],
      marginBottom: theme.spacing.unit * 1.5
    }
  })

  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    })).isRequired
  }

  render() {
    const { classes, label, list } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="button"
          className={classes.header}
        >
          {label} ({list.length})
        </Typography>
        <Paper className={classes.root}>
          <Table>
            <TableBody>
              {list.map(property => (
                <SystemSettingsRow
                  name={property.label}
                  description={property.description}
                  key={property.name}
                >
                  <TableCell className={classes.tableCell}>
                    {property.value}
                  </TableCell>
                </SystemSettingsRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(SystemSettingsList.styles)(SystemSettingsList);

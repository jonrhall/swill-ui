import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

class TypeDescription extends Component {
  static styles = theme => ({
    empty: {
      paddingTop: theme.spacing.unit * 1.25,
      whiteSpace: 'nowrap'
    },
    container: {
      paddingTop: theme.spacing.unit * 0.25,
      marginLeft: theme.spacing.unit * 0.5
    },
    param: {
      whiteSpace: 'nowrap'
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      empty: PropTypes.string,
      container: PropTypes.string,
      param: PropTypes.string
    }).isRequired,
    values: PropTypes.shape({}).isRequired,
    emptyText: PropTypes.string.isRequired
  }

  render() {
    const { classes, values, emptyText } = this.props;
    const config = Object.keys(values);

    if (config.length < 1) {
      return <Typography variant="caption" className={classes.empty}>{emptyText}</Typography>;
    }

    return (
      <Typography variant="caption" className={classes.container}>
        {config.map(param => (
          <div key={param} className={classes.param}>
            {`${capitalize(param)}: ${values[param]}`}
          </div>
        ))}
      </Typography>
    );
  }
}

export default withStyles(TypeDescription.styles)(TypeDescription);

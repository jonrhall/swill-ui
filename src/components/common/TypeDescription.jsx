import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const format = (str) => {
  if (str === 'sensor_name') {
    return 'Sensor';
  }

  // Capitalize the string
  return str.replace(/^\w/, c => c.toUpperCase());
};

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
    containerPlusSpacing: {
      paddingTop: theme.spacing.unit * 1.25,
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
      containerPlusSpacing: PropTypes.string,
      param: PropTypes.string
    }).isRequired,
    values: PropTypes.shape({}).isRequired,
    emptyText: PropTypes.string.isRequired
  }

  render() {
    const { classes, values, emptyText } = this.props;
    const config = Object.keys(values);
    let containerClass = classes.container;

    if (config.length < 1) {
      return <Typography variant="caption" className={classes.empty}>{emptyText}</Typography>;
    }

    // Add more spacing to type descriptions with only one param
    if (config.length === 1) {
      containerClass = classes.containerPlusSpacing;
    }

    return (
      <Typography variant="caption" className={containerClass}>
        {config.map(param => (
          <div key={param} className={classes.param}>
            {`${format(param)}: ${values[param] || 'None'}`}
          </div>
        ))}
      </Typography>
    );
  }
}

export default withStyles(TypeDescription.styles)(TypeDescription);

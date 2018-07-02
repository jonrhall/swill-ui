import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class PageHeader extends Component {
  static propTypes = {
    classes: PropTypes.shape({ header: PropTypes.string }).isRequired,
    text: PropTypes.string.isRequired
  }

  static styles = theme => ({
    header: {
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.palette.grey[500]
    }
  });

  render() {
    const { classes, text } = this.props;
    return (
      <Typography variant="button" gutterBottom className={classes.header}>
        {text} &#x25B8;
      </Typography>
    );
  }
}

export default withStyles(PageHeader.styles)(PageHeader);

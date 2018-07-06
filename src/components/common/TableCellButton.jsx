import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class TableCellButton extends React.Component {
  static style = theme => ({
    textTransform: {
      textTransform: 'none'
    },
    button: {
      float: 'left',
      marginRight: theme.spacing.unit
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      textTransform: PropTypes.string,
      button: PropTypes.string
    }).isRequired,
    anchor: PropTypes.bool.isRequired,
    menuName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({})
    ]).isRequired
  }

  render() {
    const {
      anchor,
      classes,
      menuName,
      onClick,
      buttonText
    } = this.props;
    return (
      <Button
        aria-owns={anchor ? menuName : null}
        aria-haspopup="true"
        onClick={onClick}
        className={classes.button}
      >
        <Typography className={classes.textTransform}>{buttonText}</Typography>
      </Button>
    );
  }
}

export default withStyles(TableCellButton.style)(TableCellButton);

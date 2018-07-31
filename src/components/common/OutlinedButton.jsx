import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class OutlinedButton extends React.Component {
  static styles = theme => ({
    button: {
      paddingTop: 0,
      paddingBottom: 0,
      marginLeft: theme.spacing.unit * 2,
      fontWeight: 'bold'
    },
    greyButton: {
      color: theme.palette.grey[700]
    },
    marginLeft: {
      marginLeft: theme.spacing.unit
    },
    iconOnly: {
      padding: 0,
      minWidth: 44,
      marginLeft: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string,
      greyButton: PropTypes.string,
      marginLeft: PropTypes.string
    }).isRequired,
    text: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
    icon: PropTypes.node,
    href: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    text: '',
    color: 'default',
    icon: null,
    onClick: null,
    href: null,
    disabled: false
  }

  render() {
    const {
      classes,
      color,
      disabled,
      icon,
      onClick,
      text,
      href
    } = this.props;
    return (
      <Button
        variant="outlined"
        color={color}
        size="medium"
        className={classNames(
          classes.button,
          color === 'default' ? classes.greyButton : null,
          icon && !text ? classes.iconOnly : null
        )}
        onClick={onClick}
        href={href}
        disabled={disabled}
      >
        {icon}
        {text ? <span className={classes.marginLeft}>{text}</span> : null}
      </Button>
    );
  }
}

export default withStyles(OutlinedButton.styles)(OutlinedButton);

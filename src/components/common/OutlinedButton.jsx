import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class OutlinedButton extends React.Component {
  static styles = theme => ({
    button: {
      paddingTop: 0,
      paddingBottom: 0,
      marginLeft: theme.spacing.unit * 2,
      fontWeight: 'bold',
      color: theme.palette.grey[700]
    },
    marginLeft: {
      marginLeft: theme.spacing.unit
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string,
      marginLeft: PropTypes.string
    }).isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    color: PropTypes.string,
    icon: PropTypes.node,
    href: PropTypes.string
  }

  static defaultProps = {
    color: 'default',
    icon: null,
    onClick: null,
    href: null
  }

  render() {
    const {
      classes,
      color,
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
        className={classes.button}
        onClick={onClick}
        href={href}
      >
        {icon}
        <span className={classes.marginLeft}>{text}</span>
      </Button>
    );
  }
}

export default withStyles(OutlinedButton.styles)(OutlinedButton);

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

class ActionToggle extends React.Component {
  static styles = theme => ({
    button: {
      padding: 0
    },
    flex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    topLeft: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    topRight: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    bottomLeft: {
      position: 'absolute',
      bottom: 0,
      left: 0
    },
    bottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0
    },
    topLabel: {
      position: 'relative',
      top: theme.spacing.unit
    },
    bottomLabel: {
      position: 'relative',
      bottom: theme.spacing.unit
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string,
      flex: PropTypes.string,
      topLabel: PropTypes.string,
      bottomLabel: PropTypes.string
    }).isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    alignment: PropTypes.string
  }

  static defaultProps = {
    alignment: 'topRight'
  }

  render() {
    const {
      classes,
      checked,
      onChange,
      text,
      alignment
    } = this.props;

    const alignClass = classes[alignment];

    return (
      <Button className={classNames(classes.button, alignClass)}>
        <div className={classes.flex}>
          {alignment === 'bottomRight' || alignment === 'bottomLeft' ?
            <Typography variant="caption" className={classes.topLabel}>{text}</Typography> : null}
          <Switch
            checked={checked}
            onChange={onChange}
          />
          {alignment === 'topRight' || alignment === 'topLeft' ?
            <Typography variant="caption" className={classes.bottomLabel}>{text}</Typography> : null}
        </div>
      </Button>
    );
  }
}

export default withStyles(ActionToggle.styles)(ActionToggle);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class LogTitleDetail extends React.Component {
  static styles = theme => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.disabled,
      marginRight: theme.spacing.unit * 12
    },
    text: {
      marginLeft: theme.spacing.unit,
      color: theme.palette.text.secondary
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      heading: PropTypes.string
    }).isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    const { classes, label, text } = this.props;
    return (
      <Typography className={classes.heading}>
        <span>{`${label}:`}</span>
        <span className={classes.text}>{text}</span>
      </Typography>
    );
  }
}


export default withStyles(LogTitleDetail.styles)(LogTitleDetail);

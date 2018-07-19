import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class ExpandableSectionDetail extends React.Component {
  static styles = theme => ({
    bold: {
      fontWeight: 'bold',
      color: theme.palette.text.secondary
    },
    marginBottom: {
      marginBottom: theme.spacing.unit * 2
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      bold: PropTypes.string,
      marginBottom: PropTypes.string
    }).isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.node
    ]).isRequired
  }

  render() {
    const { classes, label, text } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.bold}>{label}</Typography>
        <Typography className={classes.marginBottom}>{text}</Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(ExpandableSectionDetail.styles)(ExpandableSectionDetail);

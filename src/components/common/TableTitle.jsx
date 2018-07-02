import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class TableTitle extends React.Component {
  static styles = theme => ({
    button: {
      marginLeft: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
      paddingTop: '2px',
      paddingBottom: '2px',
      color: theme.palette.secondary.main
    },
    icon: {
      marginRight: theme.spacing.unit
    }
  });

  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string,
      icon: PropTypes.string
    }).isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    const { classes, text } = this.props;
    return (
      <div>
        <Typography variant="display1" gutterBottom style={{ display: 'inline-block' }}>{text}</Typography>
        <Button variant="outlined" size="small" className={classes.button}>
          <AddIcon className={classes.icon} />
          <Typography variant="button" color="textSecondary">Add</Typography>
        </Button>
      </div>
    );
  }
}

export default withStyles(TableTitle.styles)(TableTitle);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class SystemCard extends React.Component {
  static styles = theme => ({
    actions: {
      float: 'right',
      marginRight: 8,
      marginBottom: 8
    },
    card: {
      title: {
        marginBottom: 16,
        fontSize: 14
      }
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
      color: theme.palette.primary.dark
    },
    pos: {
      marginBottom: 12
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      actions: PropTypes.string,
      card: PropTypes.string,
      title: PropTypes.string,
      pos: PropTypes.string
    }).isRequired,
    typeheader: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    button: PropTypes.node.isRequired
  }

  render() {
    const {
      classes,
      typeheader,
      header,
      subheader,
      button
    } = this.props;
    return (
      <Grid item zeroMinWidth xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {typeheader}
            </Typography>
            <Typography variant="title" gutterBottom>
              {header}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {subheader}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            {button}
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(SystemCard.styles)(SystemCard);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GamesIcon from '@material-ui/icons/Games';

class KettleList extends React.Component {
  static styles = theme => ({
    kettleTitle: {
      marginTop: theme.spacing.unit * 8
    },
    targetTemp: {
      marginBottom: theme.spacing.unit * 8,
      display: 'flex',
      fontSize: '1.6rem',
      justifyContent: 'center'
    },
    targetTempText: {
      position: 'relative',
      bottom: '0.4rem',
      paddingLeft: theme.spacing.unit,
      fontFamily: '"Audiowide", serif'
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      kettleTitle: PropTypes.string,
      targetTemp: PropTypes.string,
      targetTempText: PropTypes.string
    }).isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item zeroMinWidth xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.kettleTitle} color="textSecondary" align="center">
                KettleName
              </Typography>
              <Typography variant="title" gutterBottom align="center">
                157&#176;F
              </Typography>
              <Typography className={classes.targetTemp} color="textSecondary" align="center">
                <GamesIcon />
                <span className={classes.targetTempText}>168&#176;F</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(KettleList.styles)(KettleList);

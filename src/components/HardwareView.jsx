import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import ActorsConfigTable from './actors/ActorsConfigTable';
import { getActors } from '../actions';

class HardwareView extends React.Component {
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

  async componentWillMount() {
    if (this.props.actorList.length < 1) {
      this.props.getActors();
    }
  }

  render() {
    const { classes, actorList, loading } = this.props;
    return (
      <div>
        <div>
          <Typography variant="display1" gutterBottom style={{ display: 'inline-block' }}>Actors</Typography>
          <Button variant="outlined" size="small" className={classes.button}>
            <AddIcon className={classes.icon} />
            <Typography variant="button" color="textSecondary">Add</Typography>
          </Button>
        </div>
        {loading ?
          'Loading...' :
          <ActorsConfigTable resource="Actors" list={actorList} />}
      </div>
    );
  }
}

HardwareView.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  actorList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired,
  getActors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  actorList: state.actors.actors,
  loading: state.actors.loading
});

const mapDispatchToProps = dispatch => ({
  getActors: () => dispatch(getActors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(HardwareView.styles)(HardwareView));
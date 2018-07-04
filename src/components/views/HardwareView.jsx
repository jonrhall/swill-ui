import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PageHeader from '../common/PageHeader';
import ActorsConfigTable from '../actors/ActorsConfigTable';
import KettlesConfigTable from '../kettles/KettlesConfigTable';

class HardwareView extends React.Component {
  static mapStateToProps = state => ({
    loading: state.actors.loading || state.kettles.loading
  })

  static mapDispatchToProps = () => ({})

  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    }
  });

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string
    }).isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const {
      classes,
      loading
    } = this.props;
    return (
      <div className={classes.margin}>
        <PageHeader text="Hardware" />
        {!loading ?
          <React.Fragment>
            <ActorsConfigTable />
            <KettlesConfigTable />
          </React.Fragment> :
          'Loading...'}
      </div>
    );
  }
}

export default connect(
  HardwareView.mapStateToProps,
  HardwareView.mapDispatchToProps
)(withStyles(HardwareView.styles)(HardwareView));

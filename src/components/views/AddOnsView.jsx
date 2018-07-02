import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PageHeader from '../common/PageHeader';

class AddOnsView extends React.Component {
  static styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      margin: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <div className={this.props.classes.margin}>
        <PageHeader text="Add-ons" />
      </div>
    );
  }
}

export default withStyles(AddOnsView.styles)(AddOnsView);

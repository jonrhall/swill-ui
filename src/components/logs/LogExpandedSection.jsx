import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { deleteLog } from '../../actions/logs';
import ExpandedSection from '../common/ExpandedSection';
import ExpandableSectionDetail from '../common/ExpandableSectionDetail';
import OutlinedButton from '../common/OutlinedButton';

class LogExpandedPanel extends React.Component {
  static mapStateToProps = () => ({})

  static mapDispatchToProps = dispatch => ({
    deleteLog: name => dispatch(deleteLog(name))
  })

  static styles = theme => ({
    bold: {
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing.unit
    }
  })

  static propTypes = {
    log: PropTypes.shape({
      name: PropTypes.string,
      dateModified: PropTypes.shape({}),
      href: PropTypes.string
    }).isRequired,
    deleteLog: PropTypes.func.isRequired
  }

  delete = () => this.props.deleteLog(this.props.log.name)

  render() {
    const { log } = this.props;
    return (
      <ExpandedSection>
        <React.Fragment>
          <ExpandableSectionDetail label="Date Modified" text={log.dateModified.toString()} />
        </React.Fragment>
        <React.Fragment>
          <OutlinedButton
            text="Delete"
            icon={<DeleteIcon />}
            onClick={this.delete}
          />
          <OutlinedButton
            text="Download"
            icon={<CloudDownloadIcon />}
            href={log.href}
            color="secondary"
          />
        </React.Fragment>
      </ExpandedSection>
    );
  }
}

export default connect(
  LogExpandedPanel.mapStateToProps,
  LogExpandedPanel.mapDispatchToProps
)(withStyles(LogExpandedPanel.styles)(LogExpandedPanel));

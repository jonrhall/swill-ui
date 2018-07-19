import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandableSectionTitleDetail from './ExpandableSectionTitleDetail';

class ExpandableSection extends React.Component {
  static styles = theme => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      fontWeight: 'bold',
      color: theme.palette.grey[700]
    },
    activeColor: {
      color: theme.palette.primary.main
    }
  })

  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    titleDetails: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      text: PropTypes.string
    })).isRequired,
    name: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const {
      children,
      classes,
      expanded,
      name,
      onClick,
      titleDetails
    } = this.props;
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={onClick}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames(
            classes.heading,
            (expanded ? classes.activeColor : null)
          )}
          >
            {name}
          </Typography>
          {titleDetails.map(detail => (
            <ExpandableSectionTitleDetail key={detail.label} {...detail} />
          ))}
        </ExpansionPanelSummary>
        {children}
      </ExpansionPanel>
    );
  }
}

export default withStyles(ExpandableSection.styles)(ExpandableSection);

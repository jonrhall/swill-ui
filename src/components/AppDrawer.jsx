import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
});

const AppDrawer = props => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(
        props.classes.drawerPaper,
        !props.expanded && props.classes.drawerPaperClose
      )
    }}
    open={props.expanded}
  >
    <div className={props.classes.toolbar}>
      <IconButton onClick={props.closeDrawer}>
        {props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>{mailFolderListItems}</List>
    <Divider />
    <List>{otherMailFolderListItems}</List>
  </Drawer>
);

AppDrawer.propTypes = {
  classes: PropTypes.shape({
    drawerPaper: PropTypes.string,
    drawerPaperClose: PropTypes.string,
    toolbar: PropTypes.string
  }).isRequired,
  theme: PropTypes.shape({
    direction: PropTypes.string
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AppDrawer);

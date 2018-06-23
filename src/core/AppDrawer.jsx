import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard';
import LocalDrink from '@material-ui/icons/LocalDrink';
import BubblesIcon from '@material-ui/icons/BubbleChart';
import HardwareIcon from '@material-ui/icons/Storage';
import LogIcon from '@material-ui/icons/Archive';
import AddOnsIcon from '@material-ui/icons/AddToPhotos';
import SettingsIcon from '@material-ui/icons/Settings';

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
  },
  selectedButton: {
    color: theme.palette.secondary.main
  }
});

const mapButtonsToList = buttons => (
  <List>
    {buttons.map(button => (
      <Link to={button.route} key={button.text} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon {...{ className: button.selected }}>
            <button.icon />
          </ListItemIcon>
          <ListItemText primary={button.text} />
        </ListItem>
      </Link>
    ))}
  </List>
);

const AppDrawer = (props) => {
  const DrawerButton = (icon, text, route) => ({
    icon,
    text,
    route,
    selected: props.location.pathname === route ? props.classes.selectedButton : null
  });

  // Order matters!
  const primaryButtons = [
    DrawerButton(Dashboard, 'Dashboard', '/dashboard'),
    DrawerButton(LocalDrink, 'Brew', '/brew'),
    DrawerButton(BubblesIcon, 'Ferment', '/ferment')
  ];

  // Order matters!
  const secondaryButtons = [
    DrawerButton(HardwareIcon, 'Hardware Settings', '/hardware'),
    DrawerButton(LogIcon, 'Logs', '/logs'),
    DrawerButton(AddOnsIcon, 'Add-ons', '/addons'),
    DrawerButton(SettingsIcon, 'System Settings', '/system')
  ];

  return (
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
      {mapButtonsToList(primaryButtons)}
      <Divider />
      {mapButtonsToList(secondaryButtons)}
    </Drawer>
  );
};

AppDrawer.propTypes = {
  classes: PropTypes.shape({
    drawerPaper: PropTypes.string,
    drawerPaperClose: PropTypes.string,
    selectedButton: PropTypes.string,
    toolbar: PropTypes.string
  }).isRequired,
  theme: PropTypes.shape({
    direction: PropTypes.string
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(AppDrawer));

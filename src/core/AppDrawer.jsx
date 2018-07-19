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
import SettingsIcon from '@material-ui/icons/DeviceHub';

class AppDrawer extends React.Component {
  static styles = theme => ({
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 220,
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
    },
    selectedText: {
      color: theme.palette.primary.main
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      drawerPaper: PropTypes.string,
      drawerPaperClose: PropTypes.string,
      selectedButton: PropTypes.string,
      selectedText: PropTypes.string,
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
  }

  static mapButtonsToList = buttons => (
    <List>
      {buttons.map(button => (
        <Link to={button.route} key={button.text} style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon className={button.selected}>
              <button.icon />
            </ListItemIcon>
            <ListItemText classes={{ primary: button.selectedText }} primary={button.text} />
          </ListItem>
        </Link>
      ))}
    </List>
  )

  DrawerButton = (icon, text, route) => ({
    icon,
    text,
    route,
    selected: this.props.location.pathname === route ?
      this.props.classes.selectedButton : null,
    selectedText: this.props.location.pathname === route ?
      this.props.classes.selectedText : null
  })

  render() {
    const {
      classes,
      closeDrawer,
      expanded,
      theme
    } = this.props;

    // Order matters!
    const primaryButtons = [
      this.DrawerButton(Dashboard, 'Dashboard', '/dashboard'),
      this.DrawerButton(LocalDrink, 'Brew', '/brew'),
      this.DrawerButton(BubblesIcon, 'Ferment', '/ferment')
    ];

    // Order matters!
    const secondaryButtons = [
      this.DrawerButton(HardwareIcon, 'Hardware', '/hardware'),
      this.DrawerButton(LogIcon, 'Logs', '/logs'),
      this.DrawerButton(AddOnsIcon, 'Plugins', '/plugins'),
      this.DrawerButton(SettingsIcon, 'System', '/system')
    ];

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !expanded && classes.drawerPaperClose
          )
        }}
        open={expanded}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={closeDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {this.constructor.mapButtonsToList(primaryButtons)}
        <Divider />
        {this.constructor.mapButtonsToList(secondaryButtons)}
      </Drawer>
    );
  }
}

export default withStyles(AppDrawer.styles, { withTheme: true })(withRouter(AppDrawer));

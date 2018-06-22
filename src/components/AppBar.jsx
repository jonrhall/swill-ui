import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  }
});

const AppBar = props => (
  <MenuBar
    position="absolute"
    className={classNames(props.classes.appBar, props.expanded && props.classes.appBarShift)}
  >
    <Toolbar disableGutters={!props.expanded}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.openDrawer}
        className={classNames(props.classes.menuButton, props.expanded && props.classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" noWrap>
        Swill UI
      </Typography>
    </Toolbar>
  </MenuBar>
);

AppBar.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string,
    appBarShift: PropTypes.string,
    menuButton: PropTypes.string,
    hide: PropTypes.string
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AppBar);

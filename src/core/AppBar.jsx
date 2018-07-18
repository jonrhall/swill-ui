import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 220;

class AppBar extends React.Component {
  static styles = theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      backgroundColor: theme.palette.primary.dark,
      borderBottom: `2px solid ${theme.palette.secondary.main}`
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
  })

  static propTypes = {
    classes: PropTypes.shape({
      appBar: PropTypes.string,
      appBarShift: PropTypes.string,
      menuButton: PropTypes.string,
      hide: PropTypes.string
    }).isRequired,
    expanded: PropTypes.bool.isRequired,
    openDrawer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const {
      classes,
      expanded,
      name,
      openDrawer
    } = this.props;
    return (
      <MenuBar
        position="absolute"
        className={classNames(classes.appBar, expanded && classes.appBarShift)}
      >
        <Toolbar disableGutters={!expanded}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            className={classNames(classes.menuButton, expanded && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            {name}
          </Typography>
        </Toolbar>
      </MenuBar>
    );
  }
}

export default withStyles(AppBar.styles)(AppBar);

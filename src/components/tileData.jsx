import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalDrink from '@material-ui/icons/LocalDrink';
import BubblesIcon from '@material-ui/icons/BubbleChart';
import HardwareIcon from '@material-ui/icons/Storage';
import LogIcon from '@material-ui/icons/Archive';
import AddOnsIcon from '@material-ui/icons/AddToPhotos';
import SettingsIcon from '@material-ui/icons/Settings';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <LocalDrink />
      </ListItemIcon>
      <ListItemText primary="Brewing" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BubblesIcon />
      </ListItemIcon>
      <ListItemText primary="Fermentation" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HardwareIcon />
      </ListItemIcon>
      <ListItemText primary="Hardware Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogIcon />
      </ListItemIcon>
      <ListItemText primary="Logs" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddOnsIcon />
      </ListItemIcon>
      <ListItemText primary="Add-ons" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="System Settings" />
    </ListItem>
  </div>
);

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppDrawer from './AppDrawer';

const AppState = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        render={() => (
          <AppDrawer />
        )}
      />
    </div>
  </Router>
);

export default AppState;

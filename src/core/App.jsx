import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppView from '../components/AppView';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <div>
        <Route exact path="/" render={() => <Link to="/Actors">Link to Actors</Link>} />
        <Route path="/Actors" component={AppView} />
      </div>
    </Router>
  </React.Fragment>
);

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DataTabs from 'modules/DataTabs/DataTabs';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/teams/:year/:month">
        <DataTabs />
      </Route>
      <Route path="/team/:id">
        <DataTabs />
      </Route>
      <Route path="/donor/:id">
        <DataTabs />
      </Route>
      <Route path="/donor/:os">
        <DataTabs />
      </Route>
      <Route path="/">
        <DataTabs />
      </Route>
    </Switch>
  </Router>
);

export default Routes;

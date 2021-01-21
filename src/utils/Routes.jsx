import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom';
import DataTabs from 'modules/DataTabs/DataTabs';

const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3>
        No match from
        <code>{location.pathname}</code>
      </h3>
    </div>
  );
};
const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/team-monthly" />
    </Route>
    <Route path="/team-monthly">
      <DataTabs />
    </Route>
    <Route path="/team">
      <DataTabs />
    </Route>
    <Route path="/donor">
      <DataTabs />
    </Route>
    <Route path="/os">
      <DataTabs />
    </Route>
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
);

export default Routes;

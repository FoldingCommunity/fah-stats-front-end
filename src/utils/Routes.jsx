import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom';
import TeamMonthly from 'modules/TeamMonthly/TeamMonthly';
import Team from 'modules/Team/Team';
import Donor from 'modules/Donor/Donor';
import Os from 'modules/Os/Os';

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
      <TeamMonthly />
    </Route>
    <Route path="/team">
      <Team />
    </Route>
    <Route path="/donor">
      <Donor />
    </Route>
    <Route path="/os">
      <Os />
    </Route>
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
);

export default Routes;

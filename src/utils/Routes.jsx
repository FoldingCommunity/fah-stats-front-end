import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Home from 'modules/Home/Home';
import Missing from 'modules/Home/Missing';
import Team from 'modules/Team/Team';
import Donor from 'modules/Donor/Donor';
import Project from 'modules/Project/Project';
import Os from 'modules/Os/Os';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/team">
      <Team />
    </Route>
    <Route path="/donor">
      <Donor />
    </Route>
    <Route path="/project">
      <Project />
    </Route>
    <Route path="/os">
      <Os />
    </Route>
    <Route path="*">
      <Missing />
    </Route>
  </Switch>
);

export default Routes;

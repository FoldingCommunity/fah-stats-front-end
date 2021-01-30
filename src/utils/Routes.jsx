import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Home from 'modules/Home/Home';
import Missing from 'modules/Home/Missing';
import Team from 'modules/Team/Team';
import TeamProfile from 'modules/Team/TeamProfile';
import Donor from 'modules/Donor/Donor';
import DonorProfile from 'modules/Donor/DonorProfile';
import Project from 'modules/Project/Project';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/team">
      <Team />
    </Route>
    <Route exact path="/team/:id">
      <TeamProfile />
    </Route>
    <Route exact path="/donor">
      <Donor />
    </Route>
    <Route exact path="/donor/:id">
      <DonorProfile />
    </Route>
    <Route exact path="/project">
      <Project />
    </Route>
    <Route path="*">
      <Missing />
    </Route>
  </Switch>
);

export default Routes;

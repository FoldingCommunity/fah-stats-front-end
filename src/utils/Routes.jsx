import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from 'modules/Home/Home';
import Missing from 'modules/Home/Missing';
import Team from 'modules/Team/Team';
import TeamProfile from 'modules/Team/TeamProfile';
import Donor from 'modules/Donor/Donor';
import DonorProfile from 'modules/Donor/DonorProfile';
import Project from 'modules/Project/Project';
import ProjectProfile from 'modules/Project/ProjectProfile';
import Os from 'modules/Project/Os/Os';
import Server from 'modules/Project/Server/Server';

const reg = new RegExp('^[0-9]+$');
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
    <Route exact path="/donor/id/:id">
      <DonorProfile />
    </Route>
    <Route exact path="/donor/name/:name">
      <DonorProfile />
    </Route>
    <Route
      path="/donor/:id"
      render={({ match }) => {
        if (reg.test(match.params.id)) return <Redirect to={`/donor/id/${match.params.id}`} />;
        return <Redirect to={`/donor/name/${match.params.id}`} />;
      }}
    />
    <Route exact path="/project">
      <Project />
    </Route>
    <Route exact path="/project/:id">
      <ProjectProfile />
    </Route>
    <Route exact path="/os">
      <Os />
    </Route>
    <Route exact path="/server">
      <Server />
    </Route>
    <Route path="*">
      <Missing />
    </Route>
  </Switch>
);

export default Routes;

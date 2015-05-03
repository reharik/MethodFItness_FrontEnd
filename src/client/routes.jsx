"use strict";

var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Root = require("./pages/root");
var ClientList = require("./pages/clientList");
var AddClient = require("./pages/addClient");

var TrainerList = require("./pages/trainerList");
var AddTrainer = require("./pages/addTrainer");
var ViewTrainer = require("./pages/viewTrainer");

var NotFoundPage = require("./pages/notfound");
var NullPage = require("./pages/null");
var SignInPage = require("./pages/signin");
var SignUpPage = require("./pages/signup");
var SignOut = require("./pages/signout");


var routes = (
  <Route handler={Root} path="/" >
    <DefaultRoute name="client-list" handler={ClientList} />
      <Route name="add-client" path="/addclient" handler={AddClient} />
      <Route name="add-trainer" path="/addTrainer" handler={AddTrainer} />
      <Route name="view-trainer" path="/viewTrainer" handler={ViewTrainer} />
      <Route name="trainer-list" path="/trainerList" handler={TrainerList} />
    <Route name="profile" path="/profile" handler={NullPage} />
    <Route name="sign-in" path="/signin" handler={SignInPage} />
    <Route name="sign-up" path="/signup" handler={SignUpPage} />
    <Route name="sign-out" path="/signout" handler={SignOut} />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);

module.exports = routes;

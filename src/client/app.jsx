require("babel/polyfill");
var React = require("react");
var Luxxor = require("./services/luxxor");
var Router = require("react-router");

var constants = require("./mfConstants");
var routes = require("./routes");
var authActions = require("./actions/authActions");
var clientActions = require("./actions/clientActions");
var trainerActions = require("./actions/trainerActions");

var AuthStore = require("./stores/authStore");
var TrainerStore = require("./stores/trainerStore");
var ClientSummaryStore = require("./stores/clientSummaryStore");
var _ = require("lodash");

//require("./less/main.less");

var stores = {
  authStore: new AuthStore(),//,
  trainerStore: new TrainerStore(),
  clientSummaryStore: new ClientSummaryStore()
};
var allActions = _.merge(authActions,clientActions,trainerActions);
var flux = new Luxxor.Flux(stores,allActions);
//flux.addAction(actions.authActions);
//flux.addAction(actions.clientActions);
window.flux = flux;
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

var container = document.getElementById("content");

Router.run(routes, (Handler, State) => {
  _.each(State.routes, function(route) {
    if (route.handler.resolve && flux.actions[route.handler.resolve]) {
      flux.actions[route.handler.resolve]();
    }else{
        console.log("bad route: {0}", route.handler.resolve);
    }
  });
  React.render(
    <Handler flux={flux} />,
    container
  );
});

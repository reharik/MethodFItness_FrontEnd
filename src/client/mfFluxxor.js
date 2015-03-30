//var React = require("react"),
//  Fluxxor = require("fluxxor"),
//  authStore = require("./stores/authStore.js"),
//  clientStore = require("./stores/clientStore.js"),
//  clientSummaryStore = require("./stores/clientSummaryStore"),
//  clientActions = require("./actions/clientActions");
//
//var stores = {
//  authStore: authStore,
//  clientStore: clientStore,
//  clientSummaryStore: clientSummaryStore
//};
//debugger;
//var flux = new Fluxxor.Flux(stores, clientActions);
//window.flux = flux;
//
//flux.on("dispatch", function(type, payload) {
//  if (console && console.log) {
//    console.log("[Dispatch]", type, payload);
//  }
//});
//
//module.exports = flux;

var Fluxxor = require('Fluxxor');
var constants = require("./../mfConstants");
var React = require("react");


module.exports = {
    Dispatcher: Fluxxor.Dispatcher,
    Flux: Fluxxor.Flux,
    FluxChildMixin: Fluxxor.FluxChildMixin,
    StoreWatchMixin: Fluxxor.StoreWatchMixin,
    createStore: Fluxxor.createStore,
    constants: constants,
    FluxMixin: Fluxxor.FluxMixin(React),
    version: Fluxxor.version
};

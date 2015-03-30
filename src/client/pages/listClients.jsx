"use strict";
var React = require("react");
var Fluxxor = require("fluxxor");
var Griddle = require('griddle-react');
var Authentication = require("../mixins/authentication");
var _ = require("lodash");
var constants = require("./../mfConstants");
var Json = require("JSON");


var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  displayName: "Client List",
  mixins: [FluxMixin, StoreWatchMixin("clientSummaryStore"),Authentication ],
  statics: {
    resolve: constants.CLIENTS.LOAD_CLIENT_SUMMARIES
  },

  getStateFromFlux: function(){
    var store = this.getFlux().store("clientSummaryStore");
    console.log("summaries" + Json.stringify(store.getClientSummaries(), null, 2));
    return {
        loading: store.getLoading(),
        error: store.getError(),
        clientSummaries: store.getClientSummaries()
    };
  },
  render: function() {
    return (
      <div>
        <h2>Client List</h2>
        <Griddle results={this.state.clientSummaries} enableInfiniteScroll={true} resultsPerPage={5}/>
      </div>
    );
  }
});

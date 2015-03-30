"use strict";


var Fluxxor = require("fluxxor"),
  constants = require("./../mfConstants");

var clientSummaryStore = Fluxxor.createStore({
  initialize: function() {
    this.loading = false;
    this.error = null;
    this.clientSummaries = [];

    this.bindActions(
      constants.CLIENTS.LOAD_CLIENT_SUMMARIES, this.onLoadClientSummaries,
      constants.CLIENTS.LOAD_CLIENT_SUMMARIES_SUCCESS, this.onLoadClientSummariesSuccess,
      constants.CLIENTS.LOAD_CLIENT_SUMMARIES_FAIL, this.onLoadClientSummariesFail
    );
  },
  onLoadClientSummaries: function() {
    this.loading = true;
    this.emit("change");
  },

  onLoadClientSummariesSuccess: function(payload) {
    this.loading = false;
    this.error = null;

    this.clientSummaries = payload.clientSummaries;
    this.emit("change");
  },

  onLoadClientSummariesFail: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },
  getClientSummaries: function(){
    return this.clientSummaries;
  },
  getLoading: function(){
    return this.loading;
  },
  getError: function(){
    return this.errror;
  }

});
module.exports = clientSummaryStore;

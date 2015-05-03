"use strict";

var Luxxor = require("./../services/luxxor");

var trainerStore = Luxxor.createStore({
  initialize: function() {
      this.loading = false;
      this.error = null;
      this.trainerSummaries = [];

      this.bindActions2({
          servicesActions: [Luxxor.constants.TRAINERS.LOAD_TRAINER_SUMMARIES],
          directActions: {}
      });
  },

  onLoadTrainerSummariesSuccess: function(payload) {
    this.loading = false;
    this.error = null;

    this.trainerSummaries = payload.trainerSummaries;
    this.emit("change");
  },

  getTrainerSummaries: function(){
    return this.trainerSummaries;
  },
  getLoading: function(){
    return this.loading;
  },
  getError: function(){
    return this.errror;
  }

});
module.exports = trainerStore;

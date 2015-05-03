/*jslint node: true */
"use strict";
var request = require("superagent");
var requestPromise = require("./../services/promiseSuperAgent");


var URLS = {
  TRAINERS: "/trainers",
  ADD_TRAINER: "/trainer/create"
};


module.exports = {
  AddTrainer: function (trainer) {
    return requestPromise(
      request.post(URLS.ADD_TRAINER)
        .set("Accept", "application/json")
        .send(trainer)
    );
  },
  LoadTrainerSummaries: function () {
    return requestPromise( request.get(URLS.TRAINERS)
        .set("Accept", "application/json")
    );
  }
};

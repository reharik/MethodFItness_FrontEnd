"use strict";

var constants = require("./../mfConstants");

var clientRepository = require("./../repositories/clientRepository");
var userRepository = require("./../repositories/userRepository");
var co = require('co');
var Json = require('JSON');

var actions = {
  TrainerGeneratedClientSignedUp: function (client) {
    this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP, {client: client});

    clientRepository.save(function (client) {
      this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP_SUCCESS, {client: client});
    }.bind(this), function (error) {
      this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP_FAIL, {error: error});
    }.bind(this));
  },
  LoadClientSummaries: function () {
    this.dispatch(constants.CLIENTS.LOAD_CLIENT_SUMMARIES, {});

    clientRepository.loadClientSummaries().then(function (payload) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENT_SUMMARIES_SUCCESS, {clientSummaries: payload.clientSummaries});
    }.bind(this), function (error) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENT_SUMMARIES_FAIL, {error: error});
    }.bind(this));
  },
  FetchUser: function (){
    this.dispatch(constants.USERS.FETCH_USER, {});

    userRepository[constants.USERS.FETCH_USER]().then(function (payload) {
      this.dispatch(constants.USERS.FETCH_USER_SUCCESS, {user: payload ? payload.user : {}});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.FETCH_USER_FAIL, {error: error});
    }.bind(this));
  },
  SignIn: function(username, password) {
    this.dispatch(constants.USERS.SIGN_IN, {});

    userRepository[constants.USERS.SIGN_IN]({ username: username, password: password }).then(function (payload) {
      this.dispatch(constants.USERS.SIGN_IN_SUCCESS, {user: payload.user});
    }.bind(this), function (error) {
        this.dispatch(constants.USERS.SIGN_IN_FAIL, {error: error});
    }.bind(this));
  },
  SignOut: function () {
    this.dispatch(constants.USERS.SIGN_OUT, {});

    userRepository[constants.USERS.SIGN_OUT]().then(function () {
      this.dispatch(constants.USERS.SIGN_OUT_SUCCESS, {});
    }.bind(this), function (error) {
      this.dispatch(constants.USERS.SIGN_OUT_FAIL, {error: error});
    }.bind(this));
  },
  SignUp: function(newUser) {
    this.dispatch(constants.USERS.SIGN_UP, {});
    co(function *(){
      yield userRepository[constants.USERS.SIGN_UP](newUser);
      return yield userRepository[constants.USERS.FETCH_USER]();
    }).then(
      function(payload){
        this.dispatch(constants.USERS.SIGN_UP_SUCCESS, {user: payload.user});}.bind(this),
      function(error){
        this.dispatch(constants.USERS.SIGN_UP_FAIL, {error: error});}.bind(this)
    );
  }
};

module.exports = actions;

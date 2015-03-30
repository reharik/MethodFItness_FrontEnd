"use strict";


var Fluxxor = require("fluxxor"),
  constants = require("./../mfConstants");

var AuthStore = Fluxxor.createStore({
  initialize: function () {
    this.loading = false;
    this.error = null;
    this._user = null;

    this.bindActions(
      constants.USERS.FETCH_USER, this.onFetchUser,
      constants.USERS.FETCH_USER_SUCCESS, this.onFetchUserSuccess,
      constants.USERS.FETCH_USER_FAIL, this.onFetchUserFail,
      constants.USERS.SIGN_IN, this.onSignIn,
      constants.USERS.SIGN_IN_SUCCESS, this.onSignInSuccess,
      constants.USERS.SIGN_IN_FAIL, this.onSignInFail,
      constants.USERS.SIGN_OUT, this.onSignOut,
      constants.USERS.SIGN_OUT_SUCCESS, this.onSignOutSuccess,
      constants.USERS.SIGN_OUT_FAIL, this.onSignOutFail,
      constants.USERS.SIGN_UP, this.onSignUp,
      constants.USERS.SIGN_UP_SUCCESS, this.onSignUpSuccess,
      constants.USERS.SIGN_UP_FAIL, this.onSignUpFail
    )
  },

  onFetchUser: function () {
    this.loading = true;
    this.emit("change");
  },
  onFetchUserSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload.user;
    this.emit("change");
  },
  onFetchUserFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  onSignIn: function () {
    this.loading = true;
    this.emit("change");
  },
  onSignInSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload.user;
    this.emit("change");
  },
  onSignInFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  onSignOut: function () {
    this.loading = true;
    this.emit("change");
  },
  onSignOutSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = null;
    this.emit("change");
  },
  onSignOutFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  onSignUp: function () {
    this.loading = true;
    this.emit("change");
  },
  onSignUpSuccess: function (payload) {
    this.loading = false;
    this.error = "";

    this._user = payload.user;
    this.emit("change");
  },
  onSignUpFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  isLoggedIn: function () {
    return this._user !== null && this._user !== {} ;
  },
  getUser: function () {
    return this._user;
  },
  getLoading: function () {
    return this.loading;
  },
  getError: function () {
    return this.error;
  }

});//

module.exports = AuthStore;

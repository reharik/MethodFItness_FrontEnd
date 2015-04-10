"use strict";

var Luxxor = require("./../services/luxxor");


var AuthStore = Luxxor.createStore({
  initialize: function () {
    this.loading = false;
    this.error = null;
    this._user = null;

    this.bindActions2({servicesActions:[
      Luxxor.constants.USERS.FETCH_USER,
      Luxxor.constants.USERS.SIGN_IN
    ],
    directActions:{}
    });


    this.bindActions(
      Luxxor.constants.USERS.FETCH_USER, this.onFetchUser,
      Luxxor.constants.USERS.FETCH_USER_SUCCESS, this.onFetchUserSuccess,
      Luxxor.constants.USERS.FETCH_USER_FAIL, this.onFetchUserFail,
      Luxxor.constants.USERS.SIGN_IN, this.onSignIn,
      Luxxor.constants.USERS.SIGN_IN_SUCCESS, this.onSignInSuccess,
      Luxxor.constants.USERS.SIGN_IN_FAIL, this.onSignInFail,
      Luxxor.constants.USERS.SIGN_OUT, this.onSignOut,
      Luxxor.constants.USERS.SIGN_OUT_SUCCESS, this.onSignOutSuccess,
      Luxxor.constants.USERS.SIGN_OUT_FAIL, this.onSignOutFail,
      Luxxor.constants.USERS.SIGN_UP, this.onSignUp,
      Luxxor.constants.USERS.SIGN_UP_SUCCESS, this.onSignUpSuccess,
      Luxxor.constants.USERS.SIGN_UP_FAIL, this.onSignUpFail
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
    this.error = payload;
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
    this.error = payload;
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
    this.error = payload;
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
    this.error = payload;
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

"use strict";

var Luxxor = require("./../services/luxxor");

var AuthStore = Luxxor.createStore({
  initialize: function () {
    this.loading = false;
    this.error = null;
    this._user = null;

    this.bindActions2({
        servicesActions: [
            Luxxor.constants.AUTH.FETCH_USER,
            Luxxor.constants.AUTH.SIGN_IN,
            Luxxor.constants.AUTH.SIGN_OUT,
            Luxxor.constants.AUTH.SIGN_UP
        ],
        directActions: {}
    });
  },

  onFetchUserSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload;
    this.emit("change");
  },

  onSignInSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload;
    this.emit("change");
  },

  onSignOutSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = null;
    this.emit("change");
  },

  onSignUpSuccess: function (payload) {
    this.loading = false;
    this.error = "";

    this._user = payload;
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

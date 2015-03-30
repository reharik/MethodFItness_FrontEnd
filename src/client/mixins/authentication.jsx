var SignIn = require("../pages/signin");
//var AuthStore = require("../stores/authStore");

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      var authStore = flux.store("authStore");
      if (!authStore.isLoggedIn()) {
        SignIn.attemptedTransition = transition;
        transition.redirect("sign-in");
      }
    }
  }
};

module.exports = Authentication;

var React = require("react");
var Router = require("react-router");
var constants = require("./../mfConstants");

var SignOut = React.createClass({

  statics: {
    resolve: constants.AUTH.SIGN_OUT
  },
  contextTypes: { router: React.PropTypes.func.isRequired },
  getInitialState: function() {
    return {};
  },

  render: function () {
    this.context.router.transitionTo("sign-in");

    return null;
  }
});

module.exports = SignOut;

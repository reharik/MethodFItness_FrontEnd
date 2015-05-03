"use strict";

var React = require("react");
var Navbar = require("./../components/navbar");
var Layout = require("./../pages/layout");
var Luxxor = require("./../services/luxxor");

var Root = React.createClass({
  displayName: "Root",
  mixins: [Luxxor.FluxMixin],
  statics: {
    resolve: Luxxor.constants.AUTH.FETCH_USER
  },
  getStateFromFlux: function(){
    return{
    };
  },

  render: function () {
    return (
      <div>
        <Navbar brand="Method Fitness"  />
        <Layout  />
      </div>
    );
  }
});

module.exports = Root;

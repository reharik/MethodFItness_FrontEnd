"use strict";
var React = require("react");
var PropTypes = React.PropTypes;

var Link = require("react-router").Link;

var Navbar = require("react-bootstrap").Navbar;
var Nav = require("react-bootstrap").Nav;
var Glyphicon = require("react-bootstrap").Glyphicon;

var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;

var Luxxor = require("./../services/luxxor");
var Authentication = require("../mixins/authentication");

var AppNavbar = React.createClass({
  displayName: "AppNavbar",
  propTypes: {
    brand: PropTypes.string
  },
  mixins: [Luxxor.FluxMixin, Luxxor.StoreWatchMixin("authStore"), Authentication],

  statics: {
    resolve: Luxxor.constants.AUTH.FETCH_USER
  },

  getStateFromFlux: function(){
    var store = this.getFlux().store("authStore");
    return {
      loading: store.getLoading(),
      error: store.getError(),
      user: store.getUser()
    };
  },

  renderBrand: function () {
    return (<Link to="client-list">{this.props.brand}</Link>);
  },
  renderNavLinks: function () {
    if (this.state.user) {
      return (
        <Nav right eventKey={0}>
          <NavItemLink eventKey={1} to="profile">
            <Glyphicon glyph="user" /> {this.state.user.username}
          </NavItemLink>
          <NavItemLink to="sign-out">
            <Glyphicon glyph="off" /> Sign out
          </NavItemLink>
        </Nav>
      );
    }
    return (
      <Nav right eventKey={0}>
        <NavItemLink eventKey={1} to="sign-up">
           <Glyphicon glyph="user" /> Sign up
        </NavItemLink>
      </Nav>
    );
  },
  render: function () {
    return (
      <Navbar brand={this.renderBrand()} inverse fixedTop toggleNavKey={this.state.user ? 0 : undefined}>
        {this.renderNavLinks()}
      </Navbar>
    );
  }
});

module.exports = AppNavbar;

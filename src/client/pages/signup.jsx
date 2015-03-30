var React = require("react");
var Router = require("react-router");

var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var Fluxxor = require("fluxxor");
var constants = require("./../mfConstants");

var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SignUp = React.createClass({
  displayName: "SignUp",
  mixins: [FluxMixin, StoreWatchMixin("authStore")],
  contextTypes: { router: React.PropTypes.func.isRequired },

  getStateFromFlux: function(){
    var store = this.getFlux().store("authStore");
    if(store.isLoggedIn()){
      this.context.router.transitionTo("/");
    }
    return {
      loading: store.getLoading(),
      error: store.getError()
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var newUser = {
    'username': this.refs.username.getValue(),
    'firstName': this.refs.firstName.getValue(),
    'lastName': this.refs.lastName.getValue(),
    'email': this.refs.email.getValue(),
    'password': this.refs.password.getValue()};
    var repeatPassword = this.refs.repeatPassword.getValue();
    if (newUser.password === repeatPassword && newUser.password.trim()) {
      var _flux = this.getFlux();
      _flux.actions[constants.USERS.SIGN_UP](newUser);
          //return this.setState({ error: "Could not Create the User" });
    }
  },
  renderErrorBlock: function () {
    return (<p className="help-block">{this.state.error}</p>);
  },

  render: function () {
    return (
      <div>
        <h1>Sign Up</h1>
        <Col md={4} mdOffset={4}>
          <form onSubmit={this.handleSubmit} className={this.state.error ? "has-error" : null}>
            <Input type="text" ref="firstName" placeholder="First Name" label="First Name" />
            <Input type="text" ref="lastName" placeholder="Last Name" label="Last Name" />
            <Input type="email" ref="email" placeholder="Email" label="Email" />
            <Input type="text" ref="username" placeholder="username" label="Username" />
            <Input type="password" ref="password" placeholder="password" label="Password" />
            <Input type="password" ref="repeatPassword" placeholder="password" label="Repeat Password" />
            <Button type="submit" bsStyle="success" className="pull-right">Sign Up</Button>
            {this.renderErrorBlock()}
          </form>
        </Col>
      </div>
    );
  }
});

module.exports = SignUp;

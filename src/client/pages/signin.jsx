var React = require("react");
var Router = require("react-router");

var Link = Router.Link;

var Jumbotron = require("react-bootstrap").Jumbotron;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Button = require("react-bootstrap").Button;

var RHInput = require('./../components/formConcerns/RHInput');
var validators = require('./../components/formConcerns/validatorEnum');

var Luxxor = require("./../services/luxxor");

var SignIn = React.createClass({
  displayName: "SignInPage",
  mixins: [Luxxor.FluxMixin, Luxxor.StoreWatchMixin("authStore") ],
  contextTypes: { router: React.PropTypes.func.isRequired },

  statics: {
    attemptedTransition: null
  },
  getStateFromFlux: function(){
    var store = this.getFlux().store("authStore");
    if(store.isLoggedIn()){
      this.retryTransition();
    }
    return {
      loading: store.getLoading(),
      error: store.getError()
    };
  },

  handleSubmit: function (e) {
      e.preventDefault();
      if (this.refs.username.isValid()
          && this.refs.password.isValid()
      ) {

          var username = this.refs.username.getValue();
          var password = this.refs.password.getValue();
          this.getFlux().actions[Luxxor.constants.AUTH.SIGN_IN](username, password);
      }
  },

  retryTransition: function () {
    if (SignIn.attemptedTransition && SignIn.attemptedTransition.path=="sign-in") {
      var transition = SignIn.attemptedTransition;
      SignIn.attemptedTransition = null;
      transition.retry();
    } else {
      this.context.router.replaceWith("client-list");
    }
  },
  renderErrorBlock: function () {
    return this.state.notInitialLoad && this.state.error ? <p className="help-block">Bad login information</p> : null;
  },
  render: function () {
    return (
      <div>
        <h1>Sign In</h1>
        <Row>
          <Col md={8}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
          <Col md={4}>
            <form onSubmit={this.handleSubmit} className={this.state.error ? "has-error" : null}>
              <RHInput type="text" ref="username" name='username' validators={[validators.REQUIRED]}  />
              <RHInput type="password" ref="password" name='password' validators={[validators.REQUIRED]}  />
              <Button type="submit" bsStyle="success" className="pull-right">Sign In</Button>
              {this.renderErrorBlock()}
            </form>
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={3}>
            <p>Dont have an account You can <Link to="sign-up">sign up</Link></p>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = SignIn;

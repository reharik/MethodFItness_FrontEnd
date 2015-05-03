var React = require("react");
var Router = require("react-router");

var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var RHInput = require('./../components/formConcerns/RHInput');
var validators = require('./../components/formConcerns/validatorEnum');


var luxxor = require("./../services/luxxor");

var SignUp = React.createClass({
    displayName: "SignUp",
    mixins: [luxxor.FluxMixin, luxxor.StoreWatchMixin("authStore")],
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
        if(this.refs.username.isValid()
            && this.refs.firstName.isValid()
            && this.refs.lastName.isValid()
            && this.refs.email.isValid()
            && this.refs.password.isValid()
        ) {
            this.setState({'notInitialLoad':true});
            var newUser = {
                'username': this.refs.username.getValue(),
                'firstName': this.refs.firstName.getValue(),
                'lastName': this.refs.lastName.getValue(),
                'email': this.refs.email.getValue(),
                'password': this.refs.password.getValue()
            };
            var repeatPassword = this.refs.repeatPassword.getValue();
            if (newUser.password === repeatPassword && newUser.password.trim()) {
                var _flux = this.getFlux();
                _flux.actions[luxxor.constants.AUTH.SIGN_UP](newUser);
                //return this.setState({ error: "Could not Create the User" });
            }
        }
    },
    renderErrorBlock: function () {
        return (<p className="help-block">{this.state.notInitialLoad && this.state.error}</p>);
    },

    render: function () {
        return (
            <div>
                <h1>Sign Up</h1>
                <Col md={4} mdOffset={4}>
                    <form onSubmit={this.handleSubmit} className={this.state.error ? "has-error" : null}>
                        <RHInput type="text" ref="firstName" name='firstName' validators={[validators.REQUIRED]} />
                        <RHInput type="text" ref="lastName" name='lastName' validators={[validators.REQUIRED]} />
                        <RHInput type="email" ref="email" name='email' validators={[validators.REQUIRED, validators.EMAIL]} />
                        <RHInput type="text" ref="username" name='username' validators={[validators.REQUIRED]} />
                        <RHInput type="password" ref="password" name='password' validators={[validators.REQUIRED]} />
                        <RHInput type="password" ref="repeatPassword" name='repeatPassword' validators={[validators.REQUIRED]} />
                        <Button type="submit" bsStyle="success" className="pull-right">Sign Up</Button>
            {this.renderErrorBlock()}
                    </form>
                </Col>
            </div>
        );
    }
});

module.exports = SignUp;

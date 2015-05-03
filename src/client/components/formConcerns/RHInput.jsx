"use strict"

var React = require("react");
var validationRunner = require('./validation.js');
var BSInput = require("react-bootstrap").Input;

var RHInput = React.createClass({
    natural: function (val) {
        return val.replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function (str) { return str.toUpperCase(); });
    },
    getInitialState: function () {
        return {"myValue": this.props.value};
    },
    getValue: function () {
        return this.state.myValue;
    },
    isValid: function () {
        return this.validate(this.refs[this.props.name].getValue());
    },
    validate: function (value) {
        var result = validationRunner(this.props.validators, value, "text");
        if(result.valid){
            this.setState({bsStyle:"success"});
            return true;
        }
        this.setState({bsStyle: "error"});
        return false;
    },
    handleChange: function (event) {
        event.preventDefault();
        this.validate(event.target.value);
        this.setState({myValue: event.target.value});
    },

    render: function () {
        var label = this.natural(this.props.label || this.props.name);
        var placeholder = this.natural(this.props.placeholder || this.props.name);

        return (<BSInput type='text'
            label={label}
            placeholder={placeholder}
            value={this.state.myValue}
            ref={this.props.name}
            onChange={this.handleChange}
            bsStyle={this.state.bsStyle}
            hasFeedback={true} />);
    }
});

module.exports = RHInput;


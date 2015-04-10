var React = require("react");
var bs = require("react-bootstrap");
var RHDisplay = require('./RHDisplay.jsx');
var RHInput = require('./RHInput.jsx');



var RHEditableElement = React.createClass({
    getValue:function(){
        return this.refs[this.props.name].getValue();
    },
    isValid: function(){
        return this.refs[this.props.name].isValid();
    },
    render: function () {
        if(this.props.isEditing){
            return (<RHInput type='text' name={this.props.name} ref={this.props.name} value={this.props.value} validators={this.props.validators} />)
        }
        return (<RHDisplay name={this.props.name} value={this.props.value} />)
    }
});

module.exports = RHEditableElement;
 

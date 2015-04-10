var React = require("react");
var bs = require("react-bootstrap");
var _ = require("lodash");



var RHEditableForm = React.createClass({
    displayName:'editable form',
    propTypes:{
        onIsEditingChange: React.PropTypes.func.isRequired
    },
    handleClick(event){
        event.preventDefault();
        var refs = this.refs;
        if(event.currentTarget.name === "ok") {
            var isValid = _.all(this.props.children, function (item) {
                return !refs[item.ref].isValid || refs[item.ref].isValid()
            }.bind(this)).bind(this);
        }
        this.props.onIsEditingChange(event.currentTarget.name, isValid);
    },
    render: function () {
        if(this.props.isEditing){
            return (<bs.Well>
                {this.props.children}
                <bs.Button bsStyle='success' name="ok" onClick={this.handleClick}>Ok</bs.Button>
                <bs.Button bsStyle='danger' name="cancel" onClick={this.handleClick}>X</bs.Button>
            </bs.Well>);
        }
        return (<bs.Well>
                    {this.props.children}
                    <bs.Button bsStyle='info' name="edit" onClick={this.handleClick}>edit</bs.Button>
                </bs.Well>)
    }
});

module.exports = RHEditableForm;


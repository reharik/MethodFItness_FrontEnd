var React = require("react");
var BSbutton = require("react-bootstrap").Button;
var BSWell = require("react-bootstrap").Well;
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
            return (<BSWell>
                {this.props.children}
                <BSButton bsStyle='success' name="ok" onClick={this.handleClick}>Ok</BSButton>
                <BSButton bsStyle='danger' name="cancel" onClick={this.handleClick}>X</BSButton>
            </BSWell>);
        }
        return (<BSWell>
                    {this.props.children}
                    <BSButton bsStyle='info' name="edit" onClick={this.handleClick}>edit</BSButton>
                </BSWell>)
    }
});

module.exports = RHEditableForm;


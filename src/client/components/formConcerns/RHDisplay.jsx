var React = require("react");

var RHDisplay = React.createClass({
    natEnglishFormCamelCase: function (val) {
        return val.replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function(str){ return str.toUpperCase(); })
    },

    render: function () {
        return (<div>
            <label><span>{this.natEnglishFormCamelCase(this.props.name)}</span></label>
            <p>{this.props.value}</p>
        </div>)
    }
});

module.exports = RHDisplay;

"use strict";
var React = require("react");

var Authentication = require("../mixins/authentication");

module.exports = React.createClass({
  displayName: "Add Client",
  mixins: [Authentication],
  render: function() {
    return (
      <div>
        <h2>Add Client</h2>
      </div>
    );
  }
});

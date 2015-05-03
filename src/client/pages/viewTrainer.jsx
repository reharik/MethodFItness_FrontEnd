"use strict";
var React = require("react");

var Authentication = require("../mixins/authentication");

module.exports = React.createClass({
  displayName: "Add Trainer",
  mixins: [Authentication],
  render: function() {
    return (
      <div>
        <h2>Add Trainer</h2>
      </div>
    );
  }
});

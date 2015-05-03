"use strict";
var React = require("react");
var Luxxor = require("./../services/luxxor");
var Griddle = require('griddle-react');
var Authentication = require("../mixins/authentication");
var _ = require("lodash");
var Json = require("JSON");
var GridLinkComponent = require('./../components/gridConcerns/GridLinkComponent');

module.exports = React.createClass({
  displayName: "Trainer List",
  mixins: [Luxxor.FluxMixin, Luxxor.StoreWatchMixin("trainerSummaryStore"),Authentication ],
  statics: {
    resolve: Luxxor.constants.TRAINERS.LOAD_TRAINER_SUMMARIES
  },

  getStateFromFlux: function(){
    var store = this.getFlux().store("trainerStore");
    console.log("summaries" + Json.stringify(store.getTrainerSummaries(), null, 2));
    return {
        loading: store.getLoading(),
        error: store.getError(),
        clientSummaries: store.getTrainerSummaries()
    };
  },
  render: function() {
      var columnDefs = [
          {
              'columnName': 'FirstName',
              'displayName': 'First Name',
              //'customComponent': GridLinkComponent
          },
          {
              'columnName': 'LastName',
              'displayName': 'Last Name'
          },
          {
              'columnName': 'EmailAddress',
              'displayName': 'Email'
          }
      ];

      var columns = ['FirstName', 'LastName', 'EmailAddress', 'Phone'];

      return (
      <div>
        <h2>Trainer List</h2>
        <Griddle results={this.state.trainerSummaries} columns={columns} columnMetadata={columnDefs} enableInfiniteScroll={true} resultsPerPage={5}/>
      </div>
    );
  }
});

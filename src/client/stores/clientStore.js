"use strict";


var Luxxor = require("./../services/luxxor");


var clientStore = Luxxor.createStore({
  initialize: function(){
    this.loading = false;
    this.error = null;
    this.clients = [];

    this.bindActions(
        Luxxor.constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP, this.onTrainerGeneratedClientSignedUp
    );
  },
  onTrainerGeneratedClientSignedUp: function(payload){
    // do something with payload
    this.emit("change");
  },
  getState:function(){
    return{
      clients: this.clients
    };
  }
});
module.exports = clientStore;

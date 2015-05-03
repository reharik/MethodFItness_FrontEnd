"use strict";

var constants = require("./../mfConstants");
var clientRepository = require("./../repositories/clientRepository");

module.exports = {
        'serviceActions': {
            'TrainerGeneratedClientSignedUp': {
                'actionName': constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP,
                'action': function (client) {
                    return clientRepository[constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP](client);
                }
            },
            'loadClientSummaries': {
                'actionName': constants.CLIENTS.LOAD_CLIENT_SUMMARIES,
                'action': function () {
                    return clientRepository[constants.CLIENTS.LOAD_CLIENT_SUMMARIES]();
                }
            }
        }
};

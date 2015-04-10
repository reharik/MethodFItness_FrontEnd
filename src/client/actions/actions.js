"use strict";

var constants = require("./../mfConstants");

var clientRepository = require("./../repositories/clientRepository");
var userRepository = require("./../repositories/userRepository");
var co = require('co');
var Json = require('JSON');

module.exports = {
    clientActions: {
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
    },

    authActions: {
        'serviceActions': {
            'fetchUser': {
                'actionName': constants.USERS.FETCH_USER,
                'action': function () {
                    return userRepository[constants.USERS.FETCH_USER]();
                }
            },
            'signIn': {
                'actionName': constants.USERS.SIGN_IN,
                'action': function (username, password) {
                    return userRepository[constants.USERS.SIGN_IN]({username: username, password: password});
                }
            },
            'signUp': {
                'actionName': constants.USERS.SIGN_UP,
                'action': function (newUser) {
                    return co(function *() {
                        yield userRepository[constants.USERS.SIGN_UP](newUser);
                        return yield userRepository[constants.USERS.FETCH_USER]();
                    });
                }
            },
            'signOut': {
                'actionName': constants.USERS.SIGN_OUT,
                'action': function () {
                    return userRepository[constants.USERS.SIGN_OUT]();
                }
            }
        }
    }
};

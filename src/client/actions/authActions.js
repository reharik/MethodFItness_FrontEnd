"use strict";

var constants = require("./../mfConstants");

var authRepository = require("./../repositories/authRepository");
var co = require('co');

module.exports = {
        'serviceActions': {
            'fetchUser': {
                'actionName': constants.AUTH.FETCH_USER,
                'action': function () {
                    return authRepository[constants.AUTH.FETCH_USER]();
                }
            },
            'signIn': {
                'actionName': constants.AUTH.SIGN_IN,
                'action': function (username, password) {
                    return authRepository[constants.AUTH.SIGN_IN]({username: username, password: password});
                }
            },
            'signUp': {
                'actionName': constants.AUTH.SIGN_UP,
                'action': function (newUser) {
                    return co(function *() {
                        yield authRepository[constants.AUTH.SIGN_UP](newUser);
                        return yield authRepository[constants.AUTH.FETCH_USER]();
                    });
                }
            },
            'signOut': {
                'actionName': constants.AUTH.SIGN_OUT,
                'action': function () {
                    return authRepository[constants.AUTH.SIGN_OUT]();
                }
            }
        }
};

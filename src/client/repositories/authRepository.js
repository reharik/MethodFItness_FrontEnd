var request = require("superagent");
var requestPromise = require("./../services/promiseSuperAgent");

var URLS = {
  AUTH: "/auth",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout"
};

module.exports = {

  SignUp: function (newUser) {
    return requestPromise(
      request.post(URLS.SIGN_UP)
        .set("Accept", "application/json")
        .send(newUser)
    );
  },

  FetchUser: function () {
    return requestPromise(
      request.get(URLS.AUTH)
        .set("Accept", "application/json")
    );
  },

  SignOut: function () {
    return requestPromise(
      request.get(URLS.SIGN_OUT)
        .set("Accept", "application/json")
    );
  },

  SignIn: function (data) {
    return requestPromise(
      request.post(URLS.AUTH)
        .set("Accept", "application/json")
        .send({username: data.username, password: data.password})
    );
  }
}
function parseUser (user) {
  return {
    id: user.id,
    username: user.username
  };
}


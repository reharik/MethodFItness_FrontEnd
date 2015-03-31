"use strict";
var root = require("path").normalize(__dirname + "/..");

module.exports = {
  paths: {
    "in": {
      less: root + "/src/client/less/*.less",
      jsx: root + "/src/client/**/*.jsx",
      js: root + "/src/client/**/*.js",
      app: root + "/build/app"
    },
    out: {
      build_info: root + "/build-info.json",
      build_js: root + "/build",
      public: root + "/../MethodFitness_Api/public"
    }
  }
};

var Promise = require("bluebird");


function requestCallback(error, res,resolve,reject){
  if(error){ reject(error); }
  else if(res.statusType!=2){ reject(res.text); }
  else {resolve(res.body);}
}

module.exports = function(superAgentRequest){
  return new Promise(
    function(resolve, reject) {
      superAgentRequest.end(function (err, res) {
        requestCallback(err, res, resolve, reject);
      });
    }
  )
};

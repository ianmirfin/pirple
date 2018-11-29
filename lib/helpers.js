/*
 * This is helpers for various tasks
 *
 */

//Dependancies
var crypto = require('crypto');
var config = require('./config');


var helpers = {};

// Create a password Hash
helpers.hash = function(str){
  if(typeof(str) == 'string'  && str.length > 0){
    var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases, with throwing an error
helpers.parseJsonToObject = function(str){
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch(e) {
    return {};
  }
};



// Export the module
module.exports = helpers;

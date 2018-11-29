/*
 * These are the request handlers
 *
 */

//Dependancies
var _data = require('./data');
var helpers = require('./helpers');

//Define the handlers
var handlers = {};

//Sample handlers
handlers.sample = function(data, callback){
  // Call back a http status code, and a payload object
  callback(406,{'name': 'Sample Handler'});
};

handlers.ping = function(data,callback){
  callback(200);
};

handlers.hello = function(data,callback){
  callback(200,{'WelcomeMessage' : 'Welcome to my pirple Assesment #1 Page'});
};
// Not found Handler ie default
handlers.notFound = function(data, callback){
  callback(404);
};

handlers.users = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

//Container for the sub users methods
// Required Data: firstName, lastName, phone, password, tosAgreement
// Optional Data: none
handlers._users = {};

//Users post
handlers._users.post = function(data, callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.LastName.trim().length > 0 ? data.payload.LastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && tosAgreement){
    _data.read('users',phone,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        if(hashedPassword){
          // Creat the user object
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          //store the user
          _data.create('users',phone,userObject,function(err){
            if (!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not creat the new user'});
            }
          });
        } else {
          callback(500,{ 'Error' : 'Could not hash the user\'s password'});
        }
      } else {
        callback(400,{'Error' : 'A user with that phone number already exists'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing Required Fields'});
  }
};


//Users get
handlers._users.get = function(data, callback){
  callback(405,{'Message': 'Not Implemented yet!'})
};
//Users put
handlers._users.put = function(data, callback){
  callback(405,{'Message': 'Not Implemented yet!'})
};
//Users delete
handlers._users.delete = function(data, callback){
  callback(405,{'Message': 'Not Implemented yet!'})
};

//export all the handlers
module.exports = handlers;

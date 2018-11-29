/*
 * Create and export configuration variables
 *
 */

// Container for all the environments
var environments = {};


// Stageing Object environments
environments.stageing = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret'

};

// Production Enviroment
environments.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'thisIsAlsoASecret'
};

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current Environment is one we have defined, if not default to Stageing
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.stageing;

// export the Moudule
module.exports = environmentToExport;

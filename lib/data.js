/*
 *
 *
 *
 *
 */

//Dependancies

var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// Create a container for this Moudule
var lib = {};

// Define the base directoy of this application
lib.baseDir = path.join(__dirname,'/../.data/');

// Write data to a file
lib.create = function(dir, fileName, data, callback){
  //open the file for writing
  fs.open(lib.baseDir+dir+'/'+fileName+'.json','wx',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      //convert data to a string
      var stringData = JSON.stringify(data);

      //Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error Closing new file');
            }
          });
        } else {
          callback('Could not write to file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

//Read data from a file
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
    console.log('Directory & file: ' , dir, file);
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};

// Update data
lib.update = function(dir,file,data,callback){
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      //Convert the data to string
      var stringData = JSON.stringify(data);

      //Truncate the file
      fs.truncate(fileDescriptor,function(err){
        if(!err){
          //Write to the file and close it
          fs.writeFile(fileDescriptor,stringData,function(err){
            if(!err) {
              fs.close(fileDescriptor, function(err){
                if(!err) {
                   callback (false);
                } else {
                  callback('Error closing the file');
                }
              });
            } else {
              callback('Error writing back to existing file')
            }
          });
        } else {
          callback('Error truncating the file');
        }
      });

    } else {
      callback('Could not open file for updating, it may not exist yet')
    }
  });
};

//Delete a file
lib.delete = function(dir, file, callback){
  //Unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
    if(!err){
      callback(false);
    } else {
      callback ('Error deleting the file');
    }
  });
};


// Export the Moudule
module.exports = lib;

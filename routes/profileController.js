var express = require('express');
var profileController = express.Router();
var bodyParser = require('body-parser');

var connectionDB = require('../utility/connectionDB.js');
var userDB = require('../utility/userDB.js');
var UserProfileModel = require('../models/userProfile.js');
var userConnection = require('../models/userConnection.js');

var reqID;
var rsvp;
var userCoded;
var user;//for displaying header according to the session
var userConnectionList;// stores userConnection objects
var reqIdList;//keeps a track of connectionIDs requested
var view;// for displaying header according to the session

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// this is activated when user clicks on login/signup
profileController.get('/savedConnections',function(req,res){
  reqID = req.query.connectionID;
  rsvp =  req.query.rsvp;
  deleteConnectionID = req.query.deleteConnectionID;
  if(req.session.theUser){
    view = "user";

    if(reqID != null){//this is used to solve issues with requests anytime the session is active but there is no query string!

      //Data from user interaction
      connectionObject = connectionDB.getConnection(reqID)[0]
      if (reqIdList.includes(reqID) === false){
        reqIdList.push(reqID);
        var newUserConnection = userConnection.userConnection(req.session.theUser.userID, connectionObject, rsvp);
        userConnectionList.push(newUserConnection);
      }
      else{
        userConnectionList.forEach(function(data){
          if(data.connection.connectionID === reqID){
            data.rsvp = rsvp;
          }
        });
      }
    }
    if(deleteConnectionID != null){
        userConnectionList.forEach(function(data){
          if(data.connection.connectionID === deleteConnectionID){
            var index = userConnectionList.indexOf(data);
            userConnectionList.splice(index,1);
        }
      });


    }

  }
  else{
    userConnectionList = []; // stores userConnection objects
    reqIdList = [];//keeps a track of connectionIDs requested

    //Default data of user from userDB
    var userIndex = 0; //can be 0 or 1
    userCoded = userDB.getUsers()[0][userIndex];
    userDB.getUsers()[1].forEach(function(data){
      if(data.userID === userCoded.userID){
        reqIdList.push(data.connection.connectionID);
        userConnectionList.push(data);
      }
    });
    req.session.theUser = userCoded;
    view = "user";
  }

  var userProfile = new UserProfileModel(req.session.theUser.userID, userConnectionList);
  req.session.userConnection = userProfile.getConnections();
  user = req.session.theUser;
  var userConnectionData = req.session.userConnection;

  res.render('savedConnections',{user:user, userConnectionData:userConnectionData, view:view});
});

//this is for log out
profileController.get('/savedConnections/clearSession',function(req,res){
  req.session.destroy(function(err) {
    if (err) {
      console.log("error deleting session");
    }
  });
  res.redirect('../index');
});

profileController.get('/newConnection',function(req,res){
  if (req.session.theUser){view ="user"; user = req.session.theUser;}
  else{view = "general";}
  res.render('newConnection',{view:view, user:user});
});

module.exports = profileController;

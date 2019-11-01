var express = require('express');
var controller = express.Router();
var reqID;
var connectionDB = require('../utility/connectionDB.js');
var view;// for displaying header according to the session
var user;//for displaying header according to the session

controller.get('/connections',function(req,res){
  if (req.session.theUser){view ="user"; user = req.session.theUser;}
  else{view = "general";}
  res.render('connections', {view:view, data: connectionDB.getConnections(), dataTopic: connectionDB.getTopicList(), user:user});
});

//if the connectionID in the query string is vaild it displays the requested page.
//if no query string is passed i.e. if connectionID is undefined or when connectionID is invalid connections view is shown (list of all connections)
controller.get('/connection', function(req,res){
  if (req.session.theUser){view ="user"; user = req.session.theUser;}
  else{view = "general";}
  reqID = req.query.connectionID;
  if (reqID === undefined) {
    // console.log("query string is undefined");
    res.render('connections', {view:view, data: connectionDB.getConnections(), dataTopic: connectionDB.getTopicList(), user:user});
  }
  else if (connectionDB.validate(reqID) === true){
    // console.log("Valid!!!!");
    res.render('connection',{view:view, details:connectionDB.getConnection(reqID)[0], reqID:reqID, user:user});
  }
  else {
    // console.log("query string is not valid");
    res.render('connections', {view:view, data: connectionDB.getConnections(), dataTopic: connectionDB.getTopicList(), user:user});
  }
});

// this is activated when user clicks on update button in savedConnections view
controller.post('/connection',function(req,res){
  if (req.session.theUser){view ="user"; user = req.session.theUser;}
  else{view = "general";}
  res.render('connection',{view:view, details:connectionDB.getConnection(reqID)[0], user:user});
});

module.exports = controller;

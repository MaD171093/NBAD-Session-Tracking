var user = require('../models/user.js');
var userConnection = require('../models/userConnection.js');
var connectionDB = require('../utility/connectionDB.js');
var userList = [];
var userConnectionList = [];

var userData = [{
  uid:"u1",
  fn: "Manoj",
  ln: "Deshpande",
  em:"mdeshpa4@uncc.edu",
  add1:"9535 UTD",
  add2:"Apt-B",
  city:"Charlotte",
  state:"North Carolina",
  zip:"28262",
  country:"United States",
  conn:[[connectionDB.getConnection('03_flw_club')[0],'maybe'],[connectionDB.getConnection('01_flw_club')[0] ,'yes']]
},
{
  uid:"u2",
  fn: "MaD",
  ln: "TechIntegrator",
  em:"MaD@uncc.edu",
  add1:"9875 UTD",
  add2:"Apt-C",
  city:"Charlotte",
  state:"North Carolina",
  zip:"28262",
  country:"United States",
  conn:[[connectionDB.getConnection('02_flw_club')[0], 'yes'],[connectionDB.getConnection('03_am_club')[0],'maybe']],
}];


userData.forEach(makeUserObject);
userData.forEach(makeUserConnectionObject);

//convert hard coded data to user objects
function makeUserObject(item){
  var item = user.user(item.uid,item.fn,item.ln,item.em,item.add1,item.add2,item.city,item.state,item.zip,item.country);
  userList.push(item);
}

//convert hardcoded data into userConnection objects
function makeUserConnectionObject(item){
  userConnections = item.conn;
  userConnections.forEach(function(data){
    var userConnectionObj = userConnection.userConnection(item.uid,data[0],data[1]);
    userConnectionList.push(userConnectionObj);
  });
}

//returns user objects and user connection objects as a list
var getUsers = function(){
  return [userList, userConnectionList];
}


module.exports.getUsers = getUsers;

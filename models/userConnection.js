var userConnection = function(uid, conn, rsvp){
var userConnectionModel = {userID:uid,connection:conn, rsvp:rsvp};
return userConnectionModel;
};

module.exports.userConnection = userConnection;

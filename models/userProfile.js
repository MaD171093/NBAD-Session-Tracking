class UserProfile{
  constructor(uid,uconn){
    this._userID = uid;
    this._userConnection = uconn;
  }

  addConnection(connection, rsvp){
    var index = this._userConnection.indexOf(connection)
    if (index != -1){
      this._userConnection.push(connection);
    }
    else{
      this._userConnection[index].rsvp = rsvp;
    }
  }

  removeConnection(connection){
    for( var i = 0; i < this._userConnection.length; i++){
       if ( this._userConnection[i] === connection) {
         this._userConnection.splice(i, 1);
       }
    }
  }

  updateConnection(userConnection){
    var index = this._userConnection.indexOf(connection)
    this._userConnection[index].rsvp = userConnection.rsvp;
  }

  getConnections(){
    return this._userConnection;
  }

  emptyProfile(){
    this._userConnection = [];
  }

}


module.exports = UserProfile;

var connection = function(cid, cn, ct, d, dt, loc){
var connectionModel = {connectionID:cid, connectionName:cn, connectionTopic:ct, details:d, dateTime:dt, location:loc};
return connectionModel;
};

module.exports.connection = connection;

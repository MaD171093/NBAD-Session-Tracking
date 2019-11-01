var user = function(uid, fn, ln, em, add1, add2, city, state, zip, country){
var userModel = {
  userID:uid,
  firstName:fn,
  lastName:ln,
  emailAddress:em,
  address1Field:add1,
  address2Field:add2,
  City:city,
  state:state,
  zipCode:zip,
  country:country};
return userModel;
};

module.exports.user = user;

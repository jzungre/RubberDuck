//
// The Session Model
//
//export session
var Session = module.exports;
//uuid = universal unique id
var uuid = require('node-uuid');
// container for all sessions
var list = [];

//finds user session by id
Session.find = function (id) {
  for (var i=0; i < list.length; i++) {
    var user = list[i];
    if ( user.id === id ) return user;
  }
  return null;
};

// put in a user id, pushes a new id to the list
Session.create = function (userId) {
  var newSession = {
    id: uuid.v1(),
    userId: userId
  };

  list.push(newSession);

  return newSession;
};


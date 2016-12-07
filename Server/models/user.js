//
// The User Model
//
var User = module.exports;

var list = [];
var idCounter = 1;

//this function loops through user list and finds by id
User.find = function (id) {
  for (var i=0; i < list.length; i++) {
    var user = list[i];
    if ( user.id === id ) return user;
  }
  return null;
};

//this function searches the user list for target username
User.findByUsername = function (username) {
  for (var i=0; i < list.length; i++) {
    var user = list[i];
    if ( user.username === username ) return user;
  }
  return null;
};
//creates a new user object w/ id, username, password
User.create = function (username, password) {
  console.log('early userlist!!!!: ', list, 'username', username, 'password: ', password);
  var newUser = {
    id: idCounter,
    username: username,
    password: hashPassword(password)
  };
  //pushes new user into list, ups id counter for next user
  list.push(newUser);
  idCounter += 1;
  console.log('after userlist!!!', list);

  return newUser;
};
//checks if entered password matches stored users password
User.matchesPassword = function (user, incomingPassword) {
  return hashPassword(incomingPassword) === user.password;
}

//
// Password Hashing
// NOTE:
//   Real apps will use a hashing algorithm stronger than md5 (such as bcrypt)
//
var crypto = require('crypto');
//hashes password
function hashPassword (password) {
  return crypto.createHash('md5').update(password).digest("hex");
}
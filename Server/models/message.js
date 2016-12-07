//
// The Message Model
//
//export message functionality as Message
var Message = module.exports;

//message list is just an array
var list = [];
var idCounter = 1;

//message.all function creates a copy of list and returns it
Message.all = function (id) {
  return list.slice() // Return copy to prevent mutation
};
// this function creates a new message. takes in: userId, content.
Message.create = function (userId, content) {
  var newMessage = {
    id: idCounter,
    userId: userId,
    content: content
  };
  //push message into messages array
  list.push(newMessage);
  idCounter += 1; // up the counter so the next message has a different number
  // why are we returning this?
  return newMessage;
};
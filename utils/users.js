const users = [];

// Join user to room
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}
  
module.exports = {
    userJoin,
    getRoomUsers
};
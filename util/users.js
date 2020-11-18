const users=[];//state keeping track of users

//join to join user
function userJoin(id,username,room){
  const user={id,username,room};

  users.push(user);

  return user;
}

function getCurrentUser(id){

    return users.find(user => user.id===id);
}
//tells which suer has left
function userLeave(id){
  
  const index=users.findIndex(user=>user.id===id)
  if(index!==-1)
  {
    return users.splice(index,1)[0];
  }

}
//tells users in specific room
function getRoomUsers(room){
  return users.filter(user => user.room==room)
}
module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers

}
const socket=io();

const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const {username, room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
})

socket.emit('joinRoom',{username,room});


socket.on('message',(message)=>{

 //displaying incoming message
 
 output(message);
 
 chatMessages.scrollTop=chatMessages.scrollHeight;

});

chatForm.addEventListener('submit',e=>{
  
  e.preventDefault();
  
  const msg=e.target.elements.msg.value;
  // console.log(msg);

  //emit message to server
  socket.emit('chatMessage',msg);
  e.target.elements.msg.value='';
  e.target.elements.msg.focus();

});


socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users);
})
function output(message){

  let div=document.createElement('div');
  div.classList.add('message');
  div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
  <p classs="text">${message.txt}</p>`;
  chatMessages.appendChild(div);
}

function outputRoomName(room){
  document.getElementById('room-name').innerText=room;
}

function outputUsers(users){
  document.getElementById('users').innerHTML=`
   ${users.map(user=>`<li>${user.username}</li>`).join('')}
  `
}
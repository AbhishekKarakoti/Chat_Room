const Express=require('express');

const app=Express();

const port=process.env.PORT || 5000;

const formatMessage=require(`${__dirname}/util/message.js`);

const {userJoin,getCurrentUser, userLeave,getRoomUsers}=require(`${__dirname}/util/users.js`);

const socket=require('socket.io');

app.use(Express.static(`${__dirname}/public`));
const server= app.listen(port,()=>{
    console.log('server has started');
})

const bot='Chat-bot';

const io=socket(server);

io.on('connection',(socket)=>{
     /// join room
     socket.on('joinRoom',({username,room})=>{
        
        const user=userJoin(socket.id,username,room);

            socket.join(user.room)//inblt function to join specific room

           //welcome current user
            socket.emit('message',formatMessage(bot,'welcome to chat cord'));

            //boradcast when a user connects
            socket.broadcast.to(user.room).emit('message',formatMessage(bot,`${user.username} has joined the chat`));

            //send user and room info
            io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)

        })
    
     })



     

    //listen chat message
    socket.on('chatMessage',(message)=>{
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(`${user.username}`,message));
    })


    //when client disconnects
    socket.on('disconnect',()=>{
        
        const user=userLeave(socket.id);
       
        if(user){
            io.to(user.room).emit('message',formatMessage(bot,`${user.username} has left chat chat`));

            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            })

            // console.log(user.room);
        }

    })

})
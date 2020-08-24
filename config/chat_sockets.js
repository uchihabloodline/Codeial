module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.on('connection',function(socket){
        console.log('chat server connected to server-side ',socket.id);

        socket.on('disconnect',function(){
            console.log('Chat server has got disconnected from server side.');
        })

        //chatRoom event listener handled on server-side
        //data will contain json of whatever data has been transmitted from client-side(chat_engine file)
        socket.on('join_room',function(data){
            console.log("joining request ",data);

            //joins Chat room with name in {chatRoom} attribute
            socket.join(data.chatRoom);
            //emitting or notifying other user in the same chatRoom
            io.in(data.chatRoom).emit('user_joined ',data);
        })
    });
}
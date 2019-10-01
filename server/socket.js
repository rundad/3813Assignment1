module.exports = {

    connect: function(io, PORT, db){

        var socketRoom = []
        var socketRoomnum = []

        const chat = io.of('/chat');

        chat.on('connection', (socket)=>{

            //Event to send message back to the clients
            socket.on('message', (data)=>{
  
                    for(i=0; i<socketRoom.length; i++){
                        //check each if current socket id has joined a room
                        if(socketRoom[i][0] == socket.id){
                            //emit back to the room
                            chat.to(socketRoom[i][1]).emit('message', data)
                        }
                    }
            });

            socket.on('numusers', (room)=>{
                var usercount = 0
                for(i = 0; i<socketRoomnum.length; i++){
                    if(socketRoomnum[i][0] == room){
                        usercount = socketRoomnum[i][1]
                    }
                }
                //send back the count as a numuser event
                chat.in(room).emit('numusers', usercount)
            })

            //join a room
            socket.on("joinRoom", (room)=>{

                if(room.includes(room)){
                    socket.join(room, ()=>{
                        //check not already in a room
                        var inroomSocketarray = false;

                        for(i=0; i<socketRoom.length; i++){
                            //track who is in each room
                            if(socketRoom[i][0] == socket.id){
                                socketRoom[i][1] = room;
                                inroom = true
                            }
                        }

                    if(inroomSocketarray == false){
                        //add socketid/room record
                        socketRoom.push([socket.id, room]);
                        var hasroomnum = false;
                        //recalculate number of users in a room
                        for(let j = 0; j<socketRoomnum.length; j++){

                            if(socketRoomnum[j][0] == room){
                                socketRoomnum[j][1] = socketRoomnum[j][1]+1;
                                hasroomnum = true
                            }
                        }

                        //start tracking numbers of users in a room if it has not been done before
                        if(hasroomnum == false){
                            socketRoomnum.push([room, 1]);
                        }
                    }
                        chat.in(room).emit("notice", "A new user has joined");
                    });
                    return chat.in(room).emit("joined", room)
                }
            });

            //leave a room
            socket.on("leaveroom", (room)=>{
                //chat.to(room).emit("notice", "A user has left")
                console.log(socket.id)
                for(i =0; i< socketRoom.length; i++){
                    if(socketRoom[i][0] == socket.id){
                        chat.to(room).emit("notice", "A user has left")
                        socketRoom.splice(i, 1);
                        socket.leave(room);
                        
                    }
                }


                for(let j=0; j<socketRoomnum.length; j++){
                    if(socketRoomnum[j][0] == room){
                        socketRoomnum[j][1] = socketRoomnum[j][1] - 1;
                        if(socketRoomnum[j][1] == 0){
                            socketRoomnum.splice(j, 1);
                        }
                    }
                }

            });

            socket.on('disconnect', ()=>{
                chat.emit("disconnect");
                for(let i =0; i<socketRoom.length; i++){
                    if(socketRoom[i][0] == socket.id){
                        socketRoom.splice(i, 1);
                    }
                }

                for(let j=0; j<socketRoomnum.length; j++){
                    if(socketRoomnum[j][0] == socket.room){
                        socketRoomnum[j][1] = socketRoomnum[j][1] - 1
                    }
                }
                console.log("Client disconnected")
            })
        })
    }
}
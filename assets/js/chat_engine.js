class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');
        
        if(this.userEmail){
        this.connectionHandler();
        }
    };

    connectionHandler(){
        this.socket.on('connect', function(){
            console.log("chat server is connected!");
        });

        this.socket.emit('join_room',{
            user_email: this.userEmail,
            chatRoom: "Codeial"
        })
        this.socket.on('user_joined',function(data){
            console.log("A user has joined ",data);
        })
    }
};
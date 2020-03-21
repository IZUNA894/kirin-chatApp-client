import socketIOClient from "socket.io-client";
var END_POINT='http://localhost:3001/';
var socket = socketIOClient(END_POINT);
export var hello = ()=>{
    console.log("hello from socket util...");
}

export var sendMsg =(Msg)=>{
    socket.emit("sendMsg",Msg,(success,error)=>{
    if(error){
        console.log("err in sending a msg");
      return;
    }
  else{
    //addMsgToMsgBoard(Msg,"sent");
     console.log("succes in sending a msg");
     }

  });
}


function recieveMsg(cb){
      
    
      socket.on("recieveMsg",(Msg,callback)=>{
      console.log("msg body received as:" , Msg);
      Msg.route="replies";

      cb(Msg);
    })


}

function join(name){
  socket.emit('join', name);
  console.log(socket);
}
export {recieveMsg,join};

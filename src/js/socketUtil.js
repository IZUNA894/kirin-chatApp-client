import socketIOClient from "socket.io-client";
var END_POINT='https://kirin-chatapp-server.herokuapp.com/';
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
// function recieveMsg(){
//     return (new Promise(function(resolve, reject) { 
      
    
//       socket.on("recieveMsg",(Msg,callback)=>{
//       console.log("msg body received as:" , Msg);
//       Msg.route="replies";
//       resolve(Msg);
//       //addMsgToMsgBoard(msg, "replies");
//       //msgBoard.innerHTML=msg.msg || msg.link;
//       //callback();
//     })
//   })
//   ); 
// }

function recieveMsg(cb){
      
    
      socket.on("recieveMsg",(Msg,callback)=>{
      console.log("msg body received as:" , Msg);
      Msg.route="replies";
      // resolve(Msg);
      //addMsgToMsgBoard(msg, "replies");
      //msgBoard.innerHTML=msg.msg || msg.link;
      //callback();
      cb(Msg);
    })


}

function join(name){
  socket.emit('join', name);
  console.log(socket);
}
export {recieveMsg,join};

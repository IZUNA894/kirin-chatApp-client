import React, { Component,useContext} from 'react';
import Profile from "../chatpage/leftPanel/profile";
import SearchBox from "../chatpage/leftPanel/searchBox";
import Contact from "../chatpage/leftPanel/contact";
import BotttomBar from '../chatpage/leftPanel/bottomBar';
import {connect} from "react-redux";
import ContactProfile from "../chatpage/rightPanel/contactProfile";
import Messages from "../chatpage/rightPanel/messages";
import MsgInput from "../chatpage/rightPanel/msgInput";
import "../../css/reset.min.css";
import queryString from 'query-string';
import styles from "../../css/chatpage.css";
import axios from "axios";
import {hello, sendMsg,recieveMsg,join} from "../../js/socketUtil";
import {MainContext} from "../../context/mainContext";
import {ContactListContext} from "../../context/contactList";

 
 function MainParent(props) {
  //var {sender,setOpenedContact} = useContext(MainContext);
  var {setContacts,contacts} = useContext(ContactListContext);
  return(
      <Main setContacts={setContacts} contacts={contacts} socket= {props.socket} queryString = {props.location.search}/>
  )
}
 class Main extends Component {
   state={
     owner:null,
     messages:{},
    //  messages:{MikeRossHarveySpecter:{data:[
                                  //            {val:"hello",route:"sent",time:"12:04 pm"},
                                  //            {val:"hello",route:"replies",time:"12:04 pm"},
                                  //            {val:"hello",route:"sent",time:"12:04 pm"},
    //                                        ],
    //                                    isLoaded:0
            //                           }
             // },
     contacts:[],
     //openedContact:{id:5,name:'Donna Paulsen',imgSrc:'http://emilcarlsson.se/assets/donnapaulsen.png',lastMsg:'Mike, I know everything! I\'m Donna..',route:'recieve',isLoaded:0},
     randomKey:null
    }

   static contextType = MainContext;

  //  handleClick = (contact)=>{
  //    //* var storeData = this.props.localData || this.state;

  //    this.setState({openedContact:contact});
  //    //console.log(contact);
  //    //console.log(storeData.openedContact);

  //  }
   addMsgtostate = (msg)=>{
    //* var storeData = this.props.localData || this.state;
    var {sender} = this.context;
    var {openedContact} = this.context;
    var reciever = openedContact && openedContact.username;
    //var reciever  = msg.sender;
    var storeData = this.state;
    //let tokenId = 'MikeRossHarveySpecter';
    var tokenId="";
    //var sender = this.state.owner;
    //var reciever = this.state.openedContact.name;
    console.log("at creashing 1 site ",openedContact);
    console.log("at crashing site",sender,reciever);
        if(sender.length < reciever.length)
            tokenId = sender + reciever;
            else
            tokenId = reciever + sender;

        tokenId = tokenId.split(" ").join().replace(/,/g,"");
    let messages = {};
    messages = storeData.messages;
    if(storeData.messages[tokenId]){
      messages[tokenId].data= [...storeData.messages[tokenId].data ,msg];
    }else{
      //messages[tokenId]= [msg];
      var data = 'data';
      messages[tokenId] = {};
      messages[tokenId][data] = [];
      messages[tokenId][data] = [msg];
    }
    //console.log(messages);

    var contacts = this.props.contacts;
    contacts = contacts && contacts.map((contact)=>{
      if(msg.sender === contact.username){                  
        contact.lastMsg =  msg.val;
      }
      if(msg.reciever == contact.username){
        contact.lastMsg = 'You:' + msg.val;
      }
      return contact;
    })
    this.props.setContacts(contacts);
    this.setState({messages});
    this.setState({randomKey:Math.random()});

   }

   addMsgstoState = (tokenId,msgs)=>{
    //tokenId = 'MikeRossHarveySpecter';
    var storeData = this.state;
    let messages={};
    messages = storeData.messages;
    //console.log(storeData.messages[tokenId],tokenId);
    messages[tokenId]={};
    console.log(messages);
    var data = "data"
    messages[tokenId][data]=[];
    messages[tokenId].data= [...msgs];
    messages[tokenId].isLoaded = 1;
    //console.log(storeData.messages.tokenId,tokenId);
    //console.log(messages);
    this.setState({messages});

    // var contactId = storeData.openedContact.id;
    // var contacts = [...storeData.contacts];
    // contacts = contacts.map((contact)=>{
    //   if(contactId === contact.id){
    //     contact.isLoaded++;
    //   }
    //   return contact;
    // });
    // this.setState({contacts});
     this.setState({randomKey:Math.random()});              // this is used to force update <messages/> component 

   }
   
   componentWillMount(){
    var {addSender} = this.context;
    //var {name} = queryString.parse(this.props.queryString);
    var user = localStorage.getItem('user');
    //console.log(name);
    user = JSON.parse(user);
    if(user){
    this.setState({owner:user.username});
    addSender(user.username);
    join(user.username);
    }
    //this.props.setState({owner:name});
    //this.state = this.props.localData;
   }
    render() {
        //* var storeData = this.props.localData || this.state;
        var storeData = this.state;
        //console.log("dataStore" ,storeData);
        return (
            
        

              <div id="frame" >
                <div id="sidepanel" class="sidepanel" style={{height:100 + 'vh'}}>
                  <Profile username={storeData.owner ? storeData.owner : ""}/>
                  <SearchBox/>
                  <Contact contacts={storeData.contacts} sender={storeData.owner} />
                  <BotttomBar/>
                </div>


                {/* <!-- right panel... --> */}
                <div className="content" style={{height:100 + 'vh'}}>
                  <ContactProfile  addMsgtostate = {this.addMsgtostate} addMsgstoState = {this.addMsgstoState} messages={this.state.messages} />
                  <Messages messages={storeData.messages} randomKey={storeData.randomKey} addMsgtostate = {this.addMsgtostate} addMsgstoState = {this.addMsgstoState}/>
                  <MsgInput addMsgtostate = {this.addMsgtostate} socket={this.props.socket} contact={storeData.openedContact} sender={storeData.owner}/>
                </div>
              </div>





            
        )
    }
}
var mapStateToProps = (dataStore)=>{
  var state={
    owner:null,
    messages:[{val:"hello",route:"sent",time:"12:04 pm"},
              {val:"hello",route:"replies",time:"12:04 pm"},
              {val:"hello",route:"sent",time:"12:04 pm"},
         ],
    contacts:[{id:1,name:'Louis Litt',imgSrc:'http://emilcarlsson.se/assets/louislitt.png',lastMsg:'You just got LITT up, Mike.',route:"recieve"},
              {id:2,name:'Mike Ross',imgSrc:'http://emilcarlsson.se/assets/harveyspecter.png',lastMsg:'Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.',route:'recieve'},
              {id:3,name:'Harvey Specter',imgSrc:'http://emilcarlsson.se/assets/harveyspecter.png',lastMsg:'Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.',route:"recieve"},
              {id:4,name:'Rachel Zane',imgSrc:'http://emilcarlsson.se/assets/rachelzane.png',lastMsg:'I was thinking that we could have chicken tonight, sounds good?',route:'sent'},
              {id:5,name:'Donna Paulsen',imgSrc:'http://emilcarlsson.se/assets/donnapaulsen.png',lastMsg:'Mike, I know everything! I\'m Donna..',route:'recieve'}
         ],
    openedContact:{id:5,name:'Donna Paulsen',imgSrc:'http://emilcarlsson.se/assets/donnapaulsen.png',lastMsg:'Mike, I know everything! I\'m Donna..',route:'recieve'}

  }

  return {
    ...dataStore
  }
  
}

var mapDispatchToProps = (dispatch)=>{
  return {
   setState: (parameter)=>dispatch({type:"setState",parameter})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainParent);
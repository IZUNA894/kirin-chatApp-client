import React, { Component } from 'react'
import date from "date-and-time";
import 'date-and-time/plugin/meridiem';
import {hello, sendMsg,recieveMsg,join} from "../../../js/socketUtil";
import {MainContext} from "../../../context/mainContext";

  class MsgInputParent extends Component{
    static contextType = MainContext;
    render(){
    
      var {sender,openedContact} = this.context;
      var reciever = openedContact?openedContact.username:"";
      return(
      <MsgInput sender={sender} reciever={reciever} addMsgtostate={this.props.addMsgtostate}/>
      )
    }

  }
 // Apply the plugin to "date-and-time".
 date.plugin('meridiem');

 class MsgInput extends Component {
   state={
     val:null,
     route:"sent",
     time:date.format(new Date(), 'hh:mm a'),
     reciever:null,
     sender:null

   }
   //static contextType = MainContext;

   static getDerivedStateFromProps = (props, state)=>{
     //console.log(props);
     //var {sender,openedContact} = this.context;
     var reciever = props.reciever;
     var sender = props.sender;
     return {...this.state,
            reciever:reciever,
            sender:sender};
   }
   handleSubmit = (e)=>{
     e.preventDefault();

     //console.log(hello());
     var inp =document.getElementById("msgData");
      console.log(this.state);
      inp.value="";
      sendMsg(this.state);
      this.props.addMsgtostate(this.state);

   }
   handleChange=(e)=>{
     this.setState({[e.target.name]:e.target.value});
   }
   componentWillMount(){
      
      //join(this.state.sender);
    }
    render() {     
      
      if(this.props.reciever){
        return (
            <div className="message-input" style={{position:'relative'}}>
              <div className="wrap">
                <form className="form-inline" id="msgForm" action="" method="" onSubmit={this.handleSubmit}>
                  <input type="text" name="val" placeholder="Write your message..." id="msgData" onChange={this.handleChange}/>
                  <button className="submit" id="submit-button" style={{height:'45px'}}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                  <button className="submit" id="find-me" style={{height:'45px'}}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>

                </form>
              </div>
             </div>
        )
      }else{
        return(
          <div></div>
        )
      } 
    }
}
export default MsgInputParent
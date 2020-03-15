import React, { Component } from 'react'
import {recieveMsg} from "../../../js/socketUtil";
import axios from "axios";
import {connect} from "react-redux";
import $ from 'jquery';
import {MainContext} from "../../../context/mainContext"

class messages extends Component {
    state= {
        key:null
    }
    static contextType = MainContext;

    componentDidMount(){
        // recieveMsg().then((Msg)=>{
        //   console.log(Msg)
        //   this.props.addMsgtostate(Msg);
        //  });
        

        recieveMsg((ele)=>this.props.addMsgtostate(ele));
        
        
    }
    // this.forceUpdate(){
    //     console.log("hello from should component updatre");
    //     return true;

    // };
    componentDidUpdate(){
        $("#msgBoard").animate({
            scrollTop:  $(document).height() *1000
          }, "fast","swing");
    }
    render() {
        var {sender,openedContact} =  this.context;
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        //var sender = this.props.owner;
        var reciever = openedContact && openedContact.username;
        var tokenId = "";
        var recieverId = openedContact && openedContact._id;

        var contact = openedContact;
        var route = "";
        var sentLink = "";
        var repliesLink = "";
        if(contact && sender && reciever){
            if(sender.length < reciever.length)
            tokenId = sender + reciever;
            else
            tokenId = reciever + sender;
            //console.log(tokenId);

            tokenId = tokenId.split(" ").join().replace(/,/g,"");
            //console.log(tokenId);
            var msgArray = this.props.messages && this.props.messages[tokenId] && this.props.messages[tokenId].data;
            console.log(msgArray);
            if(msgArray){
                var MsgList = msgArray.map((msg)=>{

                    sentLink = "http://kirin-chatapp-server.herokuapp.com/users/" + user._id + '/avatar'
                    repliesLink = "http://kirin-chatapp-server.herokuapp.com/users/" + recieverId + '/avatar'
                    return(
                       
                        <li className={ msg.route ==="sent" ? 'sent' : 'replies'} key = { Math.random()}>
                        <img src={msg.route == 'sent' ? sentLink : repliesLink } alt="" />
                            <p>{msg.val}<br/>
                                <span style={{float:"right",color:"grey",fontSize:15 +'px'}}>{msg.time}</span>
                            </p>
                        </li>
                    )
                }

                )
                return (
                    <div className="messages" id="msgBoard" style={{height:88 +'vh',backgroundColor:'black'}}>
                        <ul id="msgBoardUl">
                            {MsgList}
                        </ul>
                    </div>
                )
            }
            else{
                return(
                    <div className="messages" id="msgBoard" style={{height:88 +'vh',backgroundColor:'black'}}>
                        <ul id="msgBoardUl">
                            {'No messages in this chat ...\n.Start conversion by saying hello'}
                        </ul>
                    </div>
                )
            }
        }else{
            return(
                <div style={{height:100 + 'vh'}}>
                    Choose contact to chat
                </div>
            )
        }

    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        setMsgsToStore:(tokenId,msgs,cb)=>dispatch({type : "setMsgsToStore" ,tokenId,msgs,cb})
    }
}
export default connect(null,mapDispatchToProps)(messages)
               

                    
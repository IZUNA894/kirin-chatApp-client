// this component is rendering our msg board
import React, { Component } from 'react'
import {recieveMsg} from "../../../js/socketUtil";
import {connect} from "react-redux";
import $ from 'jquery';
import {MainContext} from "../../../context/mainContext"

class messages extends Component {
    state= {
        key:null
    }
    static contextType = MainContext;

    componentDidMount(){
    // here we are listening for incoming msg...through socket io..and adding them to state...
        recieveMsg((ele)=>this.props.addMsgtostate(ele));    
    }
   
    componentDidUpdate(){
        //for automatically scrolling the msg board down...
        $("#msgBoard").animate({
            scrollTop:  $(document).height() *1000
          }, "fast","swing");
    }
    render() {
        var {sender,openedContact} =  this.context;
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        var reciever = openedContact && openedContact.username;
        var tokenId = "";
        var recieverId = openedContact && openedContact._id;

        var contact = openedContact;
        var route = "";
        var sentLink = "";
        var repliesLink = "";
        if(contact && sender && reciever){
            //if  a contact is choosen...

            tokenId = sender < reciever ? sender + reciever : reciever + sender;

            var msgArray = this.props.messages && this.props.messages[tokenId] && this.props.messages[tokenId].data;
            console.log(msgArray);
            if(msgArray){
                // if a contact is choosen and
                //if participants have past msg...
                var MsgList = msgArray.map((msg)=>{
                                    sentLink = "http://localhost:3001/users/" + user._id + '/avatar'
                                    repliesLink = "http://localhost:3001/users/" + recieverId + '/avatar'
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
                    <div className="messages" id="msgBoard" style={{height:'100vh' , backgroundColor:'black'}}>
                        <ul id="msgBoardUl">
                            {MsgList}
                        </ul>
                    </div>
                )
            }
            else{
                // if a contact is choosen and
                //but  they dont have any msg...i.e new to conservation...
                return(
                    <div className="messages" id="msgBoard" style={{height:100 +'vh',backgroundColor:'black'}}>
                        <ul id="msgBoardUl">
                            {'No messages in this chat ...\n.Start conversion by saying hello'}
                        </ul>
                    </div>
                )
            }
        }else{
            // if a contact is not choosen...
            return(
                <div className="messages-no-contact" style={{height:100 + 'vh'}}>
                    <div className="inner-messages-no-contact">
                        <p className="inner-text">Choose contact to chat</p>
                   </div>
                   <div className="inner-messages-no-contact">
                        <i className="fa fa-user-plus fa-fw addContact-icon"></i>
                   </div>
                </div>
            )
        }

    }
}

//redux code..
// no role in logic of app...just for future versions....for now ignore it...
const mapDispatchToProps = (dispatch)=>{
    return{
        setMsgsToStore:(tokenId,msgs,cb)=>dispatch({type : "setMsgsToStore" ,tokenId,msgs,cb})
    }
}
export default connect(null,mapDispatchToProps)(messages)
               

                    
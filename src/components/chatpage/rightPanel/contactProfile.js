// this component is showing friend profile with whom usr is chatting ,on right side
// this component serves very  important role in fetching messags from server of selected contacted

import React, { Component } from 'react'
import axios from "axios";
import {MainContext} from "../../../context/mainContext";
import "../../../css/chatpage.css";

 class contactProfile extends Component {
     static contextType = MainContext;
    addMsgstoState = (tokenId,msgs)=>{
        this.props.addMsgstoState(tokenId,msgs);
    }

    wrapper = (func)=>{
        return(
            (tokenId,msgs)=>{
                return(
                    func(tokenId,msgs)
                )
            }
        )
    }
    componentDidUpdate(prevProps){
        var {sender,openedContact} = this.context;
        var reciever = openedContact && openedContact.username;
        var route="";
        var msgs="";
        if(!reciever){
            return;
        }
        var tokenId = sender < reciever ? sender + reciever : reciever + sender;

        console.log(sender,reciever);
        
        var shouldFetch = 1;
       // checcking if msg for selected contct are already or not
        if(this.props.messages[tokenId] && this.props.messages[tokenId].isLoaded==1)
            shouldFetch = 0
        var addMsgstoState = this.wrapper(this.addMsgstoState);
        //axios req to fetch msg from server
        if(shouldFetch){
            axios.get('http://localhost:3001/msg/getMsg', {
                params: {
                sender,
                reciever
                }
            })
            .then(async function (response) {
                var msgs = response.data;

                console.log("from axios req...");
                console.log(msgs);
                console.log(reciever);

                msgs = msgs && msgs.map((msg)=>{
                    if(msg.sender == sender)
                    route = "sent";
                    else
                    route = 'replies';
                    return{
                        val:msg.val,
                        route,
                        time:msg.time
                    }
                })
                

              
                addMsgstoState(tokenId,msgs);
            })
            .catch(function (error) {
                console.log(error);
            }); 

        }
      
    }
    deleteFriend = (usr)=>{
        var {sender} = this.context;
       
        axios.patch("http://localhost:3001/rel/deleteFriend",{
            sender,uid:usr._id
        })
        .then((res)=>{
            console.log("inside axios");
            console.log(res);
            window.location.reload();
        })
        .catch(function(err){
            console.log(err);
        })
    }
    render() {
        var {openedContact} = this.context;

        var contact = openedContact;
        if(contact)
        return (
            <div id ="contact-profile" className="contact-profile">
                <img src={'http://localhost:3001/users/' + contact._id + '/avatar'} alt="" />
                <p>{contact.username}</p>
                <div className="social-media">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    <i className="fa fa-ellipsis-v" onClick = {(e)=>this.deleteFriend(contact)}></i>
                </div>
            </div>
        )
        else
        return <div id ="contact-profile" className="contact-profile">
                    <p>{''}</p>
        
                </div>
    }
}
export default contactProfile
import React, { Component } from 'react'
import axios from "axios";
import {MainContext} from "../../../context/mainContext";

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
        var tokenId="";
        var msgs="";
        if(!reciever){
            return;
        }
        if(sender.length < reciever.length)
            tokenId = sender + reciever;
        else
            tokenId = reciever + sender;

        tokenId = tokenId.split(" ").join().replace(/,/g,"");

        console.log(sender,reciever);
        //* var somecall = this.props.setMsgsToStore;
        //var addMsgstoState = this.props.addMsgstoState 
        //console.log(this.props.contact.isLoaded);
        var shouldFetch = 1;
        //console.log(this.props.messages[tokenId].isLoaded);
        if(this.props.messages[tokenId] && this.props.messages[tokenId].isLoaded==1)
            shouldFetch = 0
        var addMsgstoState = this.wrapper(this.addMsgstoState);
        // if(this.props.contact.isLoaded == 0){
        // setTimeout(()=>{
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
                        time:"12:49 pm"
                    }
                })
                

                //console.log(msgs,tokenId);
                //* await somecall(tokenId,msgs,()=>console.log("process completed"));
                //anothercall("ojojo",()=>this.setState({ key: Math.random() }));
                //this.setState({ key: Math.random() });
                //shouldComponentUpdate();
                addMsgstoState(tokenId,msgs);
            })
            .catch(function (error) {
                console.log(error);
            }); 

        }
        //},3000);
        //}
        // setTimeout(()=>this.setState({ key: Math.random() }),3000);
        // var somecall = (tokenId,msgs)=>{
        // console.log("chacha ji");
        // this.props.setMsgsToStore(tokenId,msgs);
        // }
    }
    deleteFriend = (usr)=>{
        var {sender} = this.context;
        //var props  = this.props;
        //var sender = "Mike Ross";
        axios.patch("http://localhost:3001/rel/deleteFriend",{
            sender,uid:usr._id
        })
        .then((res)=>{
            console.log("inside axios");
            console.log(res);
            //console.log(this.props);
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
                    <p>{'No contact'}</p>
        
                </div>
    }
}
export default contactProfile
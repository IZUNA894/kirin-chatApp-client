import React, { Component,useContext} from 'react';
import axios from 'axios';
import {ContactListContext} from "../../../context/contactList";
import {MainContext} from "../../../context/mainContext";

function Contact(props) {
    var {sender,setOpenedContact} = useContext(MainContext);
    var {setContacts} = useContext(ContactListContext);
    return(
        <ContactSon sender={sender} setContacts = {setContacts}  setOpenedContact={setOpenedContact}/>
    )
}
class ContactSon extends Component {
    state = {
        contacts:undefined,
        number:0
    }
    static contextType = ContactListContext;

    setActive = (e)=>{

        console.log(e);
    }
    setContacts = (contacts)=>{
        this.setState({contacts});
        this.setState({number:1});
    }
    componentDidUpdate(){
        //var {setContacts} = useContext(ContactListContext);
        //var {sender} = useContext(MainContext);
        var setContacts=this.props.setContacts;
        var sender= this.props.sender;


       
        var somecall = this.setContacts;
        //var sender = this.props.sender;
        var relArry="";
        console.log('sender',sender);
        if(this.state.number == 0){
            axios.get('http://localhost:3001/rel/getFriend', {
                params: {
                sender :sender
                }
            })
            .then(async function (response) {
                var relArry = response.data;
                console.log(relArry,sender);

                //relArry = JSON.parse(relArry);
                console.log("from axios req...");
                console.log(relArry);
                relArry = relArry.map((obj)=>{
                    return obj.uid
                });
                console.log('final Array' ,relArry);
                if(relArry.length>0){
                somecall(relArry);
                setContacts(relArry);
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 

        }
        
    
    }
    render() {
        if(this.state.number == 0)
        this.componentDidUpdate();

        var {contacts} = this.context;
        //console.log('before arry',relArry);
        console.log('contacts' , contacts);
        console.log(this.state);
        var contactList=contacts && contacts.map((contact)=>{
            return <li className={"contact"} onClick={()=>{this.props.setOpenedContact(contact)}} key={contact._id}>
                        <div className="wrap">
                            <span className="contact-status online"></span>
                            <img src={'http://localhost:3001/users/' + contact._id + '/avatar'} alt="" />
                            <div className="meta">
                            <p className="name">{contact.username}</p>
                            <p className="preview">{contact.lastMsg ? contact.lastMsg : ''}</p>
                            </div>
                        </div>
                    </li>
        });
        return (
            <div id="contacts">
                <ul>
                    {contactList}
                </ul>
    </div>
        )
    }
}

export default Contact

// this component is for showing usr friend list on left hand...
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

    // setting contacts loaclly...
    setContacts = (contacts)=>{
        this.setState({contacts});
        this.setState({number:1});
    }

    componentDidUpdate(){
        // for setting contacts in context
        var setContacts=this.props.setContacts;

        var sender= this.props.sender;


       
        //var somecall = this.setContacts;
        var relArry="";
        console.log('sender',sender);

        // axios req for fetching friend list from server
        if(this.state.number == 0){
            axios.get('http://localhost:3001/rel/getFriend', {
                params: {
                sender :sender
                }
            })
            .then(async (response) =>{
                var relArry = response.data;
                console.log(relArry,sender);

                console.log("from axios req...");
                console.log(relArry);
                relArry = relArry.map((obj)=>{
                    return obj.uid
                });
                console.log('final Array' ,relArry);
                if(relArry.length>0){

                // local setting call
                this.setContacts(relArry);
                //context setting call
                setContacts(relArry);
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 

        }
        
    
    }
    render() {
        // checking if contacts are not fetched yet,if not then fetch them
        if(this.state.number == 0)
        this.componentDidUpdate();
        
        // if we have contacts then display them here..
        var {contacts} = this.context;
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

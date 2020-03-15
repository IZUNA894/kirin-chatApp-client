import React, { Component } from 'react'
import "../../css/peopleList.css";
import axios from "axios";
import {MainContext} from "../../context/mainContext"
import SearchBox from "../chatpage/leftPanel/searchBox"
class peopleList extends Component {
    state={
        key:null,
        users:null
    }
    static contextType = MainContext;
    setTheUsrs(usrs){
        console.log(usrs);

        this.setState({usrs})
    }
    componentDidMount(){
        var users="";
        var somecall = this.setState;
        var callSetTheUsrs = (argg)=>this.setTheUsrs(argg)
        var owner = localStorage.getItem('user');
        owner = JSON.parse(owner);

            axios.get('http://kirin-chatapp-server.herokuapp.com/users/all')
                 .then(async function (response) {
                   users = response.data;
                   console.log(users);
                   //somecall({users});
                   users = users.filter((user)=>{
                       return user._id != owner._id
                   })
                   callSetTheUsrs(users);
                  
                // if(sender.length < reciever.length)
                // tokenId = sender + reciever;
                // else
                // tokenId = reciever + sender;
    
                // tokenId = tokenId.split(" ").join().replace(/,/g,"");
    
                // console.log(msgs,tokenId);
                
              })
              .catch(function (error) {
                console.log(error);
              }); 
     //console.log(users);
  
     //this.setState({users:4});
    }
    addFriend(usr){
        var {sender} = this.context;
        var props  = this.props;
        //var sender = "Mike Ross";
        axios.patch("http://kirin-chatapp-server.herokuapp.com/rel/addFriend",{
            sender,uid:usr._id
        })
        .then(function(res){
            console.log("inside axios");
            console.log(res);
            //console.log(props);
            props.history.push("/main")
        })
        .catch(function(err){
            console.log(err);
        })
    }
    render() {
        var users="";
        var users = this.state.usrs || "";
        console.log(users);
        users = users && users.map((usr)=>{
            return <div className="col-md-12">                       
                <div className="card">
                    <div className="card-body">
                        <div className="media align-items-center"><span style={{backgroundImage: 'url(http://kirin-chatapp-server.herokuapp.com/users/' + usr._id + '/avatar)'}} className="avatar avatar-xl mr-3"></span>
                            <div className="media-body overflow-hidden">
                                <h5 className="card-text mb-0">{usr.name}</h5>
                                <p className="card-text text-muted">{'@' +  usr.username}</p>
                                <p className="card-text">{usr.email}</p>
                                <p className="card-text">New Delhi</p>
                                <p className="card-text">India</p>

                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <a href="#" className="btn btn-primary" onClick={(e)=>{e.target.innerHTML= "User Reported"}}>Report User</a>
                        <a href="#" className="btn btn-primary" style={{float:'right'}} onClick={()=>this.addFriend(usr)}>Add friend</a>

                    </div>
                    
                </div>
            </div>
        })
        
        
        
        
        return (
            <div className="container">
                <div className="row">
                    <h1>Find New Friend</h1>
                    {/* <SearchBox/> */}
                </div>
                <div className="row">
                {users}
                </div>
            </div>
        )
    }
}

export default peopleList
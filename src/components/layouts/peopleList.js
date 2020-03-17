import React, { Component } from 'react'
import styles from "../../css/peopleList.module.css";
import axios from "axios";
import {MainContext} from "../../context/mainContext"
import SearchBox from "../chatpage/leftPanel/searchBox"
import poke1 from "../../images/poke-3.png";



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

            axios.get('http://localhost:3001/users/all')
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
        console.log("clicked")
        var {sender} = this.context;
        var props  = this.props;
        //var sender = "Mike Ross";
        axios.patch("http://localhost:3001/rel/addFriend",{
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
        let divClass = [
            
            'mr-3',
            styles.avatar
            
        ];
        divClass = divClass.join(' ');
        users = users && users.map((usr)=>{
            return <div className="col-md-12">                       
                <div className={styles.card}>
                    <div className={styles.cardBody}>
                        <div className="media align-items-center"><span  style={{backgroundImage: 'url(http://localhost:3001/users/' + usr._id + '/avatar)'}} className={divClass} ></span>
                            <div className="media-body overflow-hidden" style={{paddingLeft:'20px'}}>
                                <h5 className="card-text mb-0">{usr.name}</h5>
                                <p className="card-text text-muted">{'@' +  usr.username}</p>
                                <p className="card-text">{usr.email}</p>
                                <p className="card-text">New Delhi</p>
                                <p className="card-text">India</p>

                            </div>
                        </div>
                    </div>

                    <div className={styles.cardBody}>
                        <a href="#" className="btn btn-primary" onClick={(e)=>{e.target.innerHTML= "User Reported"}}>Report User</a>
                        <a href="#" className="btn btn-primary" style={{float:'right'}} onClick={()=>this.addFriend(usr)}>Add friend</a>

                    </div>
                    
                </div>
            </div>
        })
        
        
        
        
        return (
            <div className={styles.body}>
            <div className="container" style={{height:'100vh'}}>
                <div className="jumbotron">
                    <div className="row justify-content-center" >
                        <div className={styles.headBox}>
                        <h1 className={styles.h1}  style={{fontFamily:"comic sans ms",fontWeight:'bold'}}>Find New Friend</h1>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <SearchBox/>
                </div>
                <div className="row">
                {users}
                </div>
            </div>
            </div>
        )
    }
}

export default peopleList
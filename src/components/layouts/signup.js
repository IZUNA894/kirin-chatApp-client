import React, { Component } from 'react';
import "../../css/login.css";
import axios from "axios";
import Logo from "../../images/kirin.png";
 class Signup extends Component {
     state={
         name:null,
         email:null,
         phoneno:null,
         avatar:null,
         username:null,
         password:null,
         confirmPassword:null,
         token:null
     }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state);
        var name = this.state.name;
        var email = this.state.email;
        var phoneno = this.state.phoneno;
        var avatar = this.state.avatar;
        var username = this.state.username;
        var password = this.state.password;
        var confirmPassword = this.state.confirmPassword; 

        var formData = new FormData();
        var imagefile = document.querySelector('#avatar');
        formData.append("avatar", imagefile.files[0]);
        

        axios.post('http://kirin-chatapp-server.herokuapp.com/users/create', {
                name,
                email,
                phoneno,
                username,
                password,
                confirmPassword
                
            })
            .then(async (response)=>{
                var val = response.data;

                console.log("from axios req...");
                console.log(val);
                
                this.setState({token:val.token});
                localStorage.setItem("token",val.token);
                localStorage.setItem('user',JSON.stringify(val.user));
                
            })
            .then( async ()=>{
                var token = this.state.token;
                
                return (axios.post('http://kirin-chatapp-server.herokuapp.com/users/me/avatar', formData, {
                                        headers: {
                                                    'Authorization': `Bearer ${token}`,
                                                    'Content-Type': 'multipart/form-data'
                                                    
                                                }
                                            })
                )
            })
            .then(async (response)=>{
                console.log("inside avatar response");
                console.log(response.data);
                this.props.history.push("./main");

            })
            .catch(function (error) {
                console.log(error.response);
                var errMsg = document.querySelector('.errMsg');

                if(error.response.status == 400)
                errMsg.innerHTML = error.response.data;
                else
                errMsg.innerHTML = error.response.data;

            
            }); 


    }
    checkInput = ()=>{

    }
    render() {
        return (
            <div>
              <div className="">
                  <p className="">Already have a account ?<a href="/">Sign-In</a></p>
              </div>
              <p className="errMsg" ></p>

              <form className="form-signin" onSubmit={this.handleSubmit}>
                <img className="mb-4" src={Logo} alt="" width="400" height="100"/>
                <h1 className="h3 mb-3 font-weight-normal">Sign - Up</h1>
                <h3 className="h3 mb-3 font-weight-normal">* field are required</h3>
                <p id="errMsg"></p>
                <input type="text" name="name" id="name" className="form-control" placeholder="name" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="This name will be helpful for others to identify you" required  />
                <input type="text" name="email" id="email" className="form-control" placeholder="email" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="Your email.Email should be unique " required  />
                <input type="number" name="phoneno" id="phoneno" className="form-control" placeholder="phoneno" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="Phone no will be used to send otp and verify your no." required  />
                <input type="file" name="avatar" id="avatar" className="form-control" placeholder="avatar" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="choose a pic of you,in png or jpeg format,under 100kb" required  />
                <input type="text" name="username" id="username" className="form-control" placeholder="username" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="username will be handle.it shouldn't contain any special char (#,$,%) or uppercase.can contain underscore(-)" required  />
                <input type="password" name="password" id="password" className="form-control" placeholder="password" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="should be greater than 8 characters" required />
                <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="confirmPassword" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="should match with above password" required  />

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign -Up</button>
              </form>

            </div>
        )
    }
}
export default Signup
import React, { Component } from 'react';
import axios from "axios";
import Logo from "../../images/kirin.png";
import "../../css/chatpage.css";

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
        var button = document.querySelector('#submitButton');
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
        
        if(name && email && phoneno && username && password && confirmPassword){
            //if usr has filled email and password and click the submit button
            //disabled it...so the user cannot press it again..
            //this will prevent unneccasary req to server...thus error reduceed...
            button.setAttribute("disabled","disabled");
            }
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

                if(error && error.response && error.response.status && error.response.status == 400){
                    errMsg.innerHTML = error.response.data;
                    //if error hass released the submit buttom so user can press it again...
                    button.removeAttribute("disabled");
                    }
                else{
                errMsg.innerHTML = error.response.data;
                //if error hass released the submit buttom so user can press it again...
                button.removeAttribute("disabled");
                }
            }); 


    }
    
    render() {
        return (
            <div>
              
              <img className="mb-4 logo-image" src={Logo} alt=""/>

              <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Sign - Up</h1>
                <h3 className="h3 mb-3 font-weight-normal text-danger" style={{fontSize:'.9rem'}} >* field are required</h3>
                <div className="form-group ">
                    <label htmlFor="name">Name <span className="errMsg" id="addon">*</span></label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="name" onChange={this.handleChange} data-toggle="tooltip" data-placement="top" title="This name will be helpful for others to identify you" required  />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email <span className="errMsg" id="addon">*</span></label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="email" onChange={this.handleChange} data-toggle="tooltip" data-placement="top" title="Your email.Email should be unique " required  />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNo">Phone no <span className="errMsg" id="addon">*</span></label>
                    <input type="number" name="phoneno" id="phoneno" className="form-control" placeholder="phoneno" onChange={this.handleChange} data-toggle="tooltip" data-placement="top" title="Phone no will be used to send otp and verify your no." required  />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Avatar <span className="errMsg" id="addon">*</span></label>
                    <input type="file" name="avatar" id="avatar" className="form-control" placeholder="avatar" onChange={this.handleChange} data-toggle="tooltip" data-placement="top" title="choose a pic of you,in png or jpeg format,under 5Mb" required  />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username <span className="errMsg" id="addon">*</span></label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="username" onChange={this.handleChange} data-toggle="tooltip" data-placement="top" title="username will be handle.it shouldn't contain any special char (#,$,%) or uppercase.can contain underscore(-)" required  />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password <span className="errMsg" id="addon">*</span></label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="password" onChange={this.handleChange} data-toggle="tooltip" data-placement="top" title="should be greater than 8 characters" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password <span className="errMsg" id="addon">*</span></label>
                    <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="confirmPassword" onChange={this.handleChange} data-toggle="tooltip" data-placement="top" title="should match with above password" required  />
                </div>
                <button id="submitButton" className="btn btn-lg btn-primary btn-block" type="submit">Sign -Up</button>
              </form>
              <div className="new-user-text">
                  <p>Already have an Account ? <a href='/'> Login</a></p>
                  <p className="errMsg" ></p>

              </div>
            </div>
        )
    }
}
export default Signup
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
        

        axios.post('http://localhost:3001/users/create', {
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
                
                return (axios.post('http://localhost:3001/users/me/avatar', formData, {
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
              
              <img className="mb-4 logo-image" src={Logo} alt=""/>

              <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Sign - Up</h1>
                <h3 className="h3 mb-3 font-weight-normal text-danger" style={{fontSize:'.9rem'}} >* field are required</h3>
                <div class="form-group ">
                    <label for="name">Name <span class="errMsg" id="addon">*</span></label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="name" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="This name will be helpful for others to identify you" required  aria-describedby="addon"/>
                </div>
                <div class="form-group">
                    <label for="email">Email <span class="errMsg" id="addon">*</span></label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="email" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="Your email.Email should be unique " required  />
                </div>
                <div class="form-group">
                    <label for="phoneNo">Phone no <span class="errMsg" id="addon">*</span></label>
                    <input type="number" name="phoneno" id="phoneno" className="form-control" placeholder="phoneno" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="Phone no will be used to send otp and verify your no." required  />
                </div>
                <div class="form-group">
                    <label for="avatar">Avatar <span class="errMsg" id="addon">*</span></label>
                    <input type="file" name="avatar" id="avatar" className="form-control" placeholder="avatar" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="choose a pic of you,in png or jpeg format,under 1Mb" required  />
                </div>
                <div class="form-group">
                    <label for="username">Username <span class="errMsg" id="addon">*</span></label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="username" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="username will be handle.it shouldn't contain any special char (#,$,%) or uppercase.can contain underscore(-)" required  />
                </div>
                <div class="form-group">
                    <label for="password">Password <span class="errMsg" id="addon">*</span></label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="password" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="should be greater than 8 characters" required />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm password <span class="errMsg" id="addon">*</span></label>
                    <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="confirmPassword" onChange={this.handleChange} data-toggle="tooltip" data-placement="right" title="should match with above password" required  />
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign -Up</button>
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
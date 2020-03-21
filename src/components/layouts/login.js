import React, { Component } from 'react'
 import "../../css/chatpage.css"
import Logo from "../../images/kirin.png";
import axios from "axios";

 class Login extends Component {
     state={
         email:null,
         password:null
     }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        var button = document.querySelector('#submitButton');

        console.log(this.state);
        var email = this.state.email;
        var password = this.state.password;
        if(email && password){
        //if usr has filled email and password and click the submit button
        //disabled it...so the user cannot press it again..
        //this will prevent unneccasary req to server...thus error reduceed...
        button.setAttribute("disabled","disabled");
        }
        
        axios.post('http://kirin-chatapp-server.herokuapp.com/users/login', {
                email,
                password
            })
            .then(async (response)=>{
                var val = response.data;

                console.log("from axios req...");
                console.log(val);
                
                this.setState({token:val.token});
                localStorage.setItem("token",val.token);
                localStorage.setItem('user',JSON.stringify(val.user));
                this.props.history.push("./main");
            })
            .catch(function (error) {
                //console.log(error.response);
                var errMsg = document.querySelector('.errMsg');

                if(error && error.response && error.response.status && error.response.status == 400){
                errMsg.innerHTML = error.response.data;
                //if error hass released the submit buttom so user can press it again...
                button.removeAttribute("disabled");
                }
            }); 

    

    }
    render() {
        return (
            <div >
              
              <img className="mb-4 logo-image" src={Logo} alt=""/>

              <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please Log in</h1>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email" name="email" id="inputEmail" className="form-control" placeholder="email" onChange={this.handleChange} required  />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" name="password" id="inputPassword" className='form-control'  placeholder="password" onChange={this.handleChange} required />
                </div>
                <button id="submitButton" className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
              </form>  
              <div className="new-user-text">
                  <p>New User ? <a href='/signup'>  Sign Up</a></p>
                  <p className="errMsg" ></p>

              </div>
            </div>
        )
    }
}
export default Login
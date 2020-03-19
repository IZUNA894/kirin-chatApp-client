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
        console.log(this.state);
        var email = this.state.email;
        var password = this.state.password;

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

                if(error.response.status == 400)
                errMsg.innerHTML = error.response.data;
            }); 



    }
    render() {
        return (
            <div >
              
              <img className="mb-4 logo-image" src={Logo} alt=""/>

              <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please Log in</h1>
                <div class="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" name="email" id="inputEmail" className="form-control" placeholder="email" onChange={this.handleChange} required  />
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" name="password" id="inputPassword" className='form-control'  placeholder="password" onChange={this.handleChange} required />
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
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
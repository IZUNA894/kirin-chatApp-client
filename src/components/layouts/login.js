import React, { Component } from 'react'
import "../../css/login.css"
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

        axios.post('http://localhost:3001/users/login', {
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
                console.log(error.response);
                var errMsg = document.querySelector('.errMsg');

                if(error.response.status == 400)
                errMsg.innerHTML = error.response.data;
            }); 



    }
    render() {
        return (
            <div>
              <p className="errMsg" ></p>
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <img className="mb-4" src={Logo} alt="" width="400" height="100"/>
                <h1 className="h3 mb-3 font-weight-normal">Please Log in</h1>
                <input type="text" name="email" id="inputEmail" className="form-control" placeholder="email" onChange={this.handleChange} required  />
                <input type="password" name="password" id="inputPassword" className="form-control" placeholder="password" onChange={this.handleChange} required />

                <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
              </form>  
              <div className="">
                  <p>New User ? <a href='/signup'>  Sign Up</a></p>
              </div>
            </div>
        )
    }
}
export default Login
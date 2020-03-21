import React from 'react';
import { BrowserRouter,Switch ,Route} from 'react-router-dom';
import Login from "./components/layouts/login.js";
import Signup from "./components/layouts/signup.js";
import MainParent from "./components/layouts/main"
import crossed from "./components/layouts/crossed.js"
import peopleList from "./components/layouts/peopleList.js";
import MainContextProvider from "./context/mainContext";
import AuthContextProvider from "./context/authContext";
import ContactListContextProvider from "./context/contactList";

// we using both context and redux in our app....
//although redux is not playing any role in our app working...its for future versions...
class App extends React.Component {
  render(){
  return (
    <BrowserRouter>

    <div className="App">
    <AuthContextProvider>
    <MainContextProvider>
    <ContactListContextProvider>
    <Switch>
      <Route  exact path="/" component={ Login}/>
      <Route  exact path="/signup" component={ Signup}/>
      <Route  path="/main" socket={this.props.socket} component={ MainParent} />
      <Route  path="/peopleList" component={ peopleList} />

      <Route  path="*" component={ crossed} />
 

    </Switch>
    </ContactListContextProvider>
    </MainContextProvider>
    </AuthContextProvider>
     </div>
     
     </BrowserRouter>
  );
 }
}

export default App;

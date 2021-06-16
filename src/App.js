import React,{useState,useEffect} from 'react';
import axios from 'axios'
import SignUp from './SignUp'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./SignIn"
import UserInfo from "./UserInfo"

function App() {



  return (
    <div className="App">
    <Router>
       <Route exact path="/" component={SignUp} />
       <Route path='/SignIn'>
         <SignIn />
       </Route>
       <Route path='/UserInfo'>
        <UserInfo />
       </Route>
    </Router>
    </div>
  );
}

export default App;

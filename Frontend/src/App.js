import './App.css';
import React, {useState} from "react";
import OnBoarding from "./components/OnBoarding";
import LoginForm from "./components/Form";

// Login Form Email : admin@gmail.com
// Login Form Password : adminpassword


function App(){
    let [accessToken, setAccessToken] = useState(null);
    //Access Token does not saved in local storage
    //if want,
    // setAccessToken(localStorage.getItem('token'));
    const handleTokenReceived = (token)=>{
        alert("Login Successfully!");
        setAccessToken(token);
    }

    // if access token null create the login form
    return (
        <div className='App'>
            {(accessToken)?(<OnBoarding/>):(<LoginForm onSubmit={handleTokenReceived}/>)}
        </div>
    );

}

export default App;

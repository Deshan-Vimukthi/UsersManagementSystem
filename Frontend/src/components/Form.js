import React, { useState,useEffect } from 'react';
import bcrypt from 'bcryptjs';
import OnBoarding from "./OnBoarding";

const LoginForm = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token,setToken] = useState(null);

    useEffect(() =>{

    },[token])

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Tried Encrypted password its generate different number for same password at each time. This Later
        const saltRounds = 10; // Adjust based on security needs
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();

            if (data.user_type === 'admin' && data.token) {

                setToken(data.token);
                //if using the token from localStorage please save it
                //localStorage('token',data.token);
                try{onSubmit(data.token);}
                catch (e){
                    alert(e.message);
                }
            } else {
                setError("Invalid Email or Password");
                //print error massage
                return (
                    <div className="container">
                        <div className="login-form">
                            <div className="head-bar" />
                            <h1>Login</h1>
                            <p>lorem ipsum dolor sit amet consectetur. Risus commodo faucibus pellentesque habitan.Tincidunt</p>
                            <form className="form" onSubmit={handleSubmit}>
                                <input className="text-box" type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input className="text-box" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="forgot_password_label">Forgot Password</label>
                                <button className="active-button" type="submit">Login</button>
                                {error && <p className="error-message">{error}</p>}
                            </form>
                        </div>
                    </div>
                );
            }
            // Save token and user type to local storage for future requests

        } catch (error) {
            console.error('Login failed:', error);
            setError(error);
        }
    };

    return(
        <div className="container">
            <div className="login-form">
                <div className="head-bar" />
                <h1>Login</h1>
                <p>lorem ipsum dolor sit amet consectetur. Risus commodo faucibus pellentesque habitan.Tincidunt</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input className="text-box" type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="text-box" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="forgot_password_label">Forgot Password</label>
                    <button className="active-button" type="submit">Login</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;

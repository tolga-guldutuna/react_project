import React, { useState } from 'react';
import { useAuth } from '../../services/AuthService';
import {Link} from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div>
                <div>
                    <div align="left">
                        <input type="checkbox" id="remember_me" name="remember_me" value="remember_me"/>
                        <label htmlFor="remember_me">Remember Me</label>
                    </div>
                    <div align="right">
                        <Link to="/agent/forgetPassword">
                            <label>Forget Password</label>
                        </Link>
                    </div>
                </div>
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;

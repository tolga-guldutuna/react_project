import React from 'react';
import LoginForm from '../../components/agent/LoginForm';
import '../../styles/main.css';

function LoginPage() {
    return (
        <div className="container">
            <h1>Agent Login</h1>
            <LoginForm />
        </div>
    );
}

export default LoginPage;

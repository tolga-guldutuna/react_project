import React, { useState } from 'react';
import { useAuth } from '../../services/AuthService';

function ForgetPasswordForm() {
    const [username, setUsername] = useState('');
    const { forgetPassword, error } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        forgetPassword(username);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
}
export default ForgetPasswordForm;
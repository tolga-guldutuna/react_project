import React, { useState } from 'react';
import { useAuth } from '../../services/AuthService';

function CustomerLoginForm() {
    const [phone, setPhone] = useState('');
    const { customerLogin, error } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        customerLogin(phone);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default CustomerLoginForm;

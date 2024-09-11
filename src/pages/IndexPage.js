import React from 'react';
import {Link} from "react-router-dom";
import '../styles/main.css';

function IndexPage() {
    return (
        <div className="container">
            <h1>Welcome Video Call App</h1>
            <div>
                <Link to="/customer/login">
                    <button className="control-button">Customer</button>
                </Link>
            </div>
            <div>
                <Link to="/agent/login">
                    <button className="control-button">Agent</button>
                </Link>
            </div>
        </div>
    );
}

export default IndexPage;

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main.css';



export default function HomePage() {
    return (
        <div className="container">
            <h1>Random Video Chat</h1>
            <Link to="/video-chat">
                <button className="control-button">Start Video Chat</button>
            </Link>
            <Link to="/chat">
                <button className="control-button">Join Chat Room</button>
            </Link>
        </div>
    );
}

import React, { useState, useRef } from 'react';
import socketService from '../../services/SocketService';
import '../../styles/main.css';


export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const chatBoxRef = useRef();
    let roomId = '';

    const sendMessage = () => {
        if (message.trim()) {
            socketService.sendMessage(message, roomId);
            setMessages([...messages, `You: ${message}`]);
            setMessage("");
        }
    };

    socketService.onMessage((msg) => {
        setMessages([...messages, `Stranger: ${msg}`]);
    });

    return (
        <div className="container">
            <h1>Chat Room</h1>
            <div className="chat" ref={chatBoxRef}>
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="control-button">Send</button>
        </div>
    );
}

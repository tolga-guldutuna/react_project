import React, { useState, useRef } from 'react';
import socketService from '../../services/SocketService';

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const chatBoxRef = useRef();

    const sendMessage = () => {
        if (message.trim()) {
            socketService.sendMessage(message);
            setMessages([...messages, `You: ${message}`]);
            setMessage("");
        }
    };

    socketService.onMessage((msg) => {
        setMessages([...messages, `Stranger: ${msg}`]);
    });

    return (
        <div className="chat">
            <div id="chatBox" ref={chatBoxRef}>
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

import React from 'react';
import '../../styles/Header.css';
import {Link} from "react-router-dom";


function Header() {
    return (
        <header className="header">
            <div className="logo">
                Global Bilgi
            </div>
            <div className="status-dropdown">
                <select>
                    <option value="ready">Hazır</option>
                    <option value="break">Mola</option>
                    <option value="other">Diğer</option>
                </select>
            </div>
            <div className="user-controls">
                <Link to="/">
                <button>Profilim</button>
                </Link>
                <Link to="/">
                <button>Log Off</button>
                </Link>
            </div>
        </header>
    );
}

export default Header;

import React, { useState } from 'react';
import EnterCodeForm from "../../components/agent/EnterCodeForm";
import '../../styles/main.css';

function EnterCodePage() {
    return (
        <div className="container">
            <h1>Enter Verification Code</h1>
            <EnterCodeForm />
        </div>
    );
}

export default EnterCodePage;

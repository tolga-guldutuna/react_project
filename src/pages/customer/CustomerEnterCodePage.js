import React from 'react';
import CustomerEnterCodeForm from "../../components/customer/CustomerEnterCodeForm";
import '../../styles/main.css';



function CustomerEnterCodePage() {
    return (
        <div className="container">
            <h1>Customer Verification Page</h1>
            <CustomerEnterCodeForm />
        </div>
    );
}

export default CustomerEnterCodePage;

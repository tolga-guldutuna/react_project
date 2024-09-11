import React from 'react';
import CustomerLoginForm from "../../components/customer/CustomerLoginForm";
import '../../styles/main.css';


function CustomerLoginPage() {
    return (
        <div className="container">
            <h1>Customer Login</h1>
            <CustomerLoginForm />
        </div>
    );
}

export default CustomerLoginPage;

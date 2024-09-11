import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import * as Pages from './pages';
import {AuthProvider} from './services/AuthService';
import Header from "./components/general/Header";
import Footer from "./components/general/Footer";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Pages.IndexPage/>}/>
                    <Route path="/agent/login" element={<Pages.LoginPage/>}/>
                    <Route path="/agent/forgetPassword" element={<Pages.ForgetPasswordPage/>}/>
                    <Route path="/agent/bipEnterCode" element={<Pages.EnterCodePage/>}/>
                    <Route path="/agent/home" element={<Pages.HomePage/>}/>
                    <Route path="/agent/cameraPreview" element={
                        <>
                            <Header/>
                            <Pages.PreJoinPage/>
                            <Footer/>
                        </>
                    }
                    />
                    <Route path="/agent/video-chat" element={<Pages.VideoChat/>}/>
                    <Route path="/agent/chat" element={<Pages.ChatBox/>}/>
                    <Route path="/customer/login" element={<Pages.CustomerLoginPage/>}/>
                    <Route path="/customer/bipEnterCode" element={<Pages.CustomerEnterCodePage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;

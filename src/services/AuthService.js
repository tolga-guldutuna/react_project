import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const url = 'http://localhost:8081/api/auth';
    const customerUrl = url+'/customer';
    let token = '';

    const login = async (username, password) => {
        try {
            const response = await axios.post(url+'/login', null, {
                params: {
                    username: username,
                    password: password
                }
            });
            token = response.data.token;
            setAuthToken(token);
            localStorage.setItem('token', token);
            navigate('agent/bipEnterCode');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    const verifyCode = async (code) => {
        try {
            token = localStorage.getItem('token');
            const response = await axios.post(url + '/verifyCode', { code, token });

            if (response.data) {  // Sayısal 200 olarak kontrol edilir
                navigate('agent/home');  // Başarılı doğrulama sonrası ana sayfaya yönlendirme
            } else {
                setError('Verification failed. Please try again.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        }
    };

    const forgetPassword = async (username) => {
        try {
            const response = await axios.post(url + '/forgot-password"',  null, {
                params: {
                    username: username
                }
            });

            if (response.data) {  // Sayısal 200 olarak kontrol edilir
                navigate('agent/login');  // Başarılı doğrulama sonrası ana sayfaya yönlendirme
            } else {
                setError('Username wrong. Please try again.');
            }
        } catch (err) {
            setError('Username wrong. Please try again.');
        }
    };

    const reSendCode = async () => {
        try {
            token = localStorage.getItem('token');
            await axios.post(url + '/bipResend', { token });
        } catch (err) {
            setError('Verification failed. Please try again.');
        }
    };

    const customerLogin = async (phone) => {
        try {
            await axios.post(customerUrl+'/login', {phone});
            // setAuthToken(token);
            // localStorage.setItem('token', token);
            localStorage.setItem('phone', phone);
            navigate('customer/bipEnterCode');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    const customerVerifyCode = async (code) => {
        try {
            token = localStorage.getItem('token');
            const phone = localStorage.getItem('phone');
            const response = await axios.post(customerUrl + '/verifyCode', { code,phone, token });

            if (response.data) {  // Sayısal 200 olarak kontrol edilir
                navigate('customer/home');  // Başarılı doğrulama sonrası ana sayfaya yönlendirme
            } else {
                setError('Verification failed. Please try again.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        }
    };

    const customerReSendCode = async () => {
        try {
            const phone = localStorage.getItem('phone');
            await axios.post(customerUrl + '/bipResend', { phone });
        } catch (err) {
            setError('Verification failed. Please try again.');
        }
    };


    return (
        <AuthContext.Provider value={{ login, verifyCode,reSendCode,forgetPassword,
                                        customerLogin,customerVerifyCode,customerReSendCode,
                                        error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

import React, { useEffect, useMemo, useState } from 'react';
import { loginAPi } from './Signinservice';
import './signin.css';
import { FaExclamationCircle } from 'react-icons/fa';
import Layout from '../../components/layout/layout';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { PathAction } from '../../redux/Redux';
const LoginPage = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const canLogin = useMemo(() => {
        return email !== '' && password !== '';
    }, [password, email]);
    const clearErrorMessage = () => {
        setErrorMessage('');
    };
    const setAllLocalStorageValues = (response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('mobile', response.data.mobile);
        localStorage.setItem('userId', response.data._id);
        localStorage.setItem('address', response.data.address);
        localStorage.setItem('profilePhoto', response?.data?.profilePhoto);
        dispatch(PathAction.setIncrementCartCount(response?.data?.cartCount));
        setAuth({
            ...auth,
            user: {
                userId: response.data._id,
                userName: response.data.userName,
                email: response.data.email,
                role: response.data.role,
                mobile: response.data.mobile,
                address: response.data.address,
                profilePhoto: response?.data?.profilePhoto,
                cartCount: response.data.cartCount
            }, token: response.data.token
        })
    }
    useEffect(() => {
        if (auth?.token) {
            navigate('/');
        }
    }, [auth?.token, navigate]);

    const handleLogin = async () => {
        try {
            const response = await loginAPi(email, password);
            if (response.data === "invalid credentials") {
                setErrorMessage(response.data);
            } else {
                setAllLocalStorageValues(response);

            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <Layout title="Login | TickTick">
            <div className="register-page-container">
                <div className="register-form">
                    <h1>Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { clearErrorMessage(); setEmail(e.target.value) }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { clearErrorMessage(); setPassword(e.target.value) }}
                        required
                    />

                    {errorMessage && <div className="error-message"><p ><FaExclamationCircle className='error-icon' />{errorMessage}</p></div>}

                    <div onClick={() => { navigate('/forget-password') }} style={{ color: "blue" }} >forgot password?</div>
                    <button onClick={handleLogin} disabled={!canLogin} >Login</button>
                </div>
            </div>
        </Layout >
    );
};
export default LoginPage;

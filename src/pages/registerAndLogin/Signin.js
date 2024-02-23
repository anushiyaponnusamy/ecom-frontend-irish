import React, { useEffect, useMemo, useState } from 'react';
import { registerUser } from './Signinservice';
import './signin.css';
import { FaExclamationCircle } from 'react-icons/fa';
import Layout from '../../components/layout/layout';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [question, setQuestion] = useState('');

    const [isValid, setIsValid] = useState({
        passwordValid: true, // Set initial value to true
        emailValid: true, // Corrected typo
        numberValid: true // Set initial value to true
    });

    const canRegister = useMemo(() => {
        return isValid.passwordValid && username !== '' && isValid.emailValid && isValid.numberValid && question !== '';
    }, [isValid, username, question]);

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
    const handleRegister = async () => {
        try {
            const response = await registerUser(email, password, username, mobileNumber, question);
            if (response.data === "invalid credentials") {
                setErrorMessage(response);
            } else if (response.data === 'email already exists') {
                setErrorMessage('email already exists');
            } else if (response.data === 'mobileNumber already exists') {
                setErrorMessage('mobileNumber already exists')
            } else {
                setAllLocalStorageValues(response)


            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid((prevState) => ({
            ...prevState,
            emailValid: emailPattern.test(email)
        }));
    };

    const validateMobileNumber = (mobileNumber) => {
        const mobileNumberPattern = /^\d{10}$/;
        setIsValid((prevState) => ({
            ...prevState,
            numberValid: mobileNumberPattern.test(mobileNumber)
        }));
    };

    const isPasswordValid = () => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        setIsValid((prevState) => ({
            ...prevState,
            passwordValid: passwordPattern.test(password)
        }));
    };

    useEffect(() => {
        if (password) {
            isPasswordValid();
        }
    }, [password]);
    useEffect(() => {
        if (auth?.token) {
            navigate('/');
        }
    }, [auth?.token, navigate]);
    return (
        <Layout title="Sign Up | TickTick">
            <div className="register-page-container">
                <div className="register-form">
                    <h1>Sign Up</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { clearErrorMessage(); setEmail(e.target.value); validateEmail(e.target.value); }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { clearErrorMessage(); setPassword(e.target.value); }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => { clearErrorMessage(); setUsername(e.target.value); }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="What's your pet peeve?"
                        value={question}
                        onChange={(e) => { clearErrorMessage(); setQuestion(e.target.value); }}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => {
                            clearErrorMessage();
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                                setMobileNumber(value);
                                validateMobileNumber(value);
                            }
                        }}
                        required
                    />
                    {!isValid.passwordValid && (
                        <div className="error-message" style={{ fontSize: "10px" }}>
                            <FaExclamationCircle className="error-icon" />
                            <p>Password must be at least 8 characters including (A-Z, a-z, 0-9, @#$%^&*...)</p>
                        </div>
                    )}
                    {!isValid.emailValid && (
                        <div className="error-message" style={{ fontSize: "10px" }}>
                            <FaExclamationCircle className="error-icon" />
                            <p>Please enter a valid email address</p>
                        </div>
                    )}
                    {!isValid.numberValid && (
                        <div className="error-message" style={{ fontSize: "10px" }}>
                            <FaExclamationCircle className="error-icon" />
                            <p>Please enter a valid mobile number</p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="error-message">
                            <p>
                                <FaExclamationCircle className='error-icon' />
                                {errorMessage}
                            </p>
                        </div>
                    )}
                    <button onClick={handleRegister} disabled={!canRegister}>Register</button>
                </div>
            </div>
        </Layout>
    );
};

export default RegisterPage;


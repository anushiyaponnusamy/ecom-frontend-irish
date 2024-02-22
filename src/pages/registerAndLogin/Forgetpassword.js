
import React, { useEffect, useMemo, useState } from 'react';
import { resetPassword } from './Signinservice';
import './signin.css';
import { FaExclamationCircle } from 'react-icons/fa';
import Layout from '../../components/layout/layout';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
const Forgetpassword = () => {
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password1, setPassword1] = useState('');
    const [question, setQuestion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [passwordValid, setIsPasswordValid] = useState(false)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    }; const isPasswordValid = () => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        setIsPasswordValid(passwordPattern.test(password))
        return passwordPattern.test(password);
    };
    const handlereenterpwd = () => {
        if (password !== password1) setErrorMessage("password mismatch")
    }

    useEffect(() => {
        isPasswordValid()
    }, [password])
    const canResetPassword = useMemo(() => {
        console.log("passwordValid, question, emailId", passwordValid, question, emailId)
        return passwordValid && question !== '' && emailId !== '';
    }, [passwordValid, question, emailId]);
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await resetPassword(emailId, password, question);
            if (response.data === "email or secret question invalid") {
                setErrorMessage("email or secret question invalid");

            }
            else {

                navigate("/login")
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <Layout title="ForgotPassword | TickTick">
            <div className="register-page-container">
                <div className="register-form">
                    <h1>Reset Password</h1>  <input
                        type="email"
                        placeholder="Email"
                        value={emailId}
                        onChange={(e) => { clearErrorMessage(); setEmail(e.target.value) }}
                        autoComplete='off'
                        required
                    />
                    <input
                        type="text"
                        placeholder="whats your petpeeve"
                        value={question}
                        onChange={(e) => { clearErrorMessage(); setQuestion(e.target.value) }}
                        required
                    />
                    {/* <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { clearErrorMessage(); setPassword(e.target.value) }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="re-enter password"
                        value={password1}
                        onChange={(e) => { clearErrorMessage(); setPassword1(e.target.value); handlereenterpwd(); }}
                        required
                    /> */}

                    <div className="password-input-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            autoComplete="new-password"
                            required
                        />
                        <span className="password-visibility-toggle" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
                        </span>
                    </div>
                    <div className="password-input-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Re-enter Password"
                            value={password1}
                            onChange={(e) => { setPassword1(e.target.value) }}
                            autoComplete="new-password"
                            required
                        />
                        <span className="password-visibility-toggle" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
                        </span>
                    </div>
                    {errorMessage && <div className="error-message"><p ><FaExclamationCircle className='error-icon' />{errorMessage}</p></div>}
                    <button onClick={handleLogin} disabled={!canResetPassword} >Reset</button>
                </div>
            </div>
        </Layout>
    );
};
export default Forgetpassword

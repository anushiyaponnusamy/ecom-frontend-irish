import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Spinner = ({ path }) => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [remainingSeconds, setRemainingSeconds] = useState(5);
    const LogoutUser = () => {

        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('mobile');
        localStorage.removeItem('userId');

        navigate('/login');
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        if (remainingSeconds === 0) {
            clearInterval(timer);
            if (path === '/login') {
                LogoutUser()
            } else {
                navigate(`${path}`);
            }
        }

        return () => {
            clearInterval(timer);
        };
    }, [navigate, remainingSeconds, path]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="spinner-border text-danger" role="status"></div>
            {/* <p></p> */}
        </div>
    );
};

export default Spinner;

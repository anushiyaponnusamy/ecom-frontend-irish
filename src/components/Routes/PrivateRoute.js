import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
//Outlet:its used for nested routing .it enables routing
import { Outlet } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import Spinner from "../Spinner";
const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const accessToken = localStorage.getItem("token");
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
    };
    const authCheck = async () => {
        const res = await axios.get(config.REACT_APP_API + '/auth/user-auth', headers);

        if (res.data.ok) {
            setOk(res.data.ok)
        } else {
            setOk(false)
        }
    }
    useEffect(() => {

        if (accessToken) { authCheck(); }
    }, [accessToken])
    return ok ? <Outlet /> : <Spinner path="/login" />

}

export default PrivateRoute
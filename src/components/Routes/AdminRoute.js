import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import Spinner from "../Spinner";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [apiExecuted, setApiExecuted] = useState(false);
    const accessToken = localStorage.getItem("token");
    console.log(accessToken)
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
    };
    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(config.REACT_APP_API + '/auth/admin-auth', headers);

                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.log("error", error);
            } finally {
                setApiExecuted(true);
            }
        };

        if (accessToken) {
            authCheck();
        } else {
            setApiExecuted(true);
        }
    }, [accessToken]);

    if (!apiExecuted) {
        return null;
    }

    return ok ? <Outlet /> : <Spinner path="/" />;
};

export default AdminRoute;

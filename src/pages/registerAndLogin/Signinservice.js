import axios from "axios";
import config from "../../config/config";
const accessToken = localStorage.getItem("token");
const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
    },
};

const registerUser = async (email, password, userName, mobile, question) => {

    let response = await axios.post(config.REACT_APP_API + '/auth/signUp', { email, password, userName, mobile, question }, headers);
    return response;
};

const loginAPi = async (email, password) => {

    let response = await axios.post(config.REACT_APP_API + '/auth/login', { email, password }, headers);
    return response;
};
const resetPassword = async (email, password, question) => {

    let response = await axios.post(config.REACT_APP_API + '/auth/forgotpassword', { email, password, question }, headers);
    return response;
};
export {
    registerUser, loginAPi, resetPassword
};

import axios from "axios";
import config from "../../config/config"
const accessToken = localStorage.getItem("token");
const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
    },
};

const updateUserdetails = async (userName) => {

    let response = await axios.post(config.REACT_APP_API + '/auth/updateById', { userName }, headers);
    return response;
};
const getUserdetails = async (userId) => {

    let response = await axios.get(config.REACT_APP_API + `/auth/getUserByUserId/${userId}`, headers);
    return response;
};
export {
    updateUserdetails, getUserdetails
};
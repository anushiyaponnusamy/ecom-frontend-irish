import { useState, useEffect, useContext, createContext, } from "react";
const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null, token: ""
    })
    useEffect(() => {
        const data = {
            userName: localStorage.getItem('userName'),
            email: localStorage.getItem('email'),
            mobile: localStorage.getItem('mobile'),
            userId: localStorage.getItem('userId'),
            address: localStorage.getItem('address'),
            profilePhoto: localStorage.getItem('profilePhoto')
        }
        setAuth({ ...auth, user: data, token: localStorage.getItem('token') })
        //eslint-disable-next-line
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
//custom hook
const useAuth = () => useContext(AuthContext)
export { AuthProvider, useAuth };
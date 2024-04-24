import {createContext, useState} from "react";
import {toast} from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const onLogout = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "LOGOUT",
                })
            );
            const data = await response.json();
            setAuth({});
            sessionStorage.clear()
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{auth, setAuth, onLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
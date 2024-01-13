import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuth: false,
    setUser: () => { },
    setIsAuth: () => { },
    checkAuth: async () => false as boolean,
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            axios.get(import.meta.env.VITE_ENDPOINT_BASE_URL + 'user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then((response) => {
                setUser({
                    id: response.data.id,
                    email: response.data.email,
                    name: response.data.name,
                });

                setIsAuth(true);
            }).catch(() => {
                localStorage.setItem('token', '');
            });

            return isAuth;
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuth)
            navigate('/login');
        
        checkAuthUser();

    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuth,
        setIsAuth,
        checkAuthUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);
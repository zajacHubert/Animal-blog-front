import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { CurrentUser, UserToLogin } from '../types/user';

export const AuthContext = createContext<AuthContextInterface | null>(null);

interface Props {
    children: ReactNode;
}

interface AuthContextInterface {
    currentUser: CurrentUser | null;
    login: (userToLogin: UserToLogin) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContextProvider = ({ children }: Props) => {
    const [userFromStorage, setUserFromStorage] = useState<string | null>(localStorage.getItem('user'));
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(JSON.parse(userFromStorage!) || null);


    const login = async (userToLogin: UserToLogin) => {
        const res = await axios.post('http://localhost:3001/auth/login', userToLogin);
        setCurrentUser(res.data);
    }

    const logout = async () => {
        await axios.post('http://localhost:3001/auth/logout');
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
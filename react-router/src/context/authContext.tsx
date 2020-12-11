import { createContext } from "react";
import React, { useState } from 'react';

export const AuthContext = createContext({
    isAuth: false,
    login: () => {}
});

export const AuthContextProvider = (props: any) => {
    const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);

    const loginHandler = () => {
        setIsAuthentificated(!isAuthentificated);
    }

    return (
        <AuthContext.Provider value={{login: loginHandler, isAuth: isAuthentificated}}>
            {props.children}
        </AuthContext.Provider>
    )
}
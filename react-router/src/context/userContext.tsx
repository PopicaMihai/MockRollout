import { createContext } from 'react';
import React, { useState } from 'react';

export const UserContext = createContext({
    email: '', 
    setEmail: function(email: string): void {}
});

export const UserContextProvider = (props: any) => {
    const [userEmail, setUserEmail] = useState<string>('');

    let loginHandler = (email: string) => {
        setUserEmail(email);
    }

    return (
        <UserContext.Provider value={{email: userEmail, setEmail: loginHandler}}>
            {props.children}
        </UserContext.Provider>
    )
}
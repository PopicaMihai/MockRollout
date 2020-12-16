import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";

export const Login = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    
    const onLoggingClick = () => {
        authContext.login();
        userContext.setEmail(userEmail);
    }
     
    return (
        <div>
            <form action="">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                <button onClick={onLoggingClick}><Link to='/home'>Login</Link></button>
            </form>
        </div>
    )
}
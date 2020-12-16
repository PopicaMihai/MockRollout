import React, { useContext } from "react"
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import './Navigation.scss';


export const Navigation = () => {
    const authContext = useContext(AuthContext);
    const logout = () => {
        authContext.login();
    }

    return (
        <div className="header">
            <nav >
                <ul className="header__list">
                    <li>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={logout}>Logout</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    ) 
}
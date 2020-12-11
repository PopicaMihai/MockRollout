import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export const Home = () => {
  const userContext = useContext(UserContext);
  return (
    <div>
      <h1>Home Page</h1>
      <div>Hey {userContext.email}</div>
    </div>
  );
}
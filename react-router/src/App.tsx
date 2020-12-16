import React, { useContext } from "react";
import'./App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { About } from "./pages/About/About";
import { Home } from "./pages/Home/Home";
import { Users } from "./pages/Users/Users";
import { Login } from "./pages/Login/Login";
import { AuthContext, AuthContextProvider } from "./context/authContext";
import { Navigation } from "./components/Navigation/Navigation";
import { UserContext, UserContextProvider } from "./context/userContext";

export default function App() {

  const authContext = useContext(AuthContext);
    if (authContext.isAuth) {
      return (
        <Router>
          <Navigation />
          <Switch>
                <Route path="/home" exact>
                  <UserContextProvider>
                    <Home/>
                  </UserContextProvider>
                </Route>
              <Route path="/about" exact>
                <About/>
              </Route>
              <Route path="/users" exact>
                <Users />
              </Route>
            </Switch>
        </Router>
      )
    }

    return (
      <Router>
        <Route path="/" exact>
          <Login />
        </Route>
      </Router>
    )
}
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { createContext, useState } from "react";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
                <Header></Header>
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/home">
                        <Home></Home>
                    </Route>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../App";
import {
    handleGoogleSignIn,
    initializeLoginFramework,
    handleSignOut,
} from "./LoginManager";

const Login = () => {
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
    });
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
            setUser(res);
            setLoggedInUser(res);
        });
    };

    const signOut = () => {
        handleSignOut().then((res) => {
            setUser(res);
            setLoggedInUser(res);
        });
    };

    return (
        <div>
            {user.isSignIn ? (
                <button onClick={signOut} type="button">
                    Sign Out
                </button>
            ) : (
                <button onClick={googleSignIn} type="button">
                    Sign In
                </button>
            )}
        </div>
    );
};

export default Login;

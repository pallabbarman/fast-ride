import React, { useContext } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import {
    handleGoogleSignIn,
    initializeLoginFramework,
    handleSignOut,
    createUserEmailAndPassword,
    signInWithEmailAndPassword,
} from "./LoginManager";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";


const Login = () => {
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
    });
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false);

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    };
    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    const signOut = () => {
        handleSignOut().then((res) => {
            handleResponse(res, false);
        });
    };

    const handleUserSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then((res) => {
                handleResponse(res, true);
            });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(
                (res) => {
                    handleResponse(res, true);
                }
            );
        }
        e.preventDefault();
    };

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <div className="login">
                <form onSubmit={handleUserSubmit}>
                    {newUser && (
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onBlur={handleBlur}
                            placeholder="Your Name"
                        />
                    )}
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        onBlur={handleBlur}
                        placeholder="Enter your email address"
                    />
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        onBlur={handleBlur}
                        name="password"
                        placeholder="Enter your password"
                    />
                    <br />
                    <input
                        type="submit"
                        value={newUser ? "Sign Up" : "Sign In"}
                    />
                </form>
                <br />
                <p>Don't have an account.</p>
                <label htmlFor="newUser">
                    Create an account{" "}
                    <input
                        type="checkbox"
                        onChange={() => setNewUser(!newUser)}
                        name="newUser"
                        id=""
                    />
                </label>
                <br />
                <br />
                {user.isSignIn ? (
                    <Button onClick={signOut} type="button" variant="primary">
                        Sign Out
                    </Button>
                ) : (
                    <Button
                        onClick={googleSignIn}
                        type="button"
                        variant="primary"
                    >
                        <FontAwesomeIcon icon={faGoogle} /> Sign In with Google
                    </Button>
                )}
            </div>
            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && (
                <p style={{ color: "green" }}>
                    User {newUser ? "Account create" : "Logged In"} successfully
                </p>
            )}
        </div>
    );
};

export default Login;

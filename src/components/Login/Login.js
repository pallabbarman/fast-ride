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
import { Button, Col, Container } from "react-bootstrap";

const Login = () => {
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        confirmPassword: "",
        error: "",
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
        if (newUser && user.password === user.confirmPassword && user.email) {
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
            if (!isFieldValid) {
                const newUserInfo = { ...user };
                newUserInfo.emailError = "Enter a valid Email";
                setUser(newUserInfo);
            }
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
            if (!isFieldValid) {
                const newUserInfo = { ...user };
                newUserInfo.passwordError = "Enter a valid password";
                setUser(newUserInfo);
            }
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            newUserInfo.emailError = "";
            newUserInfo.passwordError = "";
            setUser(newUserInfo);
        }
    };

    return (
        <Container style={{ marginTop: "100px", minHeight: "100vh" }}>
            <Col md={6} className="mx-auto justify-content-center">
                <div className="login">
                    {!newUser ? <h2>Login</h2> : <h2>Sign Up</h2>}
                    <form onSubmit={handleUserSubmit}>
                        {newUser && (
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                onBlur={handleBlur}
                                placeholder="Your Name"
                                required
                            />
                        )}
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            onBlur={handleBlur}
                            placeholder="Enter your email address"
                            required
                        />
                        <p style={{ color: "red" }}>{user.emailError}</p>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            onBlur={handleBlur}
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <p style={{ color: "red" }}>{user.passwordError}</p>
                        <br />
                        {newUser && (
                            <input
                                type="password"
                                className="form-control"
                                onBlur={handleBlur}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                required
                            />
                        )}
                        <br />
                        <input
                            className="submit-btn form-control"
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
                        <Button
                            onClick={signOut}
                            type="button"
                            variant="primary"
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            onClick={googleSignIn}
                            type="button"
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faGoogle} /> Sign In with
                            Google
                        </Button>
                    )}
                </div>
                <p style={{ color: "red" }}>{user.error}</p>
                {user.success && (
                    <p style={{ color: "green" }}>
                        User {newUser ? "Account create" : "Logged In"}{" "}
                        successfully
                    </p>
                )}
            </Col>
        </Container>
    );
};

export default Login;

import React, { useContext } from "react";
import { Container, Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Navbar className="nav" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Fast Ride
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    className="justify-content-end"
                    id="basic-navbar-nav"
                >
                    <Nav>
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/destination/1">
                            Destination
                        </Nav.Link>
                        <Nav.Link>
                            {loggedInUser.name || loggedInUser.email}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">
                            <Button type="button">Login</Button>
                        </Nav.Link>
                        <Button
                            style={{ margin: "8px 0px" }}
                            onClick={() => setLoggedInUser({})}
                            type="button"
                        >
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

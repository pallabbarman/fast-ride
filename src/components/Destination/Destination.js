import React, { useContext } from "react";
import { Col, Container, Button, Form, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import "./Destination.css";

const Destination = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <Container>
                <Row>
                    <Col md={4} className="destination">
                        <Form>
                            <h4>Pick From</h4>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Pick Up"
                            />
                            <br />
                            <h4>Pick To</h4>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Pick Up"
                            />
                        </Form>
                        <br />
                        <Button size="lg" block>Search</Button>
                    </Col>
                    <Col md={8} className="map">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30456.136643824673!2d90.37610125701178!3d23.81853221565754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c102e2ece5bb%3A0x446e9dc895326a70!2sBangladesh%20National%20Zoo%2C%20Mirpur!5e0!3m2!1sen!2sbd!4v1616166869476!5m2!1sen!2sbd"
                            width="600"
                            height="450"
                            loading="lazy"
                        ></iframe>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Destination;

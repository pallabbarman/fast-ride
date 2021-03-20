import React, { useContext } from "react";
import { Col, Container, Button, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { UserContext } from "../../App";
import "./Destination.css";
import data from "../../Data/Data.json";

const Destination = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { id } = useParams();
    const vehicles = data.find((vehicle) => vehicle.id === id);
    console.log(vehicles);

    return (
        <div>
            <Container>
                <Row>
                    <Col md={4}>
                        <div className="destination">
                            <Form>
                                <h4>Pick From</h4>
                                <Form.Control size="lg" type="text" />
                                <br />
                                <h4>Pick To</h4>
                                <Form.Control size="lg" type="text" />
                            </Form>
                            <br />
                            <h5>Date</h5>
                            <input
                                className="form-control"
                                type="date"
                                name=""
                            ></input>
                            <br />
                            <br />
                            <Button size="lg" block>
                                Search
                            </Button>
                        </div>
                    </Col>
                    <Col md={8}>
                        <iframe
                            className="map"
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58403.65890250427!2d90.32726108557458!3d23.810465897171525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c1c61277db%3A0xc7d18838730e2e59!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616219344379!5m2!1sen!2sbd"
                            loading="lazy"
                        ></iframe>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Destination;

import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import "./Destination.css";
import data from "../../Data/Data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

const Destination = () => {
    const [form, setForm] = useState(true);
    const [newData, setNewData] = useState({
        address1: "",
        address2: "",
        date: "",
    });
    const { id } = useParams();
    const vehicles = data.find((vehicle) => vehicle.id === parseInt(id));
    console.log(vehicles);
    const { name, image, fare, passenger } = vehicles;
    const handleBlur = (e) => {
        const updateNewData = { ...newData };
        updateNewData[e.target.name] = e.target.value;
        setNewData(updateNewData);
    };
    const handleClick = (e) => {
        e.preventDefault();
    };
    return (
        <div style={{ minHeight: "100vh" }}>
            <Container>
                <Row>
                    <Col md={5}>
                        {form ? (
                            <div className="destination">
                                <form onSubmit={handleClick}>
                                    <h4>Pick To</h4>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onBlur={handleBlur}
                                        name="address1"
                                        required
                                    />
                                    <br />
                                    <h4>Pick From</h4>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onBlur={handleBlur}
                                        name="address2"
                                        required
                                    />
                                    <br />
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="date"
                                        id=""
                                    />
                                    <br />
                                    <input
                                        className="form-control"
                                        type="submit"
                                        value="search"
                                        onClick={() => setForm(false)}
                                    />
                                </form>
                            </div>
                        ) : (
                            <div className="detail-show">
                                <div className="dist-place">
                                    <h5>{newData.address1}</h5>
                                    <h5>{newData.address2}</h5>
                                    <h5>{newData.date}</h5>
                                </div>

                                <div className="final-dist">
                                    <img
                                        src={image}
                                        alt=""
                                        style={{
                                            padding: "10px",
                                            height: "100px",
                                            width: "100px",
                                        }}
                                    />
                                    <h5>{name}</h5>
                                    <h5>
                                        <FontAwesomeIcon icon={faUserFriends} />{" "}
                                        {passenger}
                                    </h5>
                                    <h5>${fare}</h5>
                                </div>
                                <div className="final-dist">
                                    <img
                                        src={image}
                                        alt=""
                                        style={{
                                            padding: "10px",
                                            height: "100px",
                                            width: "100px",
                                        }}
                                    />
                                    <h5>{name}</h5>
                                    <h5>
                                        <FontAwesomeIcon icon={faUserFriends} />{" "}
                                        {passenger}
                                    </h5>
                                    <h5>${fare}</h5>
                                </div>
                                <div className="final-dist">
                                    <img
                                        src={image}
                                        alt=""
                                        style={{
                                            padding: "10px",
                                            height: "100px",
                                            width: "100px",
                                        }}
                                    />
                                    <h5>{name}</h5>
                                    <h5>
                                        <FontAwesomeIcon icon={faUserFriends} />{" "}
                                        {passenger}
                                    </h5>
                                    <h5>${fare}</h5>
                                </div>
                            </div>
                        )}
                    </Col>
                    <Col md={7}>
                        <iframe
                            className="map"
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58403.65890250427!2d90.32726108557458!3d23.810465897171525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c1c61277db%3A0xc7d18838730e2e59!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616219344379!5m2!1sen!2sbd"
                            loading="lazy"
                        ></iframe>
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
        </div>
    );
};

export default Destination;

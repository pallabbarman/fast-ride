import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./VehicleInfo.css";

const VehicleInfo = (props) => {
    const { vehicle } = props;
    const { name, image } = vehicle;
    return (
        <Col md={3} className="d-flex justify-content-center">
            <Card as={Link} to="destination" className="card text-center">
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default VehicleInfo;

import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import data from "../../Data/Data.json";
import VehicleInfo from "../VehicleInfo/VehicleInfo";
import "./Home.css";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(data);
    }, []);

    return (
        <div className="home">
            <Container>
                <Row>
                    {vehicles.map((vehicle) => (
                        <VehicleInfo
                            vehicle={vehicle}
                            key={vehicle.id}
                        ></VehicleInfo>
                    ))}
                </Row>
            </Container>
            <br />
            <br />
        </div>
    );
};

export default Home;

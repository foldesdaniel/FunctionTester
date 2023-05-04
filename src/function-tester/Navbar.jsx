/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import "./../style/nav-button.css";
import "./../style/container.css";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Navbar() {
  return (
    <div>
      <Container fluid="md" className="container">
        <Row
          style={{
            backgroundColor: "black",
            color: "white",
            margin: "0px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
        >
          <Col>
            <h1 style={{ textAlign: "center", marginBottom: "15px", marginTop: "15px" }}>
              Function<b style={{ color: "orange" }}>Tester</b>
            </h1>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "black", color: "white", margin: "0px", borderTop: "1px solid orange" }}>
          <Col style={{ padding: "0px" }}>
            <NavLink to="/">
              {({ isActive }) => (
                <Button variant="black" className={isActive ? "nav-btn active" : "nav-btn"}>
                  Function
                </Button>
              )}
            </NavLink>
            <NavLink to="/custom">
              {({ isActive }) => (
                <Button variant="black" className={isActive ? "nav-btn active" : "nav-btn"}>
                  Custom Tests
                </Button>
              )}
            </NavLink>
            <NavLink to="/create">
              {({ isActive }) => (
                <Button variant="black" className={isActive ? "nav-btn active" : "nav-btn"}>
                  Create Test
                </Button>
              )}
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

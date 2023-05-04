/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import "./../style/nav-button.css";
import "./../style/container.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Ok({ onFinish }) {
  return (
    <Container fluid="md" className="container3">
      <Row>
        <Col>
          <Button
            variant="dark"
            className="btn-center"
            onClick={() =>
              onFinish({
                givenTests: [],
                testResult: { achieved: 100, all: 100 },
                customTests: [],
              })
            }
          >
            OK
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

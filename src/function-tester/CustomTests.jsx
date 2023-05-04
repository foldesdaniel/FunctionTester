/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import "./../style/table.css";
import { Ok } from "./Ok";
import { CustomData } from "./CustomData";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

export function CustomTests({ fn, onFinish, customTests, setCustomTests }) {
  useEffect(() => {
    const newt = customTests.map((e) => {
      return { ...e, result: "none" };
    });
    setCustomTests(newt);
  }, []);

  const handleActionClick = (name) => {
    setCustomTests((data) => data.map((d) => (d.name === name ? { ...d, result: d.testFn(fn) ? "good" : "bad" } : d)));
  };

  const handleDeleteClick = (name) => {
    setCustomTests((data) => data.filter((d) => d.name !== name));
  };

  return (
    <div>
      <Container fluid="md" className="container2">
        <div className="container-mid">
          <span className="text-mid">Custom Tests</span>
          <br />
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Result</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customTests.map((e, key) => {
                return (
                  <CustomData
                    key={key}
                    name={e.name}
                    result={e.result}
                    handleActionClick={handleActionClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <Button
            variant="dark"
            onClick={() => {
              customTests.map((d) => {
                handleActionClick(d.name);
              });
            }}
          >
            RUN ALL
          </Button>
        </div>
      </Container>
      <Ok onFinish={onFinish} />
    </div>
  );
}

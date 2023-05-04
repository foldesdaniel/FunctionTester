/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import "./../style/container.css";
import "./../style/text.css";
import "./../style/container.css";
import "./../style/table.css";
import { useState, useEffect } from "react";
import { Ok } from "./Ok";
import { FunctionData } from "./FunctionData";
import Container from "react-bootstrap/Container";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCircleXmark,
//   faCircleCheck,
//   faCirclePlay,
//   faCircleQuestion,
//   faCircleMinus,
//   faCirclePlus,
//   faSquarePen,
// } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export function Function({ fn, input, output, tests, onFinish }) {
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    tests.map((e) => {
      setData((data) => [...data, { ...e, id: data.length + 1, result: "none" }]);
    });
  }, []);

  const handleActionClick = (id) => {
    setData((data) => data.map((d) => (d.id === id ? { ...d, result: d.testFn(fn) ? "good" : "bad" } : d)));
    calculateSum();
  };

  useEffect(() => {
    calculateSum();
  }, [data]);

  const calculateSum = () => {
    setSum(0);
    data.map((d) => {
      if (d.result === "good") setSum((sum) => sum + d.points);
    });
  };

  return (
    <div>
      <Container fluid="md" className="container2">
        <div className="container-mid">
          <span className="text-mid">Function</span>
          <br />
          <span>{fn.toString()}</span>
        </div>
        <hr />
        <div className="container-mid">
          <span className="text-mid">Tests</span>
          <br />
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Result</th>
                <th>Action</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, key) => {
                return (
                  <FunctionData
                    key={key}
                    name={e.name}
                    result={e.result}
                    points={e.points}
                    id={e.id}
                    handleActionClick={handleActionClick}
                  />
                );
              })}
            </tbody>
          </Table>
          <div>
            <Button
              variant="dark"
              onClick={() => {
                data.map((d) => {
                  handleActionClick(d.id, d.testFn);
                });
              }}
            >
              RUN ALL
            </Button>
            <span className="sum">SUM : {sum}</span>
          </div>
        </div>

        {/* <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000" }} size="2x" />
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#00ff00" }} size="2x" />
        <FontAwesomeIcon icon={faCirclePlay} style={{ color: "#ffa70f" }} size="2x" />
        <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#0522ff" }} size="2x" />
        <FontAwesomeIcon icon={faCircleMinus} style={{ color: "#ff0000" }} size="2x" />
        <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#2db936" }} size="2x" />
        <FontAwesomeIcon icon={faSquarePen} style={{ color: "#124eb5" }} size="2x" /> */}
      </Container>
      <Ok onFinish={onFinish} />
    </div>
  );
}

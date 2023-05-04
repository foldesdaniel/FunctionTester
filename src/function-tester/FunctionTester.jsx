/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateTest } from "./CreateTest";
import { CustomTests } from "./CustomTests";
import { Function } from "./Function";
import { Navbar } from "./Navbar";

export function FunctionTester({ fn, input, output, tests, onFinish }) {
  // const [customTests, setCustomTests] = useState([
  //   { name: "TestName1", result: "none", testFn: (fn) => fn({ a: 2, b: 3 }) === 5 },
  //   { name: "TestName2", result: "none", testFn: (fn) => fn({ a: 2, b: 4 }) === 6 },
  //   { name: "TestName3", result: "none", testFn: (fn) => fn({ a: 2, b: 5 }) === 1 },
  // ]);
  // const [customTests, setCustomTests] = useState([
  //   {
  //     name: "TestName1",
  //     result: "none",
  //     testFn: (fn) => JSON.stringify(fn({ x: [{ name: "sanyi", grade: 4 }], limit: 4 })) === JSON.stringify(["sanyi"]),
  //   },
  // ]);

  const [customTests, setCustomTests] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Function fn={fn} input={input} output={output} tests={tests} onFinish={onFinish} />}
        ></Route>
        <Route
          path="/custom"
          element={
            <CustomTests
              fn={fn}
              input={input}
              output={output}
              tests={tests}
              onFinish={onFinish}
              customTests={customTests}
              setCustomTests={setCustomTests}
            />
          }
        ></Route>
        <Route
          path="/create"
          element={
            <CreateTest
              fn={fn}
              input={input}
              output={output}
              tests={tests}
              onFinish={onFinish}
              customTests={customTests}
              setCustomTests={setCustomTests}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

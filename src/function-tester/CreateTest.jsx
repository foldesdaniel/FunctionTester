/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import "./../style/form.css";
import "./../style/text.css";
import { Ok } from "./Ok";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef } from "react";
import { CreateTestData } from "./CreateTestData";

export function CreateTest({ fn, input, output, onFinish, customTests, setCustomTests }) {
  const [data, setData] = useState({});
  const [check, setCheck] = useState(false);
  const [focus, setFocus] = useState("");
  const [nameIsUsed, setNameIsUsed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [outputData, setOutputData] = useState("");
  const [name, setName] = useState("");

  const inputReference = useRef(null);

  useEffect(() => {
    init();
  }, []);

  const deleteValues = (inp) => {
    if (Array.isArray(inp)) {
      inp.map((d, i) => {
        deleteValues(inp[i]);
      });
    } else if (inp != null && typeof inp === "object") {
      Object.keys(inp).map((k) => {
        if (inp[k] === "number" || inp[k] === "string") inp[k] = null;
        else if (inp[k] === "boolean") inp[k] = false;
        else deleteValues(inp[k]);
      });
    } else if (inp != null) {
      inp = null;
    }
  };

  const init = () => {
    setCheck(false);
    setFocus("");
    setNameIsUsed(false);

    const clone = JSON.parse(JSON.stringify(input));
    deleteValues(clone);
    setData(clone);
  };

  useEffect(() => {
    if (inputReference.current) inputReference.current.focus();
  }, [focus]);

  const submit = () => {
    setSuccess(false);
    setCheck(true);

    let found = false;
    Object.keys(data).map((key) => {
      if (!data[key]) found = true;
    });
    if (found || nameIsUsed) return;

    const obj = {};
    Object.keys(data).map((key) => {
      if (input[key] === "number") obj[key] = parseInt(data[key]);
      else obj[key] = data[key];
    });
    let out;
    if (output === "number") out = parseInt(outputData);
    else out = outputData;
    setCustomTests([...customTests, { name: name, result: "none", testFn: (fn) => fn(obj) === out }]);
    setSuccess(true);

    init();
  };

  const changeData = (e, key, data2) => {
    setSuccess(false);
    if (e.target.type === "checkbox") data2[key] = e.target.checked;
    else data2[key] = e.target.value;
    setData({ ...data });
  };

  const changeName = (e) => {
    let found = false;
    customTests.map((test) => {
      if (test.name === e.target.value) {
        setNameIsUsed(true);
        found = true;
        return;
      }
    });

    setName(e.target.value);
    setNameIsUsed(found);
  };

  const changeOutputData = (e) => {
    setSuccess(false);
    setOutputData(e.target.value);
  };

  const errorList = (inp, focuskey) => {
    if (Array.isArray(inp)) {
      return inp.map((d, i) => {
        return errorList(inp[i], focuskey + "," + i);
      });
    } else if (inp != null && typeof inp === "object") {
      return Object.keys(inp).map((k) => {
        if (inp[k] === null) {
          return (
            <div
              key={focuskey + "," + k}
              className="cont"
              onClick={() => {
                setFocus(focuskey + "," + k);
              }}
            >
              <span>{'"' + focuskey + "," + k + '"'} is required</span>
            </div>
          );
        } else return errorList(inp[k], focuskey + "," + k);
      });
    } else if (inp === null) {
      return (
        <div
          key={focuskey}
          className="cont"
          onClick={() => {
            setFocus(focuskey);
          }}
        >
          <span>{'"' + focuskey + '"'} is required</span>
        </div>
      );
    }
  };

  const updateData = () => {
    setData({ ...data });
  };

  return (
    <div>
      <Container fluid="md" className="container2">
        <Form>
          <span className="text-mid">Test Name</span>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">name</Form.Text>
            <Form.Control
              type="text"
              onChange={(e) => {
                changeName(e);
              }}
              ref={focus === "functionname" ? inputReference : null}
            />
          </Form.Group>
          <hr />
          <span className="text-mid">Input</span>
          {/* MAKING INPUT LIST */}
          {Object.keys(data).map((key, k) => {
            return (
              <CreateTestData
                data={data}
                key={k}
                _key={key}
                input={input}
                changeData={changeData}
                inputReference={inputReference}
                focus={focus}
                focuskey={key}
                updateData={updateData}
                deleteValues={deleteValues}
              />
            );
          })}
          <hr />
          <span className="text-mid">Output</span>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">{"IT WILL ONLY FUNCTION FOR PRIMITIVE TYPES..."}</Form.Text>
            <Form.Control type={output} onChange={changeOutputData} ref={focus === "output" ? inputReference : null} />
          </Form.Group>
          {/* MAKING ERROR LIST */}
          {check && !name && (
            <div
              className="cont"
              onClick={() => {
                setFocus("functionname");
              }}
            >
              <span>{'test "name" is required'}</span>
            </div>
          )}
          {check &&
            Object.keys(data).map((key, k) => {
              return errorList(data[key], key);
            })}
          {check && nameIsUsed && (
            <div className="cont">
              <span className="orange">name is already in use</span>
            </div>
          )}
          {check && !outputData && (
            <div
              className="cont"
              onClick={() => {
                setFocus("output");
              }}
            >
              <span>{'"output"'} is required</span>
            </div>
          )}
          {success && (
            <div className="cont">
              <span className="green">success</span>
            </div>
          )}
          <Button variant="dark" onClick={submit}>
            SAVE CUSTOM TEST
          </Button>
        </Form>
      </Container>
      <Ok onFinish={onFinish} />
    </div>
  );
}

/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import "./../style/form.css";
import "./../style/text.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";

export function CreateTestData({
  _key,
  input,
  changeData,
  inputReference,
  focus,
  data,
  focuskey,
  updateData,
  deleteValues,
}) {
  return (
    <Form.Group className="mb-3">
      {(input[isNaN(_key) ? _key : 0] === "number" ||
        _key === "__name" ||
        input[isNaN(_key) ? _key : 0] === "string") && (
        <div>
          <Form.Text className="text-muted">{_key}</Form.Text>
          <Form.Control
            type={input[isNaN(_key) ? _key : 0] === "string" ? "text" : "number"}
            onChange={(e) => {
              changeData(e, _key, data);
            }}
            ref={focus === focuskey + "," + _key || focus === focuskey ? inputReference : null}
          />
        </div>
      )}
      {input[isNaN(_key) ? _key : 0] === "boolean" && (
        <div>
          <Form.Text className="text-muted">{_key}</Form.Text>
          <Form.Check
            //type="check"
            onChange={(e) => {
              changeData(e, _key, data);
            }}
          />
        </div>
      )}
      {Array.isArray(input[_key]) && (
        <div style={{ paddingLeft: "20px" }}>
          <Form.Text className="text-muted">{_key} array</Form.Text>
          {data[_key].map((k, i) => (
            <div key={k + i}>
              <CreateTestData
                _key={i}
                input={input[isNaN(_key) ? _key : 0]}
                changeData={changeData}
                inputReference={inputReference}
                focus={focus}
                data={data[_key]}
                focuskey={focuskey + "," + i}
                updateData={updateData}
                deleteValues={deleteValues}
              />
              <button
                style={{ border: "none", background: "none", marginLeft: "12px" }}
                onClick={(e) => {
                  e.preventDefault();
                  delete data[_key][i];
                  updateData();
                }}
              >
                <FontAwesomeIcon icon={faCircleMinus} style={{ color: "#ff0000" }} size="2x" />
              </button>
            </div>
          ))}
          <button
            style={{ border: "none", background: "none", marginLeft: "12px" }}
            onClick={(e) => {
              e.preventDefault();
              let clone = JSON.parse(JSON.stringify(input[_key][0]));
              deleteValues(clone);
              data[_key].push(clone);
              //console.log(data);
              updateData();
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#2db936" }} size="2x" />
          </button>
        </div>
      )}
      {typeof input[isNaN(_key) ? _key : 0] === "object" && !Array.isArray(input[isNaN(_key) ? _key : 0]) && (
        <div style={{ paddingLeft: "20px" }}>
          <Form.Text className="text-muted">{isNaN(_key) ? _key : ""} object</Form.Text>
          {Object.keys(data[_key]).map((k, ke) => {
            return (
              <CreateTestData
                key={ke}
                _key={k}
                input={input[isNaN(_key) ? _key : 0]}
                changeData={changeData}
                inputReference={inputReference}
                focus={focus}
                data={data[_key]}
                focuskey={focuskey + "," + k}
                updateData={updateData}
                deleteValues={deleteValues}
              />
            );
          })}
        </div>
      )}
    </Form.Group>
  );
}

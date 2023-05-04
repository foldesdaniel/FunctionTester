/* eslint-disable no-unused-vars */

import "./../style/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faCirclePlay, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

export function FunctionData({ name, result, points, id, testFn, handleActionClick }) {
  return (
    <tr>
      <td>{name}</td>
      {result === "none" && (
        <td>
          <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#0522ff" }} size="2x" />
        </td>
      )}
      {result === "good" && (
        <td>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#00ff00" }} size="2x" />
        </td>
      )}
      {result === "bad" && (
        <td>
          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000" }} size="2x" />
        </td>
      )}
      <td>
        <button
          style={{ border: "none", background: "none" }}
          onClick={() => {
            handleActionClick(id);
          }}
        >
          <FontAwesomeIcon icon={faCirclePlay} style={{ color: "#ffa70f" }} size="2x" />
        </button>
      </td>
      <td>{points}</td>
    </tr>
  );
}

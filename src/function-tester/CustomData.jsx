/* eslint-disable no-unused-vars */

import "./../style/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
  faCirclePlay,
  faCircleQuestion,
  faCircleMinus,
  faSquarePen,
} from "@fortawesome/free-solid-svg-icons";

export function CustomData({ name, result, handleActionClick, handleDeleteClick }) {
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
            handleActionClick(name);
          }}
        >
          <FontAwesomeIcon icon={faCirclePlay} style={{ color: "#ffa70f" }} size="2x" />
        </button>
        <button
          style={{ border: "none", background: "none" }}
          onClick={() => {
            //TODO: EDIT DATA
          }}
        >
          <FontAwesomeIcon icon={faSquarePen} style={{ color: "#124eb5" }} size="2x" />
        </button>
        <button
          style={{ border: "none", background: "none" }}
          onClick={() => {
            handleDeleteClick(name);
          }}
        >
          <FontAwesomeIcon icon={faCircleMinus} style={{ color: "#ff0000" }} size="2x" />
        </button>
      </td>
    </tr>
  );
}

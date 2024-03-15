import React from "react";
import axios from "axios";
import "./RegularItem.scss";
import trash from "../../assets/icons/delete_outline-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import { Link } from "react-router-dom";

export default function RegularItem({ data, to, id }) {
  const handleDel = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${to}/${id}`);
    } catch (error) {
      console.log(`Delete ${to} error: ${error}`);
    }
  };
  return (
    <tr>
      {data.map((item) => (
        <td>{item}</td>
      ))}
      <td>
        <button onClick={handleDel}>
          <img src={trash} alt="delete" />
        </button>
        <Link to={`/${to}/edit/:${id}`}>
          <img src={edit} alt="edit" />
        </Link>
      </td>
    </tr>
  );
}

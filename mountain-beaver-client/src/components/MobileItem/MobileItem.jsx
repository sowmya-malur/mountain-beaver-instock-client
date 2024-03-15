import React from "react";
import "./MobileItem.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import trash from "../../assets/icons/delete_outline-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";

export default function MobileItem({ titles, data, id, to }) {
  const handleDel = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${to}/${id}`);
    } catch (error) {
      console.log(`Delete ${to} error: ${error}`);
    }
  };

  return (
    <div className="MobileItem">
      <div className="MobileItem__content">
        <div className="MobileItem__row">
          <div className="MobileItem__block">
            <h4 className="MobileItem__type">{titles[0]}</h4>
            <span className="MobileItem__data">{data[0]}</span>
          </div>
          <div className="MobileItem__block">
            <h4 className="MobileItem__type">{titles[1]}</h4>
            <span className="MobileItem__data">{data[1]}</span>
          </div>
        </div>
        <div className="MobileItem__row">
          <div className="MobileItem__block">
            <h4 className="MobileItem__type">{titles[2]}</h4>
            <span className="MobileItem__data">{data[2]}</span>
          </div>
          <div className="MobileItem__block">
            <h4 className="MobileItem__type">{titles[3]}</h4>
            <span className="MobileItem__data">{data[3]}</span>
          </div>
          {titles[4] ? (
            <div className="MobileItem__block">
              <h4 className="MobileItem__type">{titles[4]}</h4>
              <span className="MobileItem__data">{data[4]}</span>
            </div>
          ) : (
            {}
          )}
        </div>
      </div>

      <div className="MobileItem__buttons">
        <button onClick={handleDel}>
          <img src={trash} alt="delete" />
        </button>
        <Link to={`/${to}/edit/:${id}`}>
          <img src={edit} alt="edit" />
        </Link>
      </div>
    </div>
  );
}

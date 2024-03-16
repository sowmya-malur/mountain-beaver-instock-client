import React from "react";
import "./ListItem.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import trash from "../../assets/icons/delete_outline-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import Arow from "../../assets/icons/chevron_right-24px.svg";

export default function MobileItem({ titles, data, id, to }) {
  const handleDel = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${to}/${id}`);
    } catch (error) {
      console.log(`Delete ${to} error: ${error}`);
    }
  };

  return (
    <div className="Item">
      <div className="Item__content">
        <div className="Item__row">
          <div className="Item__block">
            <h4 className="Item__type">{titles[0]}</h4>
            <div className="Item__link">
              <span className="Item__data Item__data--name data ">
                {data[0]}
              </span>
              <img className="Item__logo" src={Arow} alt="arrow" />
            </div>
          </div>
          <div className="Item__block">
            <h4 className="Item__type">{titles[1]}</h4>
            <span className="Item__data ">{data[1]}</span>
          </div>
        </div>
        <div className="Item__row">
          <div className="Item__block">
            <h4 className="Item__type">{titles[2]}</h4>
            {data[2] === "In Stock" ? (
              <span className="Item__status">{data[2]}</span>
            ) : (
              <span className="Item__status Item__status--out">
                {data[2]}
              </span>
            )}
          </div>
          <div className="Item__block">
            <h4 className="Item__type">{titles[3]}</h4>
            <span className="Item__data">{data[3]}</span>
          </div>
          {titles[4] ? (
            <div className="Item__block">
              <h4 className="Item__type">{titles[4]}</h4>
              <span className="Item__data">{data[4]}</span>
            </div>
          ) : (
            {}
          )}
        </div>
      </div>

      <div className="Item__buttons">
        <button onClick={handleDel} className="Item__button">
          <img src={trash} alt="delete" />
        </button>

        <Link to={`/${to}/edit/:${id}`}>
          <img src={edit} alt="edit" />
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./ListItem.scss";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import trash from "../../assets/icons/delete_outline-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import Arow from "../../assets/icons/chevron_right-24px.svg";
import axios from "axios";

export default function MobileItem({ titles, data, id, to, fetchList, url }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelClicked = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleDelete = async () => {
    await axios.delete(`${url}/${id}`);
    await fetchList();
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${to}/${id}`);
  };

  return (
    <div className="Item">
      <div className="Item__content">
        <div className="Item__row">
          <div className="Item__block Item__block--name">
            <h4 className="Item__type">{titles[0]}</h4>
            <div className="Item__link" onClick={handleClick}>
              <span className="Item__data Item__data--name">{data[0]}</span>
              <img className="Item__logo" src={Arow} alt="arrow" />
            </div>
          </div>
          <div className="Item__block Item__block--type">
            <h4 className="Item__type">{titles[1]}</h4>
            <span className="Item__data ">{data[1]}</span>
          </div>
        </div>
        <div className="Item__row">
          <div className="Item__block Item__block--stock">
            <h4 className="Item__type">{titles[2]}</h4>
            {data[2] === "In Stock" ? (
              <span className="Item__status">{data[2]}</span>
            ) : (
              <span className="Item__status Item__status--out">{data[2]}</span>
            )}
          </div>
          <div className="Item__block Item__block--number">
            <h4 className="Item__type">{titles[3]}</h4>
            <span className="Item__data">{data[3]}</span>
          </div>
          {titles[4] ? (
            <div className="Item__block Item__block--location">
              <h4 className="Item__type">{titles[4]}</h4>
              <span className="Item__data">{data[4]}</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="Item__buttons">
        <button onClick={handleDelClicked} className="Item__button">
          <img src={trash} alt="delete" />
        </button>

        <Link to={`/${to}/${id}/edit`}>
          <img src={edit} alt="edit" />
        </Link>
      </div>

      {showModal ? (
        <Modal
          name={data[0]}
          type={"inventory"}
          setActive={setShowModal}
          del={handleDelete}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

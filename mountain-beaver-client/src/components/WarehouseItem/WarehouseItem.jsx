import React, { useState } from "react";
import "./WarehouseItem.scss";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import trash from "../../assets/icons/delete_outline-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import Arow from "../../assets/icons/chevron_right-24px.svg";
import axios from "axios";

export default function WarehouseItem({
  titles,
  data,
  id,
  to,
  fetchList,
  url,
}) {
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
    <div className="wItem">
      <div className="wItem__content">
        <div className="wItem__row wItem__row--top">
          <div className="wItem__block wItem__block--name">
            <h4 className="wItem__type">{titles[0]}</h4>
            <div className="wItem__link" onClick={handleClick}>
              <span className="wItem__data wItem__data--name">{data[0]}</span>
              <img className="wItem__logo" src={Arow} alt="arrow" />
            </div>
          </div>
          <div className="wItem__block wItem__block--address">
            <h4 className="wItem__type">{titles[1]}</h4>
            <span className="wItem__data ">{data[1]}</span>
          </div>
        </div>
        <div className="wItem__row wItem__row--bottom">
          <div className="wItem__block wItem__block--contactName">
            <h4 className="wItem__type">{titles[2]}</h4>
            <span className="wItem__status">{data[2]}</span>
          </div>
          <div className="wItem__block wItem__block--info">
            <h4 className="wItem__type">{titles[3]}</h4>
            <span className="wItem__data">{data[3]}</span>
          </div>
        </div>
      </div>
      <div className="wItem__buttons">
        <button onClick={handleDelClicked} className="wItem__button">
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

import React from "react";
import "./Modal.scss";
import axios from "axios";

function Modal({ name, type, id, setActive, fetchList }) {
  const url = `http://localhost:8080/${type}/${id}`;
  const handleCancle = (e) => {
    e.preventDefault();
    setActive(false);
  };
  const handleDelete = async () => {
    await axios.delete(url);
    await fetchList();
    setActive(false);
  };
  return (
    <div className="modal">
      <div className="modal__layer" />

      <div className="modal__window">
        <div className="modal__top">
          <button className="modal__del" onClick={handleCancle}>
            X
          </button>
        </div>

        <div className="modal__middle">
          <h2 className="modal__title">{`Delete ${name} ${type} item?`}</h2>
          <p className="modal__dec">{`Please confirm that you'd like to delete ${name} from the ${type} list. You won't be able to undo this action.`}</p>
        </div>

        <div className="modal__bottom">
          <button className="modal__button" onClick={handleCancle}>
            Cancel
          </button>
          <button
            className="modal__button modal__button--del"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

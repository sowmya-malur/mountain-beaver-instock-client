import React from "react";
import "./Modal.scss";
import axios from "axios";

/*
Component Modal
Props:
  -name: name of item (ex. television)
  -type: warehouse or inventory
  -id: id of warehouse or inventory
  -setActive: change the bolean of showing modal in parent component
  -fethList: the feth list function of warehouse or inventory
*/

function Modal({ name, type, id, setActive, fetchList }) {
  const url = `${process.env.REACT_APP_URL}/${type}/${id}`;
  const handleCancel = (e) => {
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
          <button className="modal__del" onClick={handleCancel}>
            X
          </button>
        </div>

        <div className="modal__middle">
          <h2 className="modal__title">
            {type === "warehouse"
              ? `Delete ${name} ${type}?`
              : `Delete ${name} ${type} item?`}
          </h2>
          <p className="modal__dec">{`Please confirm that you'd like to delete ${name} from the ${type} list. You won't be able to undo this action.`}</p>
        </div>

        <div className="modal__bottom">
          <button className="modal__button" onClick={handleCancel}>
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

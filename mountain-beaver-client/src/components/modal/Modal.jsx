import React from "react";
import "./Modal.scss";

function Modal({ name, type, id }) {
  return (
    <div className="modal">
      <div className="modal__layer" />

      <div className="modal__window">
        <div className="modal__top">
          <button className="modal__del">X</button>
        </div>

        <div className="modal__middle">
          <h2 className="modal__title">{`Delete ${name} ${type} item?`}</h2>
          <p className="modal__dec">{`Please confirm that you'd like to delete ${name} from the ${type} list. You won't be able to undo this action.`}</p>
        </div>

        <div className="modal__bottom">
          <button className="modal__button">Cancel</button>
          <button className="modal__button modal__button--del">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

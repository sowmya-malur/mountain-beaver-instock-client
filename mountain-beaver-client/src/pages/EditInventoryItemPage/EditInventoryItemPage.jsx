import "./EditInventoryItemPage.scss";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import ArrowDown from "../../assets/icons/arrow_drop_down-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";
import React, { useState } from "react";

function EditInventoryItem({ inventory }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [errors, setErrors] = useState({});

  const errorMessage = "This field is required";

  const validateForm = () => {
    const formErrors = {};
    if (!itemName.trim()) {
      formErrors.itemName = errorMessage;
    }
    if (!description.trim()) {
      formErrors.description = errorMessage;
    }
    if (!category.trim()) {
      formErrors.category = errorMessage;
    }
    if (!warehouse.trim()) {
      formErrors.warehouse = errorMessage;
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted successfully");
    } else {
      console.log("Form has errors, please correct them");  
    }
  };

  return (
    <section className="inv">
      <div className="inv__full-wrapper">
        <div className="inv__title">
          <img src={Arrow} alt="arrow back logo" className="inv__logo" />
          <h1 className="inv__text"> Edit Inventory Item</h1>
        </div>
        <div className="inv__container">
          <div className="inv__details">
            <h2 className="inv__details-title">Item Details</h2>
            {errors.itemName && (
              <img
                src={erroricon}
                alt="error icon"
                className="inv__error-icon"
              />
            )}
            {errors.itemName && (
              <span className="inv__error-message">{errors.itemName}</span>
            )}
            <h3 className="inv__details-label">Item Name</h3>
            <input
              type="text"
              className={`inv__details-input ${
                errors.itemName ? "inv__details-input--error" : ""
              }`}
              placeholder="Television"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            {errors.description && (
              <img
                src={erroricon}
                alt="error icon"
                className="inv__error-icon"
              />
            )}
            {errors.description && (
              <span className="inv__error-message">{errors.description}</span>
            )}

            <h3 className="inv__details-label">Description</h3>
            <input
              type="text"
              className={`inv__details-input-desc ${
                errors.description && "inv__details-input--error"
              }`}
              placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.category && (
              <img
                src={erroricon}
                alt="error icon"
                className="inv__error-icon"
              />
            )}
            {errors.category && (
              <span className="inv__error-message">{errors.category}</span>
            )}

            <h3 className="inv__details-label">Category</h3>
            <input
              type="text"
              className={`inv__details-input ${
                errors.category && "inv__details-input--error"
              }`}
              placeholder="Electronics"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <img
              className="inv__details-input-logo-1"
              src={ArrowDown}
              alt="Arrow down"
            />
          </div>
          <div className="inv__avail">
            <h2 className="inv__details-title">Item Availability</h2>
            <h3 className="inv__details-label">Status</h3>
            <div className="inv__avail-wrapper">
              <div className="inv__avail-cont">
                <div className="inv__avail-shape"></div>
                <p className="inv__avail-text">In stock</p>
              </div>
              <div className="inv__avail-conta">
                <p className="inv__avail-text2">Out of stock</p>
                <div className="inv__avail-shape-out">
                  <div className="inv__avail-dot"></div>
                </div>
              </div>
            </div>
            {errors.warehouse && (
              <img
                src={erroricon}
                alt="error icon"
                className="inv__error-icon"
              />
            )}
            {errors.warehouse && (
              <span className="inv__error-message">{errors.warehouse}</span>
            )}
            <h3 className="inv__details-label">Warehouse</h3>
            <input
              type="text"
              name="name"
              id="name"
              className={`inv__details-input ${
                errors.warehouse && "inv__details-input--error"
              }`}
              placeholder="Manhattan"
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
            />

            <img
              className="inv__avail-input-logo-2"
              src={ArrowDown}
              alt="Arrow down"
            />
          </div>
        </div>
        <div className="inv__avail-button">
          <button className="inv__button-cancel">Cancel</button>
          <button className="inv__button-save" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default EditInventoryItem;

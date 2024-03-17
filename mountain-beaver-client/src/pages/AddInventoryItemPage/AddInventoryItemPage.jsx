import "./AddInventoryItemPage.scss";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import ArrowDown from "../../assets/icons/arrow_drop_down-24px.svg";
import ErrorIcon from "../../assets/icons/error-24px.svg";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddInventoryItemPage() {
  // Initialize states for all the form fields and errors
  const [warehouseId, setWarehouseId] = useState(0);
  const [warehouseName, setWarehouseName] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("In Stock"); // Default status
  const [errors, setErrors] = useState({});

  const errorMessage = "This field is required";
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const formErrors = {};
    if (!itemName.trim()) {
      formErrors.itemName = errorMessage;
    }
    if (!description.trim()) {
      formErrors.description = errorMessage;
    }
    if (category.trim() === "Please select") {
      formErrors.category = errorMessage;
    }
    if (warehouseName.trim() === "Please select") {
      formErrors.warehouseName = errorMessage;
    }
    if (status === "In Stock") {
      // check if quantity is not a number or empty string.
      if (isNaN(quantity) || !quantity.trim()) {
        formErrors.quantity = "Quantity must be a number.";
      } else if (!Number.isInteger(Number(quantity))) {
        // check if quantity is a whole number.
        formErrors.quantity = "Quantity must be a whole number.";
      } else if (quantity <= 0) {
        // check if quantity is zero or less.
        console.log("in here");
        formErrors.quantity = "Quantity cannot be zero(0).";
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Form is valid, proceed with submission
      if (validateForm()) {
        const newInventory = {
          warehouse_id: 1, // TODO: how to set this?
          item_name: itemName,
          description: description,
          category: category,
          status: status,
          quantity: quantity,
        };
        setWarehouseId(1); // TODO: del
        console.log(warehouseId); // TODO: del
        console.log("newInventory", newInventory); // TODO: del

        // POST request to backend API
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/inventories`,
          newInventory
        );

        if (response.status === 201) {
          setErrors({});
          alert("New inventory added successfully");
          // Reset the form fields after submission
          resetForm();
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({
          exception: error.response.data.errorMessage, // missing fields or format error
        });
      } else if (error.response && error.response.status === 500) {
        setErrors({
          exception: error.response.data.errorMessage, // Internal server error
        });
      } else {
        setErrors({
          exception: "Error adding new inventory item", // Generic error message
        });
      }
      console.error("Error adding new inventory item.", error);
    }
  };

  const resetForm = () => {
    setItemName("");
    setDescription("");
    setCategory("");
    setWarehouseId(0);
    setWarehouseName("");
    setQuantity(0);
    setStatus("In Stock");
    setErrors({});
  };

  return (
    <section className="inv">
      <div className="inv__full-wrapper">
        <div className="inv__title">
          <img
            src={Arrow}
            alt="arrow back logo"
            className="inv__logo"
            onClick={handleBack}
          />
          <h1 className="inv__text"> Add New Inventory Item</h1>
        </div>
        <div className="inv__container">
          <div className="inv__details">
            <h2 className="inv__details-title">Item Details</h2>
            {errors.itemName && (
              <div className="inv__error-container">
                <img
                  src={ErrorIcon}
                  alt="error icon"
                  className="inv__error-icon"
                />
                <span className="inv__error-message">{errors.itemName}</span>
              </div>
            )}
            <h3 className="inv__details-label">Item Name</h3>
            <input
              type="text"
              className={`inv__details-input ${
                errors.itemName ? "inv__details-input--error" : ""
              }`}
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            {errors.description && (
              <div className="inv__error-container">
                <img
                  src={ErrorIcon}
                  alt="error icon"
                  className="inv__error-icon"
                />
                <span className="inv__error-message">{errors.description}</span>
              </div>
            )}
            <h3 className="inv__details-label">Description</h3>
            <input
              type="text"
              name="description"
              id="description"
              className={`inv__details-input-desc ${
                errors.description ? "inv__details-input--error" : ""
              }`}
              placeholder="Please enter a brief item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {errors.category && (
              <div className="inv__error-container">
                <img
                  src={ErrorIcon}
                  alt="error icon"
                  className="inv__error-icon"
                />
                <span className="inv__error-message">{errors.category}</span>
              </div>
            )}
            <h3 className="inv__details-label">Category</h3>
            <input
              type="text"
              name="category"
              id="category"
              className={`inv__details-input ${
                errors.category ? "inv__details-input--error" : ""
              }`}
              placeholder="Please select"
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
              <div className="inv__avail-conta">
                <p className="inv__avail-text2">In stock</p>
                <div className="inv__avail-shape-out">
                  <div className="inv__avail-dot"></div>
                </div>
              </div>
              <div className="inv__avail-cont">
                <div className="inv__avail-shape"></div>
                <p className="inv__avail-text">Out of stock</p>
              </div>
            </div>
            {errors.quantity && (
              <div className="inv__error-container">
                <img
                  src={ErrorIcon}
                  alt="error icon"
                  className="inv__error-icon"
                />
                <span className="inv__error-message">{errors.quantity}</span>
              </div>
            )}
            <h3 className="inv__details-label">Quantity</h3>
            {status === "In Stock" && (
              <input
                type="text"
                name="quantity"
                id="quantity"
                className={`inv__details-input ${
                  errors.quantity ? "inv__details-input--error" : ""
                }`}
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            )}
            {errors.warehouseName && (
              <div className="inv__error-container">
                <img
                  src={ErrorIcon}
                  alt="error icon"
                  className="inv__error-icon"
                />
                <span className="inv__error-message">
                  {errors.warehouseName}
                </span>
              </div>
            )}
            <h3 className="inv__details-label">Warehouse</h3>
            <input
              type="text"
              name="name"
              id="name"
              className={`inv__details-input ${
                errors.warehouseName ? "inv__details-input--error" : ""
              }`}
              placeholder="Please select"
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
            />

            <img
              className="inv__avail-input-logo-2"
              src={ArrowDown}
              alt="Arrow down"
            />
          </div>
        </div>
        <div className="inv__avail-button">
          <button className="inv__button-cancel" onClick={handleBack}>
            Cancel
          </button>
          <button className="inv__button-save" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default AddInventoryItemPage;

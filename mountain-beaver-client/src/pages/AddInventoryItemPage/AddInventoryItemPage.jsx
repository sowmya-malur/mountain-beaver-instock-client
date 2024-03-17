import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Arrow from "../../assets/icons/arrow_back-24px.svg";
import ArrowDown from "../../assets/icons/arrow_drop_down-24px.svg";
import ErrorIcon from "../../assets/icons/error-24px.svg";
import "./AddInventoryItemPage.scss";

function AddInventoryItemPage() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("In Stock"); // Default status
  const [errors, setErrors] = useState({});
  const [showWarehouseOptions, setShowWarehouseOptions] = useState(false); // Define showWarehouseOptions state
  const [showCategoryOptions, setShowCategoryOptions] = useState(false); // Define showCategoryOptions state
  const [warehouses, setWarehouses] = useState([]); // Define warehouses state
  const [categories, setCategories] = useState([]); // Define categories state
  const navigate = useNavigate();

  const errorMessage = "This field is required";

  useEffect(() => {
    // Fetch warehouse data when component mounts
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/warehouses`
        );
        setWarehouses(response.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    // Fetch category data when component mounts
    const fetchCategories = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/inventories`;
        const response = await axios.get(url);
        // Extract unique categories from the inventory data
        const uniqueCategories = Array.from(
          new Set(response.data.map((item) => item.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchWarehouses();
    fetchCategories();
  }, []);

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
    if (!category.trim()) {
      formErrors.category = errorMessage;
    }
    if (!warehouse.trim()) {
      formErrors.warehouse = errorMessage;
    }
    if (status === "In Stock" && !quantity.trim()) {
      formErrors.quantity = errorMessage;
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/inventories`,
          {
            itemName,
            description,
            category,
            warehouse,
            quantity,
            status,
          }
        );
        if (response.status === 201) {
          console.log("Item added successfully");
          resetForm();
          navigate("/"); // Navigate to desired location after successful submission
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  const resetForm = () => {
    setItemName("");
    setDescription("");
    setCategory("");
    setWarehouse("");
    setQuantity("");
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
            <div className="dropdown-container">
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

              {showCategoryOptions && (
                <div className="dropdown-options">
                  {categories.map((cat, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryOptions(false); // Close dropdown after selecting
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <img
              className="inv__details-input-logo-1"
              src={ArrowDown}
              alt="Arrow down"
              onClick={() => setShowCategoryOptions(!showCategoryOptions)}
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
            {errors.warehouse && (
              <div className="inv__error-container">
                <img
                  src={ErrorIcon}
                  alt="error icon"
                  className="inv__error-icon"
                />
                <span className="inv__error-message">{errors.warehouse}</span>
              </div>
            )}
            <h3 className="inv__details-label">Warehouse</h3>
            <div className="dropdown-container">
              <input
                type="text"
                name="warehouse"
                id="warehouse"
                className={`inv__details-input ${
                  errors.warehouse ? "inv__details-input--error" : ""
                }`}
                placeholder="Please select"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              />

              {showWarehouseOptions && (
                <div className="dropdown-options">
                  {warehouses.map((wh, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setWarehouse(wh.warehouse_name);
                        setShowWarehouseOptions(false); // Close dropdown after selecting
                      }}
                    >
                      {wh.warehouse_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <img
              className="inv__avail-input-logo-2"
              src={ArrowDown}
              alt="Arrow down"
              onClick={() => setShowWarehouseOptions(!showWarehouseOptions)}
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

export default AddInventoryItemPage;

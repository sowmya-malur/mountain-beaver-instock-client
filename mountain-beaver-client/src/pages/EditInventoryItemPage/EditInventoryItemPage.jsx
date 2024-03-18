import "./EditInventoryItemPage.scss";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import ArrowDown from "../../assets/icons/arrow_drop_down-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditInventoryItem() {
  const navigate = useNavigate();
  const { inventoryId } = useParams();

  const [inventory, setInventory] = useState({});
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [errors, setErrors] = useState({});
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showWarehouseOptions, setShowWarehouseOptions] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("In Stock");
  const [warehouseId, setWarehouseId] = useState(0);
  const handleBack = () => {
    navigate(-1);
  };

  const errorMessage = "This field is required";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/inventories/${inventoryId}`
        );

        setInventory(inventoryResponse.data);

        if (inventoryResponse.data) {
          setItemName(inventoryResponse.data.item_name);
          setDescription(inventoryResponse.data.description);
          setCategory(inventoryResponse.data.category);
          setWarehouseName(inventoryResponse.data.warehouse_name);
          setQuantity(inventoryResponse.data.quantity);
          setStatus(inventoryResponse.data.status);
          setWarehouseId(inventoryResponse.data.id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [inventoryId]);

  useEffect(() => {
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/inventories`
        );
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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleWarehouseChange = (e) => {
    setWarehouseName(e.target.value);
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
    if (!warehouseName.trim()) {
      formErrors.warehouseName = errorMessage;
    }
    if (status === "In Stock") {
      // check if quantity is not a number or empty string.
      if (isNaN(quantity) || quantity === " ") {
        formErrors.quantity = "Quantity must be a number.";
      } else if (!Number.isInteger(Number(quantity))) {
        // check if quantity is a whole number.
        formErrors.quantity = "Quantity must be a whole number.";
      } else if (quantity <= 0) {
        // check if quantity is zero or less.
        formErrors.quantity = "Quantity cannot be zero(0)";
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
    if (status === "Out of Stock") {
      setQuantity("0");
    }
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const updatedInventoryItem = {
        id: inventory.id,
        warehouse_id: warehouseId,
        item_name: itemName,
        description: description,
        category: category,
        quantity: quantity,
        status: status,
      };

      try {
        // POST request to backend API
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/inventories/${inventory.id}`,
          updatedInventoryItem
        );

        if (response.status === 201) {
          console.log("Inventory item updated successfully");
          setErrors({});
          resetForm();
          navigate("/inventory");
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
            exception: "Error updating new inventory item", // Generic error message
          });
        }
        console.error("Error updating new inventory item.", error);
      }
    }
  };

  const resetForm = () => {
    setItemName("");
    setDescription("");
    setCategory("");
    setWarehouseName("");
    setWarehouseId(1);
    setQuantity(0);
    setStatus("In Stock");
    setErrors({});
  };

  // Function to toggle the status
  const toggleStatus = () => {
    setStatus(status === "In Stock" ? "Out of Stock" : "In Stock");
    if (status === "Out of stock") {
      setQuantity(0);
    }
  };

  return (
    <>
      {inventory && (
        <section className="inv">
          <div className="inv__full-wrapper">
            <div className="inv__title">
              <img
                src={Arrow}
                alt="arrow back logo"
                className="inv__logo"
                onClick={handleBack}
              />
              <h1 className="inv__text"> Edit Inventory Item</h1>
            </div>
            <div className="inv__container">
              <div className="inv__details">
                <h2 className="inv__details-title">Item Details</h2>

                <h3 className="inv__details-label">Item Name</h3>
                <input
                  type="text"
                  className={`inv__details-input ${
                    errors.itemName ? "inv__details-input--error" : ""
                  }`}
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                {errors.itemName && (
                  <div className="inv__error-container">
                    <img
                      src={errorIcon}
                      alt="error icon"
                      className="inv__error-icon"
                    />
                    <span className="inv__error-message">
                      {errors.itemName}
                    </span>
                  </div>
                )}

                <h3 className="inv__details-label">Description</h3>
                <input
                  type="text"
                  className={`inv__details-input-desc ${
                    errors.description && "inv__details-input--error"
                  }`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <div className="inv__error-container">
                    <img
                      src={errorIcon}
                      alt="error icon"
                      className="inv__error-icon"
                    />
                    <span className="inv__error-message">
                      {errors.description}
                    </span>
                  </div>
                )}
                {/* Category */}
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
                    onChange={handleCategoryChange}
                    readOnly
                  />
                  {showCategoryOptions && (
                    <div className="dropdown-options">
                      {categories.map((cat, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setCategory(cat);
                            setShowCategoryOptions(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.category && (
                    <div className="inv__error-container">
                      <img
                        src={errorIcon}
                        alt="error icon"
                        className="inv__error-icon"
                      />
                      <span className="inv__error-message">
                        {errors.category}
                      </span>
                    </div>
                  )}
                </div>
                <img
                  className={`inv__details-input-logo-1 ${
                    errors.category && "inv__details-input-logo-1--align-error"
                  }`}
                  src={ArrowDown}
                  alt="Arrow down"
                  onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                />
              </div>
              {/* Availability */}
              <div className="inv__avail">
                <h2 className="inv__details-title">Item Availability</h2>
                <h3 className="inv__details-label">Status:</h3>

                <div className="inv__avail-wrapper">
                  <div
                    className="inv__avail-cont"
                    onClick={() => toggleStatus("In Stock")}
                  >
                    <div
                      className={
                        status === "In Stock"
                          ? "inv__avail-shape-out"
                          : "inv__avail-shape"
                      }
                    >
                      {status === "In Stock" && (
                        <div className="inv__avail-dot"></div>
                      )}
                    </div>
                    <p className="inv__avail-text">In stock</p>
                  </div>
                  <div
                    className="inv__avail-cont"
                    onClick={() => toggleStatus("Out of Stock")}
                  >
                    <div
                      className={
                        status === "Out of Stock"
                          ? "inv__avail-shape-out"
                          : "inv__avail-shape"
                      }
                    >
                      {status === "Out of Stock" && (
                        <div className="inv__avail-dot"></div>
                      )}
                    </div>
                    <p className="inv__avail-text">Out of stock</p>
                  </div>
                </div>

                {status === "In Stock" && (
                  <>
                    <h3 className="inv__details-label">Quantity</h3>
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
                  </>
                )}

                {errors.quantity && (
                  <div className="inv__error-container">
                    <img
                      src={errorIcon}
                      alt="error icon"
                      className="inv__error-icon"
                    />
                    <span className="inv__error-message">
                      {errors.quantity}
                    </span>
                  </div>
                )}

                {/* Warehouse */}
                <h3 className="inv__details-label">Warehouse</h3>
                <div className="dropdown-container">
                  <input
                    type="text"
                    name="warehouse"
                    id="warehouse"
                    className={`inv__details-input ${
                      errors.warehouseName ? "inv__details-input--error" : ""
                    }`}
                    placeholder="Please select"
                    value={warehouseName}
                    onChange={handleWarehouseChange}
                    readOnly
                  />
                  {showWarehouseOptions && (
                    <div className="dropdown-options">
                      {warehouses.map((wh) => (
                        <div
                          key={wh.id}
                          onClick={() => {
                            setWarehouseId(wh.id);
                            setWarehouseName(wh.warehouse_name);
                            setShowWarehouseOptions(false);
                          }}
                        >
                          {wh.warehouse_name}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.warehouseName && (
                    <div className="inv__error-container">
                      <img
                        src={errorIcon}
                        alt="error icon"
                        className="inv__error-icon"
                      />
                      <span className="inv__error-message">
                        {errors.warehouseName}
                      </span>
                    </div>
                  )}
                </div>
                <img
                  className={`inv__avail-input-logo-2 ${
                    errors.warehouseName &&
                    "inv__avail-input-logo-2--align-error"
                  }`}
                  src={ArrowDown}
                  alt="Arrow down"
                  onClick={() => setShowWarehouseOptions(!showWarehouseOptions)}
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
      )}
    </>
  );
}

export default EditInventoryItem;

import "./EditInventoryItemPage.scss";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import ArrowDown from "../../assets/icons/arrow_drop_down-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";

import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const updatedInventoryItem = {
        warehouse_id: inventory.warehouse_id,
        item_name: itemName,
        description,
        category,
        status: inventory.status,
        quantity: inventory.quantity,
      };

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/inventories/${inventory.id}`,
          updatedInventoryItem
        );

        if (response.status === 200) {
          console.log("Inventory item updated successfully");
          resetForm();
          navigate("/");
        }
      } catch (error) {
        console.error("Error updating inventory item:", error);
      }

      navigate("/inventory");
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  const resetForm = () => {
    setItemName("");
    setDescription("");
    setCategory("");
    setWarehouseName("");
    setErrors({});
  };
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
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
                  <span className="inv__error-message">
                    {errors.description}
                  </span>
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
                  {inventory.quantity > 0 ? (
                    <>
                      <div className="inv__avail-cont">
                        <div className="inv__avail-shape-out">
                          <div className="inv__avail-dot"></div>
                        </div>
                        <p className="inv__avail-text">In stock</p>
                      </div>
                      <div className="inv__avail-cont">
                        <div className="inv__avail-shape"></div>
                        <p className="inv__avail-text">Out of stock</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="inv__avail-cont">
                        <div className="inv__avail-shape"></div>
                        <p className="inv__avail-text">In stock</p>
                      </div>
                      <div className="inv__avail-cont">
                        <div className="inv__avail-shape-out">
                          <div className="inv__avail-dot"></div>
                        </div>
                        <p className="inv__avail-text">Out of stock</p>
                      </div>
                    </>
                  )}
                </div>
                {errors.warehouseName && (
                  <img
                    src={erroricon}
                    alt="error icon"
                    className="inv__error-icon"
                  />
                )}
                {errors.warehouseName && (
                  <span className="inv__error-message">
                    {errors.warehouseName}
                  </span>
                )}
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
                  />
                  {showWarehouseOptions && (
                    <div className="dropdown-options">
                      {warehouses.map((wh, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setWarehouseName(wh.warehouse_name);
                            setShowWarehouseOptions(false);
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

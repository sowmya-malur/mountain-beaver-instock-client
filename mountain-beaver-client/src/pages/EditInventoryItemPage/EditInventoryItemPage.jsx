
import "./EditInventoryItemPage.scss";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import ArrowDown from "../../assets/icons/arrow_drop_down-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";

import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditInventoryItem() {
  // Initialize hooks
  const navigate = useNavigate();

  // Accessing the parameter from the route path
  const { warehouseId, inventoryId } = useParams();

  const [inventory, setInventory] = useState({});
  const [warehouses, setWarehouses] = useState([]);

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  // const [warehouseId, setWarehouseId] = useState(warehouseId); //TODO: test if this is needed or not
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState({});

  const errorMessage = "This field is required";

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/warehouses`
        );
        setWarehouses(response.data);
      } catch (error) {
        console.error(`Error fetching warehouses`, error);
      }
    };

    fetchWarehouses();
  }, []);

  // Get inventory data for the given inventory id.
  useEffect(() => {
    async function getSingleInventory() {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/inventories/${inventoryId}`
      );
      console.log("response:", response);
      setInventory(response.data);

      if (inventory) {
        setItemName(response.data.item_name);
        setDescription(inventory.description);
        setCategory(inventory.category);
        setStock(inventory.status);
        setQuantity(inventory.quantity);
        setWarehouseName(inventory.warehouse_name);
        // setWarehouseId(inventory.warehouse_id);
      }
    }

    // call function to get the inventory data for the given id
    getSingleInventory();
  }, [inventoryId]);

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

    // If form is valid, proceed with submission
    if (validateForm()) {
      const updatedInventoryItem = {
        warehouse_id: inventory.warehouse_id,
        item_name: "TV",
        description:
          'This 50", 4K LED TV provides a crystal-clear picture and vivid colors.',
        category: "Electronics",
        status: "Out of Stock",
        quantity: "0",
      };

      // PUT request to backend API
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/inventories/${inventory.id}`,
        updatedInventoryItem
      );

      if (response.status === 200) {
        console.log("Inventory item updated successfully"); //TODO:

        // Reset form fields and clear errors
        resetForm();
        navigate("/");
      }
      console.log("Form submitted successfully");
      resetForm();

      navigate("/inventory");
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  // Function to reset form fields and clear errors
  const resetForm = () => {
    setItemName("");
    setDescription("");
    setCategory("");
    setStock("");
    setQuantity(0);
    setWarehouseName("");
    // setWarehouseId(0);
    // Clear errors
    setErrors({});
  };

  return (
    <>
      {inventory && (
        <section className="inv">
          <div className="inv__full-wrapper">
            <div className="inv__title">
              <Link to="/">
                <img src={Arrow} alt="arrow back logo" className="inv__logo" />
              </Link>
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
                {/* Added a ootb select element for dropdown */}
                {/* <select
                  className="inv__details-dropdown"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Gear">Gear</option>
                  <option value="Health">Health</option>
                </select> */}
                <input
              type="text"
              className={`inv__details-input ${
                errors.category && "inv__details-input--error"
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <img
              className="inv__details-input-logo-1"
              src={ArrowDown}
              alt="Arrow down"
              onClick={() => {
                
              }}
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
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`inv__details-input ${
                    errors.warehouseName && "inv__details-input--error"
                  }`}
                  placeholder="Manhattan"
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
              <Link to="/">
                <button className="inv__button-cancel">Cancel</button>
              </Link>
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
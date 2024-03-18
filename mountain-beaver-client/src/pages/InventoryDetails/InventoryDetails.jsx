import "../InventoryDetails/InventoryDetails.scss";

import edit from "../../assets/icons/edit-24px.svg";
import backarrow from "../../assets/icons/arrow_back-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function InventoryDetails({ inventoryId }) {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState({});
  const [notFound, setNotFound] = useState(false);

  const handleClick = () => {
    console.log("in click");
    // TODO: Add functionality to call edit inventory item page by passing the id
    // navigate("/EditInventoryItem/inventoryId"); //TODO: to test integration
  };

  useEffect(() => {
    const getInventory = async () => {
      try {
        // Fetch inventory data from backend API
        const inventoryResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/inventories/${inventoryId}`
        );

        // If request is successful and data is received, set inventory state
        if (inventoryResponse.status === 200) {
          setInventory(inventoryResponse.data);
          setNotFound(false);
        }
      } catch (error) {
        // Handle any errors during the API call
        if (error.response && error.response.status === 404) {
          // If inventory item not found, set notFound state to true
          setNotFound(true);
          console.error("Inventory item not found");
        } else {
          console.error("Error fetching inventory data:", error);
        }
      }
    };

    // Call the function to fetch inventory data
    getInventory();
  }, [inventoryId]);

  const upperCaseOf = (str) => {
    if (str) {
      return str.toUpperCase();
    }
  };

  return (
    <section className="inv-details">
      <div className="inv-details__full-wrapper">
        {/* Conditionally render 'Item not found' message if notFound state is true */}
        {notFound ? (
          <>
            <div className="inv-details__page-title">
              {/* TODO: Link to Warehouse Details page */}
              <Link to="/" className="inv-details__arrow-back">
                <img src={backarrow} alt="back arrow icon" />
              </Link>
            </div>
            <div className="inv-details__error-message inv-details__error-message--align">
            <img src={erroricon} alt="error icon" />
            <p>Item not found</p>
          </div>
          </>
        ) : (
          <>
            <div className="inv-details__page-title">
              {/* TODO: Link to Warehouse Details page */}
              <div className="inv-details__inner-container">
                <Link to="/" className="inv-details__arrow-back">
                  <img src={backarrow} alt="back arrow icon" />
                </Link>
                <h1 className="inv-details__title">{inventory.item_name}</h1>
              </div>
              <img src={edit} alt="edit icon" onClick={handleClick} className="inv-details__edit"/>
            </div>
            <div className="inv-details__container">
              <div className="inv-details__column">
                <p className="inv-details__heading">ITEM DESCRIPTION:</p>
                <p className="inv-details__info">{inventory.description}</p>
                <p className="inv-details__heading inv-details__heading--spacing">CATEGORY:</p>
                <p className="inv-details__info">{inventory.category}</p>
              </div>
              <div className="inv-details__column inv-details__column--divider">
                <div className="inv-details__qty-container">
                  <div>
                    <p className="inv-details__heading">STATUS:</p>
                    <div
                      className={`inv-details__status ${
                        upperCaseOf(inventory.status) === "IN STOCK"
                          ? "inv-details__status--in-stock"
                          : "inv-details__status--out-of-stock"
                      }`}
                    >
                      {upperCaseOf(inventory.status)}
                    </div>
                  </div>
                  <div>
                    <p className="inv-details__heading">QUANTITY:</p>
                    <p className="inv-details__info">{inventory.quantity}</p>
                  </div>
                </div>
                <p className="inv-details__heading inv-details__heading--spacing">WAREHOUSE:</p>
                <p className="inv-details__info">{inventory.warehouse_name}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default InventoryDetails;

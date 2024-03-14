import "../InventoryDetails/InventoryDetails.scss";

import edit from "../../assets/icons/edit-24px.svg";
import backarrow from "../../assets/icons/arrow_back-24px.svg";

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
            <p className="inv-details__not-found">Item not found</p>
          </>
        ) : (
          <>
            <div className="inv-details__page-title">
              {/* TODO: Link to Warehouse Details page */}
              <Link to="/" className="inv-details__arrow-back">
                <img src={backarrow} alt="back arrow icon" />
              </Link>
              <h1 className="inv-details__title">{inventory.item_name}</h1>
              <img src={edit} alt="edit icon" onClick={handleClick} />
            </div>
            <p className="inv-details__heading">ITEM DESCRIPTION:</p>
            <p className="inv-details__info">{inventory.description}</p>
            <p className="inv-details__heading">CATEGORY:</p>
            <p className="inv-details__info">{inventory.category}</p>

            <p className="inv-details__heading">STATUS:</p>
            <p className="inv-details__status">{inventory.status}</p>
            <p className="inv-details__heading">QUANTITY:</p>
            <p className="inv-details__info">{inventory.quantity}</p>

            <p className="inv-details__heading">WAREHOUSE:</p>
            <p className="inv-details__info">{inventory.warehouse_name}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default InventoryDetails;

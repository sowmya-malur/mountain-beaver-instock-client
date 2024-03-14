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
  const handleClick = () => {
    console.log("in click");
    // TODO: Add functionality to call edit inventory item page by passing the id
    // navigate("/EditInventoryItem/inventoryId"); //TODO: to test integration
  };

  // Fetch inventory data upon component mount or when inventoryId changes
  useEffect(() => {
    try {
      const getInventory = async () => {
        // Fetch inventory data from backend API
        const inventoryResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/inventory/${inventoryId}`
        );

        // If request is successful and data is received, set inventory state
        if (inventoryResponse.status === 200) {
          setInventory(inventoryResponse.data);
        } else if(inventoryResponse.status === 404) {
            
        }
      };
      getInventory();
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  }, [inventoryId]);

  return (
    <section className="inv-details">
      <div className="inv-details__full-wrapper">
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
      </div>
    </section>
  );
}

export default InventoryDetails;

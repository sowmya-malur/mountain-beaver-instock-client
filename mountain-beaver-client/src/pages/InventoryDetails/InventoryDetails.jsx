import "../InventoryDetails/InventoryDetails.scss";

import edit from "../../assets/icons/edit-24px.svg";
import backarrow from "../../assets/icons/arrow_back-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

const { REACT_APP_BACKEND_URL } = process.env;

function InventoryDetails({ inventoryId }) {
    console.log(inventoryId);
    const navigate = useNavigate();

    const handleClick = () => {
        // TODO: Add functionality to call edit inventory item page by passing the id
        console.log("in click");
    };

    if(inventoryId) {
        // axios call to populate the page with details of the inventory
    }

  return (
    <section className="inv-details">
      <div className="inv-details__full-wrapper">
      <div className="inv-details__page-title">
        {/* TODO: Link to Warehouse Details page */}
        <Link to="/" className="inv-details__arrow-back">
        <img src={backarrow} alt="back arrow icon" />
        </Link>
        <h1 className="inv-details__title">Television</h1>
        <img src={edit} alt="edit icon" onClick={handleClick} />
      </div>
        <p className="inv-details__heading">ITEM DESCRIPTION:</p>
        <p className="inv-details__info">This 50", 4K LED TV provides a crystal-clear picture and vivid colors.</p>
        <p className="inv-details__heading">CATEGORY:</p>
        <p className="inv-details__info">Electronics</p>

        <p className="inv-details__heading">STATUS:</p>

        <p className="inv-details__heading">QUANTITY:</p>
        <p className="inv-details__info">500</p>

        <p className="inv-details__heading">WAREHOUSE:</p>    
        <p className="inv-details__info">Manhattan</p>
      </div>
    </section>
  );
}

export default InventoryDetails;

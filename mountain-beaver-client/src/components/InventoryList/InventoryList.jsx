import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "../List/List";
import "./InventoryList.scss";
import SearchLogo from "../../assets/icons/search-24px.svg";

const InventoryList = () => {
  const [Inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/inventories/`
        );
        setInventories(response.data);
      } catch (error) {
        console.error(`Error fetching inventories`, error);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div className="inventory">
      <div className="inventory__wrapper">
        <div className="inventory__container">
          <h2 className="inventory__title">Inventory</h2>
          <div className="inventory__input-wrapper">
            <input
              type="text"
              id="serach"
              name="serach"
              placeholder="Search..."
              className="inventory__input"
            />
            <img src={SearchLogo} alt="" className="inventory__logo" />

            <button className="inventory__button">+Add New Item</button>
          </div>
        </div>

        <List
          list={Inventories}
          titles={["INVENTORY ITEM", "CATEGORY", "STATUS", "QTY", "WAREHOUSE"]}
        />
      </div>
    </div>
  );
};

export default InventoryList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "../List/List";
import "./InventoryList.scss";
import SearchLogo from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import { useNavigate } from "react-router-dom";

const InventoryList = () => {
  const [Inventories, setInventories] = useState([]);
  const url = `${process.env.REACT_APP_BACKEND_URL}/inventories/`;
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/inventory/add");
  };

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`${url}`);
      const list = response.data.map(item => {
        return [
          item.item_name,
          item.category,
          item.status,
          item.quantity,
          item.warehouse_name,
        ]
      })
      setInventories(list);
    } catch (error) {
      console.error(`Error fetching inventories`, error);
    }
  };

  useEffect(() => {
    fetchInventories(); // eslint-disable-next-line
  }, []);

  return (
    <div className="inventory">
      <div className="inventory__wrapper">
        <div className="inventory__container">
          <h2 className="inventory__topTitle">Inventory</h2>
          <div className="inventory__input-wrapper">
            <input
              type="text"
              id="serach"
              name="serach"
              placeholder="Search..."
              className="inventory__input"
            />
            <img src={SearchLogo} alt="" className="inventory__logo" />

            <button onClick={handleAdd} className="inventory__button">
              +Add New Item
            </button>
          </div>
        </div>
        <div className="inventory__titles">
          <div className="inventory__title inventory__title--name">
            <h4>INVENTORY ITEM</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="inventory__title inventory__title--type">
            <h4>CATEGORY</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="inventory__title inventory__title--status">
            <h4>STATUS</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="inventory__title inventory__title--qty">
            <h4>QTY</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="inventory__title inventory__title--warehouse">
            <h4>WAREHOUSE</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="inventory__title inventory__title--ations">
            <h4>ACTIONS</h4>
            <img src={sort} alt="sort" />
          </div>
        </div>
        <List
          list={Inventories}
          titles={["INVENTORY ITEM", "CATEGORY", "STATUS", "QTY", "WAREHOUSE"]}
          fetchList={fetchInventories}
          url={url}
          to={"inventory"}
        />
      </div>
    </div>
  );
};

export default InventoryList;

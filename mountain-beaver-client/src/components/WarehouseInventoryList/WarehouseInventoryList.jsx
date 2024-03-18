import React, { useState, useEffect } from "react";
import List from "../List/List";
import axios from "axios";
import sort from "../../assets/icons/sort-24px.svg";
import edit from "../../assets/icons/edit.png";
import backarrow from "../../assets/icons/arrow_back-24px.svg";
import "./WarehouseInventoryList.scss";
import { useNavigate } from "react-router-dom";

const WarehouseInventoryList = ({ warehouseId }) => {
  const [currentWarehouseInventory, setCurrentWarehouseInventory] = useState(
    []
  );
  const [currentWarehouse, setCurrentWarehouse] = useState({});
  const [sort_by, setSort_by] = useState("");
  const [order, setOrder] = useState(true);
  const url = `${process.env.REACT_APP_BACKEND_URL}/inventories`;
  const titles = ["INVENTORY ITEM", "CATEGORY", "STATUS", "QTY"];
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate(`/warehouses/${warehouseId}/edit`);
  };
  const handleSort = (name) => {
    if (sort_by !== name) {
      setSort_by(name);
      setOrder(true);
    } else {
      setOrder(!order);
    }
  };

  const fetchWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/warehouses/${warehouseId}`
      );
      setCurrentWarehouse(response.data);
    } catch (error) {
      console.error("Error fetching warehouse details:", error);
    }
  };

  const fetchWarehouseInventory = async () => {
    try {
      const response = await axios.get(
        `${
          sort_by
            ? `${
                process.env.REACT_APP_BACKEND_URL
              }/warehouses/${warehouseId}/inventories?sort_by=${sort_by}&order_by=${
                order ? "asc" : "desc"
              }`
            : `${process.env.REACT_APP_BACKEND_URL}/warehouses/${warehouseId}/inventories`
        }`
      );
      const list = response.data.map((item) => {
        return [
          item.item_name,
          item.category,
          item.status,
          item.quantity,
          item.warehouse_name,
          item.id,
        ];
      });
      setCurrentWarehouseInventory(list); // Assuming this is an array of items
    } catch (error) {
      console.error("Error fetching warehouse details:", error);
    }
  };

  useEffect(() => {
    fetchWarehouseDetails();
    fetchWarehouseInventory(); // eslint-disable-next-line
  }, [warehouseId, sort_by, order]); // Rerun effect if warehouseId changes

  return (
    <div className="wInventory">
      <div className="wInventory__wrapper">
        <div className="wInventory__container">
          <div className="wInventory__input-wrapper">
            <div onClick={handleBack} className="wInventory__logoContainer">
              <img src={backarrow} alt="back arrow icon" className="wInventory__arrow" />
              <h1 className="wInventory__locationName">
                {currentWarehouse.warehouse_name}
              </h1>
            </div>
            <div className="wInventory__edit" onClick={handleClick}>
              <img
                src={edit}
                alt="edit icon"
                className="wInventory__editIcon"
              />
              <span className="wInventory__editText">Edit</span>
            </div>
          </div>
        </div>

        <div className="wInventory__warehouseInfo">
          <div className="wInventory__infoBlock wInventory__infoBlock--top">
            <div className="wInventory_warehouseBlock">
              <h4>WAREHOUSE ADDRESS</h4>
              <p className="wInventory__data wInventory__data--address">{`${currentWarehouse.address}, `}</p>
              <span className="wInventory__data">{`${currentWarehouse.city}, ${currentWarehouse.country}`}</span>
            </div>
          </div>
          <div className="wInventory__infoBlock">
            <div className="wInventory_warehouseBlock">
              <h4>CONTACT NAME</h4>
              <p className="wInventory__data">{`${currentWarehouse.contact_name}`}</p>
              <p className="wInventory__data">{`${currentWarehouse.contact_position}`}</p>
            </div>
            <div className="wInventory_warehouseBlock">
              <h4>CONTACT INFORMATION</h4>
              <p className="wInventory__data">{`${currentWarehouse.contact_phone}`}</p>
              <p className="wInventory__data">{`${currentWarehouse.contact_email}`}</p>
            </div>
          </div>
        </div>

        <div className="wInventory__titles">
          <div className="wInventory__title wInventory__title--name">
            <h4>INVENTORY ITEM</h4>
            <img
              src={sort}
              alt="sort"
              className="wInventory__sort"
              onClick={() => handleSort("item_name")}
            />
          </div>
          <div className="wInventory__title wInventory__title--type">
            <h4>CATEGORY</h4>
            <img
              src={sort}
              alt="sort"
              className="wInventory__sort"
              onClick={() => handleSort("category")}
            />
          </div>
          <div className="wInventory__title wInventory__title--status">
            <h4>STATUS</h4>
            <img
              src={sort}
              alt="sort"
              className="wInventory__sort"
              onClick={() => handleSort("status")}
            />
          </div>
          <div className="wInventory__title wInventory__title--qty">
            <h4>QTY</h4>
            <img
              src={sort}
              alt="sort"
              className="wInventory__sort"
              onClick={() => handleSort("quantity")}
            />
          </div>
          <div className="wInventory__title wInventory__title--ations">
            <h4>ACTIONS</h4>
          </div>
        </div>
        <List
          list={currentWarehouseInventory}
          titles={titles}
          fetchList={fetchWarehouseInventory}
          url={url}
          to={"inventory"}
        />
      </div>
    </div>
  );
};

export default WarehouseInventoryList;

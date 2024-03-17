import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WarehouseList.scss";
import SearchLogo from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import Warehouses from "../Warehouses/Warehouses";
import { useNavigate } from "react-router-dom";

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const url = `${process.env.REACT_APP_BACKEND_URL}/warehouses/`;
  const navigate = useNavigate();

  const handleAdd = async () => {
    navigate("/warehouses/add");
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/warehouses`
      );
      const list = response.data.map((item) => {
        return [
          item.warehouse_name,
          item.address,
          item.contact_name,
          `${item.contact_phone}\n${item.contact_email}`,
          item.id,
        ];
      });
      setWarehouses(list);
    } catch (error) {
      console.error(`Error fetching warehouses`, error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div className="warehouse">
      <div className="warehouse__wrapper">
        <div className="warehouse__container">
          <h2 className="warehouse__topTitle">Warehouse</h2>
          <div className="warehouse__input-wrapper">
            <input
              type="text"
              id="serach"
              name="serach"
              placeholder="Search..."
              className="warehouse__input"
            />
            <img src={SearchLogo} alt="" className="warehouse__logo" />

            <button onClick={handleAdd} className="warehouse__button">
              +Add New Item
            </button>
          </div>
        </div>
        <div className="warehouse__titles">
          <div className="warehouse__title warehouse__title--name">
            <h4>WAREHOUSE</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="warehouse__title warehouse__title--type">
            <h4>ADDRESS</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="warehouse__title warehouse__title--contactName">
            <h4>CONTACT NAME</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="warehouse__title warehouse__title--info">
            <h4>CONTACT INFORMATION</h4>
            <img src={sort} alt="sort" />
          </div>
          <div className="warehouse__title warehouse__title--ations">
            <h4>ACTIONS</h4>
            <img src={sort} alt="sort" />
          </div>
        </div>
        <Warehouses
          list={warehouses}
          titles={[
            "WAREHOUSE",
            "ADDRESS",
            "CONTACT NAME",
            "CONTACT INFORMATION",
          ]}
          fetchList={fetchWarehouses}
          url={url}
          to={"warehouses"}
        />
      </div>
    </div>
  );
};

export default WarehouseList;

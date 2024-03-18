import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WarehouseList.scss";
import SearchLogo from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import Warehouses from "../Warehouses/Warehouses";
import { useNavigate } from "react-router-dom";

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const url = `${process.env.REACT_APP_BACKEND_URL}/warehouses`;
  const [sort_by, setSort_by] = useState("");
  const [order, setOrder] = useState(true);
  const navigate = useNavigate();

  const handleAdd = async () => {
    navigate("/warehouses/add");
  };
  const handleSort = (name) => {
    if (sort_by !== name) {
      setSort_by(name);
      setOrder(true);
    } else {
      setOrder(!order);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(
        `${url}${
          sort_by
            ? `?sort_by=${sort_by}&order_by=${order ? "asc" : "desc"}`
            : ""
        }`
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
    fetchWarehouses(); // eslint-disable-next-line
  }, [sort_by, order]);

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
              +Add New Warehouse
            </button>
          </div>
        </div>
        <div className="warehouse__titles">
          <div className="warehouse__title warehouse__title--name">
            <h4>WAREHOUSE</h4>
            <img
              src={sort}
              alt="sort"
              className="warehouse__sort"
              onClick={() => handleSort("warehouse_name")}
            />
          </div>
          <div className="warehouse__title warehouse__title--type">
            <h4>ADDRESS</h4>
            <img
              src={sort}
              alt="sort"
              className="warehouse__sort"
              onClick={() => handleSort("address")}
            />
          </div>
          <div className="warehouse__title warehouse__title--contactName">
            <h4>CONTACT NAME</h4>
            <img
              src={sort}
              alt="sort"
              className="warehouse__sort"
              onClick={() => handleSort("contact_name")}
            />
          </div>
          <div className="warehouse__title warehouse__title--info">
            <h4>CONTACT INFORMATION</h4>
            <img
              src={sort}
              alt="sort"
              className="warehouse__sort"
              onClick={() => handleSort("contact_email")}
            />
          </div>
          <div className="warehouse__title warehouse__title--ations">
            <h4>ACTIONS</h4>
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

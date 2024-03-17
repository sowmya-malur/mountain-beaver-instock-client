import React from "react";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import "./Warehouses.scss";

export default function Warehouses({ list, titles, fetchList, url, to }) {
  return (
    <div className="wList">
      {list.map((item) => {
        return (
          <WarehouseItem
            titles={titles}
            data={[item[0], item[1], item[2], item[3]]}
            id={item[4]}
            to={to}
            fetchList={fetchList}
            url={url}
            key={item[4]}
          />
        );
      })}
    </div>
  );
}

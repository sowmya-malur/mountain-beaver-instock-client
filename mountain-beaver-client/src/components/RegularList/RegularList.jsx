import React from "react";
import "./RegularList.scss";
import RegularItem from "../RegularItem/RegularItem";

export default function RegularList({ list, titles }) {
  return (
    <table className="tableList">
      <thead>
        <tr>
          {titles.map((title) => (
            <th>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <RegularItem
            data={[
              item.item_name,
              item.category,
              item.status,
              item.quantity,
              item.warehouse_name,
            ]}
            id={item.id}
            to={"inventory"}
            key={item.id}
          />
        ))}
      </tbody>
    </table>
  );
}

import React from "react";
import ListItem from "../ListItem/ListItem";
import "./List.scss";

export default function MobileList({ list, titles }) {
  return (
    <div className="List">
      {list.map((item) => {
        return (
          <ListItem
            titles={titles}
            data={[
              item.item_name,
              item.category,
              item.status,
              item.quantity,
              item.warehouse_name,
            ]}
            warehouseId={item.warehouse_id}
            id={item.id}
            to={"inventory"}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

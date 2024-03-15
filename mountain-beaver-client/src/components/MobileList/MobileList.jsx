import React from "react";
import MobileItem from "../MobileItem/MobileItem";
import "./MobileList.scss";

export default function MobileList({ list, titles }) {
  return (
    <div className="mobileList">
      {list.map((item) => {
        return (
          <MobileItem
            titles={titles}
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
        );
      })}
    </div>
  );
}

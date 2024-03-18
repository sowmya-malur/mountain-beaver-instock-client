import React from "react";
import ListItem from "../ListItem/ListItem";
import "./List.scss";

export default function MobileList({ list, titles, fetchList, url, to }) {
  return (
    <div className="List">
      {list.map((item) => {
        return (
          <ListItem
            titles={titles}
            data={[item[0], item[1], item[2], item[3], item[4]]}
            id={item[5]}
            to={to}
            fetchList={fetchList}
            url={url}
            key={item[5]}
          />
        );
      })}
    </div>
  );
}

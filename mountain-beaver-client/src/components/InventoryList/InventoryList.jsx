import React, { useEffect, useState } from "react";
import axios from "axios";
import MobileList from "../MobileList/MobileList";
import RegularList from "../RegularList/RegularList";

const InventoryList = () => {
  const [Inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/inventories/`
        );
        setInventories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(`Error fetching inventories`, error);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div>
      <h2>Inventories List</h2>
      <MobileList
        list={Inventories}
        titles={["INVENTORY ITEM", "CATEGORY", "STATUS", "QTY", "WAREHOUSE"]}
      />
      {/* <RegularList
        list={Inventories}
        titles={[
          "INVENTORY ITEM",
          "CATEGORY",
          "STATUS",
          "QTY",
          "WAREHOUSE",
          "ACTIONS",
        ]}
      /> */}
    </div>
  );
};

export default InventoryList;

import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";

const WarehouseDetailsPage = () => {
  const { warehouseId } = useParams(); // Adjust to use inventoryId from the route

  return (
    <div>
      <WarehouseInventoryList warehouseId={warehouseId} />
    </div>
  );
};

export default WarehouseDetailsPage;

import InventoryList from "../../components/InventoryList/InventoryList";
import "./InventoryPage.scss";

const InventoryPage = () => {
  return (
    <div className="inventoryPage">
      <InventoryList
        titles={["INVENTORY ITEM", "CATEGORY", "STATUS", "QTY", "WAREHOUSE"]}
      />
    </div>
  );
};

export default InventoryPage;

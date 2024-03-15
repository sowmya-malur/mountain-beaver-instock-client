import AddWarehousePage from "../AddWarehousePage/AddWarehousePage";
import EditWarehousePage from "../EditWarehousePage/EditWarehousePage";
import InventoryDetails from "../InventoryDetails/InventoryDetails";
// TODO: Placeholder content to test the app. Replace with WareHousesPage
function HomePage() {
  //TODO: remove this code when integrating
  const warehouse = {
    id: 30,
    warehouse_name: "Manhattan",
    address: "503 Broadway",
    city: "New York",
    country: "USA",
    contact_name: "Parmin Aujla",
    contact_position: "Warehouse Manager",
    contact_phone: "+1 (646) 123-1234",
    contact_email: "paujla@instock.com",
  };
    return (
        <>
          <main className="main">
            {/* <AddWarehousePage/> */}
            <InventoryDetails inventoryId={2}/>
            {/* <EditWarehousePage warehouse={warehouse}/> */}
          </main>
        </>
    );
}

export default HomePage;

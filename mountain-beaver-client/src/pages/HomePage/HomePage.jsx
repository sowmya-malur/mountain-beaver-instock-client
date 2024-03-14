import AddWarehousePage from "../AddWarehousePage/AddWarehousePage";
import InventoryDetails from "../InventoryDetails/InventoryDetails";
// TODO: Placeholder content to test the app. Replace with WareHousesPage
function HomePage() {
    return (
        <>
          <main className="main">
            {/* <AddWarehousePage/> */}
            <InventoryDetails inventoryId={25}/>
          </main>
        </>
    );
}

export default HomePage;

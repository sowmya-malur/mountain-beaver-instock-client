import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// Import Components
import EditInventoryItem from "./pages/EditInventoryItemPage/EditInventoryItemPage";
import AddInventoryItemPage from "./pages/AddInventoryItemPage/AddInventoryItemPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import EditWarehousePage from "./pages/EditWarehousePage/EditWarehousePage";
import InventoryDetails from "./pages/InventoryDetails/InventoryDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WarehousesPage />} />
          <Route path="/warehouses" element={<WarehousesPage />} />
          <Route
            path="/warehouses/:warehouseId"
            element={<WarehouseDetailsPage />}
          />

          <Route path="/warehouses/add" element={<AddWarehousePage />} />
          <Route
            path="/warehouses/:warehouseId/edit"
            element={<EditWarehousePage />}
          />

          <Route path="/inventory" element={<InventoryPage />} />
          <Route
            path="/inventory/:inventoryId"
            element={<InventoryDetails />}
          />
          <Route path="/inventory/add" element={<AddInventoryItemPage />} />
          <Route
            path="/inventory/:warehouseId/:inventoryId/edit"
            element={<EditInventoryItem />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// Import Components
import HomePage from "./pages/HomePage/HomePage";
import EditInventoryItem from "./pages/EditInventoryItemPage/EditInventoryItemPage";
import AddInventoryItemPage from "./pages/AddInventoryItemPage/AddInventoryItemPage";
import WarehouseDetailsPage from './pages/WarehouseDetailsPage/WarehouseDetailsPage';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import EditWarehousePage from './pages/EditWarehousePage/EditWarehousePage';
import InventoryDetails from './pages/InventoryDetails/InventoryDetails';
import Modal from './'
function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/" element={<WarehousesPage />} /> */}
          {/* <Route path="/warehouses" element={<WarehousesPage />} /> */}
          {/* <Route path="/warehouses/:warehouseId" element={<WarehouseDetailsPage />} />
          <Route path="/add" element={<AddWarehousePage/>}/>
          <Route path="/edit/:warehouseId" element={<EditWarehousePage/>}/> */}
          <Route path="/inventory" element={<InventoryPage />} />
          {/* <Route path="/inventory/add" element={<AddInventoryItemPage />} />
          <Route path="/inventory/edit/:inventoryId" element={<EditInventoryItem />} />
          <Route path="/inventory/:inventoryId" element={<InventoryDetails />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

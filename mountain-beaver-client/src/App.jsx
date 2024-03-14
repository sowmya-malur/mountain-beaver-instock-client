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

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/api/warehouses" element={<WarehousesPage />} />
          <Route path="/api/inventories" element={<InventoryPage />} />

          <Route path="/api/inventories" element={<AddInventoryItemPage />} />
          <Route path="/api/inventories" element={<EditInventoryItem />} />

           
           <Route path="/api/warehouses/:warehouseId" element={<WarehouseDetailsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

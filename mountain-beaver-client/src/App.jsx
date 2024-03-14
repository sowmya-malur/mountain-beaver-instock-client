import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import EditInventoryItem from "./pages/Edit-inventory-item/Edit-inventory-item";

// Import Components
import HomePage from "./pages/HomePage/HomePage";

import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
function App() {

  const [warehouseId, setWarehouseId] = useState(null);


  const [Inventory, setInventoryID] = useState(null);


  return (
    <div className="App">
      <BrowserRouter className="body-copy">
        <Header />
        <EditInventoryItem />
        <Routes>
           
           <Route path="/" element={<WarehousesPage />} /> 

           <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

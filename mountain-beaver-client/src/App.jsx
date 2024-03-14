import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";
// Import Components
import HomePage from "./pages/HomePage/HomePage";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import EditInventoryItem from "./pages/EditInventoryItemPage/EditInventoryItemPage";
import AddInventoryItemPage from "./pages/AddInventoryItemPage/AddInventoryItemPage";

import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
function App() {

  const [warehouseId, setWarehouseId] = useState(null);

  useEffect(() => {
    const fetchWarehouseId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/warehouses/');
        setWarehouseId(response.data.warehouseId); 
      } catch (error) {
        console.error('Failed to fetch Warehouse ID:', error);
      }
    };
    fetchWarehouseId();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <EditInventoryItem />
<<<<<<< HEAD
//           <Route path="/" element={<WarehousesPage />} /> 
//           <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
=======
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<WarehousesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
>>>>>>> 6707eeeba3529a9e7436b13b11c40b57105e6366
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

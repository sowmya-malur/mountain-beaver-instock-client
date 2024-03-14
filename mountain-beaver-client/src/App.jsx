import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";
// Import Components
import HomePage from "./pages/HomePage/HomePage";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import EditInventoryItem from "./pages/EditInventoryItemPage/EditInventoryItemPage";
import AddInventoryItemPage from "./pages/AddInventoryItemPage/AddInventoryItemPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <EditInventoryItem />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<WarehousesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// Import Components
import HomePage from "./pages/HomePage/HomePage";
import EditInventoryItem from "./pages/EditInventoryItemPage/EditInventoryItemPage";
import AddInventoryItemPage from "./pages/AddInventoryItemPage/AddInventoryItemPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<WarehousesPage />} /> */}
          {/* <Route path="/inventory" element={<InventoryPage />} /> */}
          <Route path="/inventory" element={<AddInventoryItemPage />} />
          <Route path="/inventory" element={<EditInventoryItem />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

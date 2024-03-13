import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";
import EditInventoryItem from "./pages/Edit-inventory-item/Edit-inventory-item";

function App() {
  return (
    <div className="App">
      <BrowserRouter className="body-copy">
        <Header />
        <EditInventoryItem />
        <Routes>
          {/* <Route path="/inventory" element={<InventoryPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

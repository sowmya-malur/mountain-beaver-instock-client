import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

// Import Components
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter className="body-copy">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<WarehousesPage />} /> Pass videos as prop if needed */}
          {/* <Route path="/inventory" element={<InventoryPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

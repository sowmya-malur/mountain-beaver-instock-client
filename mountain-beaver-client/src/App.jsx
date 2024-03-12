
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (

    <div className="App">
    <BrowserRouter className='body-copy'>
    <Header />
        <Routes>
//           <Route path="/" element={<WarehousesPage />} /> {/* Pass videos as prop if needed */}
//           <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
        <Footer />
     </BrowserRouter>
    </div>
  );
}

export default App;

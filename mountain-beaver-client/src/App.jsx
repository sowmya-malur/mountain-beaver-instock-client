import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <div className="App">
    <BrowserRouter className='body-copy'>
    <Header />
        <Routes>
//           <Route path="/" element={<WarehousesPage />} /> {/* Pass videos as prop if needed */}
//           <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

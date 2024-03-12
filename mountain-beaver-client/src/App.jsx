import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage'
import InventoryPage from './pages/InventoryPage/InventoryPage';


function App() {


  return (
    <div className='body-copy'>
      <Router>

        <Routes>
          <Route path="/" element={<WarehousesPage />} /> {/* Pass videos as prop if needed */}
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
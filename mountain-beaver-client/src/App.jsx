import './App.scss';

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

import './App.scss';

// Import Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Placeholder for Header */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* Placeholder for Footer */}
      </BrowserRouter>
    </div>
  );
}

export default App;

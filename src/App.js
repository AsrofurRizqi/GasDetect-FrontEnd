import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// import pages
import Navbar from './components/navbar';
import Landing from './pages/landingpage';
import Login from './pages/login';
import Data from './pages/data';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/data" element={<Data/>}/>
      </Routes>  
    </Router>
  );
}

export default App;

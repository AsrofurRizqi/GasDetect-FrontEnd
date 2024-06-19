import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// import pages
import Navbar from './components/navbar';
import Landing from './pages/landingpage';
import Login from './pages/loginpage';
import Data from './pages/data';
import Dashboard from "./pages/dashboard";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>  
    </Router>
  );
}

export default App;

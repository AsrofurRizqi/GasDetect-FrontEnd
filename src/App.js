import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// import pages

import Landing from './pages/landingpage';
import LoginPage from './pages/loginpage';
import DataPage from './pages/datapage';
import Dashboard from "./pages/dashboard";
import About from "./pages/aboutpage";

import Layout from "./components/admin/layout/layout";
import DashboardAdmin from "./pages/admin/dashboardAdmin";
import VerifyUsers from "./components/admin/users/users";
import NotifPage from "./pages/admin/notifpage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/data" element={<DataPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About/>}/>

        <Route  element={<Layout/>}>
          <Route path="/admin" element={<DashboardAdmin/>}/>
          <Route path="/admin/users" element={<VerifyUsers/>}/>
          <Route path="/admin/notif" element={<NotifPage/>}/>
        </Route>
      </Routes>  
    </Router>
  );
}

export default App;

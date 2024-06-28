import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// import pages

import Landing from './pages/landingpage';
import LoginPage from './pages/loginpage';
import DataPage from './pages/datapage';
import Dashboard from "./pages/dashboard";
import About from "./pages/aboutpage";
import Contact from "./pages/contact";
import Products from "./pages/products";

import LayoutAdmin from "./components/admin/layout/layout";
import DashboardAdmin from "./pages/admin/dashboardAdmin";
import Registration from "./components/admin/regis/registration";
import VerifyUsers from "./components/admin/users/users";
import NotifPage from "./pages/admin/notifpage";

import LayoutUser from "./components/user/layout/layout";
//import DashboardUser from "./pages/users/dashboardUsers";

import ProtectedRoute from "./components/protectedroute";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/data" element={<DataPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/products" element={<Products/>}/>

        <Route  element={<LayoutAdmin/>}>
          <Route path="/admin" element={<ProtectedRoute element={DashboardAdmin} />}/>
          <Route path="/admin/registration" element={<ProtectedRoute element={Registration} />}/>
          <Route path="/admin/users" element={<ProtectedRoute element={VerifyUsers} />}/>
          <Route path="/admin/notif" element={<ProtectedRoute element={NotifPage} />}/>
        </Route>
      </Routes>  
    </Router>
  );
}

export default App;

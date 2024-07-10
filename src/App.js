import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

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
import Report from "./components/admin/report/report";
import NotifPage from "./pages/admin/notifpage";

import LayoutUser from "./components/user/layout/layout";
import DashboardUser from "./pages/users/dashboardUsers";
import Profile from "./components/user/profile/profile";
import UserDevice from "./components/user/device/device";
import UserDeviceData from "./components/user/device/devicedata";
import UserReport from "./components/user/report/report";
import UserNotif from "./components/user/notif/notif";

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
          <Route path="/admin/report" element={<ProtectedRoute element={Report} />}/>
          <Route path="/admin/notif" element={<ProtectedRoute element={NotifPage} />}/>
        </Route>

        <Route  element={<LayoutUser/>}>
          <Route path="/user" element={<ProtectedRoute element={DashboardUser} />}/>
          <Route path="/user/profiles" element={<ProtectedRoute element={Profile} />}/>
          <Route path="/user/notif" element={<ProtectedRoute element={UserNotif} />}/>
          <Route path="/user/devices" element={<ProtectedRoute element={UserDevice} />}/>
          <Route path="/user/reports" element={<ProtectedRoute element={UserReport} />}/>
          <Route path="/user/devicedata" element={<ProtectedRoute element={UserDeviceData} />}/>
        </Route>
      </Routes>  
    </Router>
  );
}

export default App;

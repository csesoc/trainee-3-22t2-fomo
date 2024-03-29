import './App.css';
import FrontGeneral from './components/NavBar/FrontGeneral'; 
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import ResetReq from './components/ResetPassword/ResetReq';
import ResetRes from './components/ResetPassword/ResetRes'; 
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { AdminProvider } from './context/AdminProvider';
import { Routes, Route } from 'react-router-dom';
import FrontAdmin from './components/NavBar/FrontAdmin';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpasswordreq" element={<ResetReq />} />
        <Route path="/resetpasswordres/:token" element={<ResetRes />} />
        <Route path="/" element={<FrontGeneral />} />
        {/* protect the following routes */}
        <Route element={<RequireAuth />}>
          {/* Replace below element with the society/admin version!!!!*/}
          <Route 
            path="/admin" 
            element={
              <AdminProvider>
                <FrontAdmin />  
              </AdminProvider>
            } 
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

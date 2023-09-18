import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';
import { DataContext } from './context/DataContext';

import './App.css';
import '@tremor/react/dist/esm/tremor.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Admin from './pages/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [inventory, setInventory] = useState(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <UserContext.Provider value={{ user, setUser }}>
        <DataContext.Provider value={{ inventory, setInventory }}>
          <BrowserRouter>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route
                path="/login"
                element={
                  <div className="font-primary">
                    <Login />
                  </div>
                }
              ></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/reports" element={<Reports />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
            </Routes>
          </BrowserRouter>
        </DataContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

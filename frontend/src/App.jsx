import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import './App.css';
import '@tremor/react/dist/esm/tremor.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
import Message from './pages/Message';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Admin from './pages/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
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
          <Route path="/message" element={<Message />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/reports" element={<Reports />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

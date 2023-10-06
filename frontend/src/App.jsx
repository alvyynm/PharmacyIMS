import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';
import { DataContext } from './context/DataContext';
import { ArchiveContext } from './context/ArchiveContext';
import { UsersContext } from './context/UsersContext';

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
import PasswordResetRequest from './pages/PasswordResetRequest';
import ResetEmailSend from './pages/PasswordResetRequest/ResetEmailSend';
import PasswordReset from './pages/PasswordReset';
import Archive from './pages/Archive';
import Error from './pages/Error';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [archive, setArchive] = useState(null);
  const [users, setUsers] = useState(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <UserContext.Provider value={{ user, setUser }}>
        <DataContext.Provider value={{ inventory, setInventory }}>
          <ArchiveContext.Provider value={{ archive, setArchive }}>
            <UsersContext.Provider value={{ users, setUsers }}>
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
                  <Route path="/archive" element={<Archive />}></Route>
                  <Route path="/requestpasswordreset" element={<PasswordResetRequest />}></Route>
                  <Route path="passwordresetemail" element={<ResetEmailSend />}></Route>
                  <Route path="passwordReset" element={<PasswordReset />}></Route>
                  <Route path="*" element={<Error />}></Route>
                </Routes>
              </BrowserRouter>
            </UsersContext.Provider>
          </ArchiveContext.Provider>
        </DataContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import '@tremor/react/dist/esm/tremor.css';

import Dashboard from './pages/Dashboard';
import Message from './pages/Message';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
  );
}

export default App;

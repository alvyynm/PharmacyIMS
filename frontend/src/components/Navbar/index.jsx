import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

// Dashboard icons
import dashboardIcon from '../../assets/icons/dashboard.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import archiveIcon from '../../assets/icons/archive.svg';
import settingsIcon from '../../assets/icons/setting.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import salesIcon from '../../assets/icons/salesicon.png';

export default function index() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);

    //redirect to login page
    Navigate('/login');
  };

  // check if user is Admin
  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  return (
    <aside className="w-[248px] h-[100vh] bg-white">
      <div className="w-[200px] h-[100vh] py-8 pl-6">
        <header className="mb-8">
          <a href="/dashboard">
            <img src={logo} alt="Motiv company logo" className="w-[40px]" />
          </a>
        </header>
        <nav className="flex flex-col justify-between h-[85vh]">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/dashboard"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={dashboardIcon} alt="" /> Dashboard
              </Link>
            </li>
            {isAdmin() && (
              <li>
                <Link
                  to="/admin"
                  className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
                >
                  <img src={assetsIcon} alt="" />
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/reports"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={calendarIcon} alt="" />
                Reports
              </Link>
            </li>
            <li>
              <Link
                to="/sales"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={salesIcon} alt="" />
                Sales
              </Link>
            </li>
            <li>
              <Link
                to="/archive"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={archiveIcon} alt="" />
                Archive
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/settings"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={settingsIcon} alt="settings icon" />
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={logoutIcon} alt="log out icon" />
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

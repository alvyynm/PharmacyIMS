import React from 'react';
import { Link } from 'react-router-dom';
import motivLogo from '../../assets/logo.svg';

// Dashboard icons
import dashboardIcon from '../../assets/icons/dashboard.svg';
import assetsIcon from '../../assets/icons/steering.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import messagesIcon from '../../assets/icons/comment.svg';
import settingsIcon from '../../assets/icons/setting.svg';
import logoutIcon from '../../assets/icons/logout.svg';

export default function index() {
  return (
    <aside className="w-[248px] h-[100vh] bg-white">
      <div className="w-[200px] h-[100vh] py-8 pl-6">
        <header className="mb-8">
          <a href="/dashboard">
            <img src={motivLogo} alt="Motiv company logo" className="w-[140px]" />
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
            <li>
              <Link
                to="/admin"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={assetsIcon} alt="" />
                Admin
              </Link>
            </li>
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
                to="/message"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={messagesIcon} alt="" />
                Messages
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
              <Link
                to="/login"
                className="flex justify-start gap-3 px-6 py-3 hover:bg-custom-white text-light-gray rounded"
              >
                <img src={logoutIcon} alt="log out icon" />
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

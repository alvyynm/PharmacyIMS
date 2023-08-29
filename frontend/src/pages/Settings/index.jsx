import React, { useContext } from 'react';
import { Button, Space } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import profileimage from '../../assets/profile.jpg';
function index() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);

  const handleProfileUpdate = () => {
    // logic here
  };

  const handlePasswordChange = () => {
    // logic here
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);

    //redirect to login page
    navigate('/login');
  };

  if (!isLoggedIn) {
    //redirect to login page if unauthenticated
    return <Navigate replace to="/login" />;
  } else {
    return (
      <section className="relative">
        <div className="grid grid-cols-6 grid-rows-1 gap-12">
          {/* Fixes nav to the left avoid overscroll */}
          <div className="h-screen sticky top-0">
            <Navbar />
          </div>
          <main className="col-span-5">
            {/* Positions topbar to be sticky at the top on scroll */}
            <div className="sticky top-0 left-0 right-0 z-50 bg-white">
              <Topbar />
            </div>
            <h1 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Account settings
            </h1>
            <div className="ml-4 w-4/5 border rounded-xl p-4">
              <div>
                <div className="flex items-center gap-7 justify-end">
                  <button
                    onClick={handleProfileUpdate}
                    className="flex w-48 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit account details
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="flex w-48 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Change password
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-start h-72">
                <div className="ml-12 mr-24">
                  <img src={profileimage} alt="" className="rounded-3xl overflow-hidden w-36" />
                </div>
                <div className="flex-col flex gap-10 justify-around">
                  <p className="text-lg font-semibold leading-6 text-gray-900">
                    Name: <span className="font-normal">{user ? user.name : 'User'}</span>
                  </p>
                  <p className="text-lg font-semibold leading-6 text-gray-900">
                    Email: <span className="font-normal">{user ? user.email : 'User'} </span>
                  </p>
                  <p className="text-lg font-semibold leading-6 text-gray-900">
                    Role: <span className="font-normal">{user ? user.role : 'User'}</span>
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="flex w-48 justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    );
  }
}

export default index;

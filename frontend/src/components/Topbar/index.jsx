import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

// Images
import notificationIcon from '../../assets/icons/notification.svg';
import profileimage from '../../assets/profile.jpg';

export default function index() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex justify-between py-4 px-8">
      <div className="flex items-center justify-center w-1/2 ">
        <h2 className=" text-2xl text-right font-bold leading-9 tracking-tight text-gray-900">
          Welcome {user ? user.name : 'User'}{' '}
        </h2>
      </div>

      <div className="flex place-items-center gap-8">
        <div>
          <button className="flex">
            <img src={notificationIcon} alt="" />
          </button>
        </div>
        <div>
          <button className="flex">
            <img src={profileimage} alt="" className="rounded-3xl overflow-hidden" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

// Images
import notificationIcon from "../../assets/icons/notification.svg";
import profileimage from "../../assets/profile.jpg";

export default function index() {
  return (
    <div className="flex justify-between py-4 px-8">
      <form className="flex items-center w-1/3 ">
        <label for="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search or type"
            required
          />
        </div>
      </form>

      <div className="flex place-items-center gap-8">
        <div>
          <button className="flex">
            <img src={notificationIcon} alt="" />
          </button>
        </div>
        <div>
          <button className="flex">
            <img
              src={profileimage}
              alt=""
              className="rounded-3xl overflow-hidden"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

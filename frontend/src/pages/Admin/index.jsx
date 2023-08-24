import React from 'react';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

// Images
import cartopview from '../../assets/car-top-view-a.png';

import { AreaChart } from '@tremor/react';

function index() {
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

          <div className="p-8 bg-neutral-100">
            <h1 className="text-[#242731] text-3xl font-bold mb-5">Admin Settings</h1>
            <div className="grid grid-rows-1 grid-cols-3 gap-6">
              {/* Big car card */}
              <div className="w-[361px] py-8 px-6 rounded-xl bg-[#438FFE]">
                <div className="mb-12">
                  <div className="grid grid-cols-2 grid-rows-1 gap-2">
                    <div className="border-r-2 border-[#579BFF]">
                      <h2 className=" text-[#C6DCFC] font-medium">Fuel Usage</h2>
                      <p className="text-xl text-white font-bold">2903.89 Ltr</p>
                    </div>
                    <div className="ml-5">
                      <h2 className="text-[#C6DCFC] font-medium">KM driven</h2>
                      <p className="text-xl text-white font-bold">3038</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 grid-rows-1 gap-2 mt-5">
                    <div className="border-r-2 border-[#579BFF]">
                      <h2 className="text-[#C6DCFC] font-medium">Total Cost</h2>
                      <p className="text-xl text-white font-bold">$3,00,290.00</p>
                    </div>
                    <div className="ml-5">
                      <h2 className="text-[#C6DCFC] font-medium">Top Speed</h2>
                      <p className="text-xl text-white font-bold">360km/h</p>
                    </div>
                  </div>
                </div>

                <div className=" h-[400px] relative">
                  <div className="absolute bottom-[-200px] ">
                    <img src={cartopview} alt="A view of a car from the top" />
                  </div>
                </div>
              </div>
              {/* Big car card ends */}

              <div className="col-span-2">
                <div className="grid grid-cols-1 grid-rows-3 gap-5">
                  <div className=" h-[314px] bg-yellow-300 rounded-xl">Activities</div>
                  <div className="grid grid-cols-2 grid-rows-1 gap-6 lg:gap-20">
                    <div className="h-[314px] bg-yellow-300 rounded-xl">Notices</div>
                    <div className="h-[314px] bg-yellow-300 rounded-xl">Available sensors</div>
                  </div>
                  <div className=" h-[314px] bg-yellow-300 rounded-xl">Reminders</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default index;

import React from 'react';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

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
          <div className="h-screen flex flex-col items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <h1 className="mt-5">Sales data</h1>
          </div>
        </main>
      </div>
    </section>
  );
}

export default index;

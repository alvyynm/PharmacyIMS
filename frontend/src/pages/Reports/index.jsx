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
          <h1>Reports</h1>
        </main>
      </div>
    </section>
  );
}

export default index;

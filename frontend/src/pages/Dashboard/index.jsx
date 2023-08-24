import React from "react";
import Navbar from "../../components/Navbar";
import Topbar from "../../components/Topbar";

//Icons
import energyIcon from "../../assets/icons/energy.svg";
import rangeIcon from "../../assets/icons/range.svg";
import brakeIcon from "../../assets/icons/brake.svg";
import wearIcon from "../../assets/icons/wear.svg";
import energychart from "../../assets/icons/energychart.svg";
import rangechart from "../../assets/icons/rangechart.svg";
import brakechart from "../../assets/icons/brakechart.svg";
import wearchart from "../../assets/icons/wearchart.svg";
import recommend from "../../assets/icons/recommend.svg";
import reshare from "../../assets/icons/reshare.svg";
import setting from "../../assets/icons/setting.png";
import light from "../../assets/icons/light.svg";

// Car images
import minicooper from "../../assets/minicooper.png";
import bmwminicooper from "../../assets/suzukiswift.png";
import suzukiswift from "../../assets/bmwminicooper.png";

// Tremor imports for charts
import { Card, Title, BarChart, Subtitle, LineChart } from "@tremor/react";

const milesdata = [
  {
    name: "1 PM",
    Miles: 2488,
  },
  {
    name: "2 PM",
    Miles: 1445,
  },
  {
    name: "3 PM",
    Miles: 1600,
  },
  {
    name: "4 PM",
    Miles: 1200,
  },
  {
    name: "5 PM",
    Miles: 1900,
  },
  {
    name: "6 PM",
    Miles: 1643,
  },
  {
    name: "7 PM",
    Miles: 743,
  },
];

const carsalesdata = [
  {
    year: 2018,
    Sales: 1.4,
  },
  {
    year: 2019,
    Sales: 2.93,
  },
  {
    year: 2020,
    Sales: 2.89,
  },
  {
    year: 2021,
    Sales: 4.98,
  },
  {
    year: 2022,
    Sales: 6,
  },
  {
    year: 2023,
    Sales: 6.3,
  },
  {
    year: 2024,
    Sales: 7.2,
  },
  {
    year: 2025,
    Sales: 7.1,
  },
  {
    year: 2026,
    Sales: 8,
  },
];

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}M`;

function index() {
  return (
    <section className="relative">
      <div className="grid grid-cols-6 grid-rows-1 gap-7">
        {/* Fixes nav to the left avoid overscroll */}
        <div className="h-screen sticky top-0">
          <Navbar />
        </div>
        <main className="col-span-5">
          {/* Positions topbar to be sticky at the top on scroll */}
          <div className="sticky top-0 left-0 right-0 z-50 bg-white">
            <Topbar />
          </div>
          <div className="flex flex-col gap-8 p-8 bg-neutral-100">
            <div className="flex justify-between gap-8">
              {/* Cards */}
              <div className=" flex flex-col justify-evenly place-items-center bg-custom-purple w-60 h-64 rounded-2xl">
                <div>
                  <img src={energyIcon} alt="" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-2xl">Energy</h2>
                </div>
                <div>
                  <img src={energychart} alt="" />
                </div>
              </div>
              <div className=" flex flex-col justify-evenly place-items-center bg-white w-60 h-64 rounded-2xl">
                <div>
                  <img src={rangeIcon} alt="" />
                </div>
                <div>
                  <h2 className="text-custom-black font-bold text-2xl">
                    Range
                  </h2>
                </div>
                <div>
                  <img src={rangechart} alt="" />
                </div>
              </div>
              <div className=" flex flex-col justify-evenly place-items-center bg-white w-60 h-64 rounded-2xl">
                <div>
                  <img src={brakeIcon} alt="" />
                </div>
                <div>
                  <h2 className="text-custom-black font-bold text-2xl">
                    Brake Fluid
                  </h2>
                </div>
                <div>
                  <img src={brakechart} alt="" />
                </div>
              </div>
              <div className=" flex flex-col justify-evenly place-items-center bg-white w-60 h-64 rounded-2xl">
                <div>
                  <img src={wearIcon} alt="" />
                </div>
                <div>
                  <h2 className="text-custom-black font-bold text-2xl">
                    Tire Wear
                  </h2>
                </div>
                <div>
                  <img src={wearchart} alt="" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-8">
              <div className="rounded-2xl overflow-hidden">
                <Card>
                  <Title>
                    {" "}
                    <h2 className="text-xl inline font-bold">Miles</h2>{" "}
                    Statistics
                  </Title>
                  <BarChart
                    data={milesdata}
                    dataKey="name"
                    categories={["Miles"]}
                    colors={["CornflowerBlue"]}
                    marginTop="mt-6"
                    yAxisWidth="w-12"
                    showYAxis={false}
                    showGridLines={false}
                  />
                </Card>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <Card>
                  <Title>
                    <h2 className="text-xl inline font-bold">Car</h2> Statistics
                  </Title>
                  <Subtitle>Cars Sales per year</Subtitle>
                  <LineChart
                    data={carsalesdata}
                    dataKey="year"
                    categories={["Sales"]}
                    colors={["orange"]}
                    valueFormatter={dataFormatter}
                    marginTop="mt-0"
                    height="h-80"
                    yAxisWidth="w-12"
                    showYAxis={false}
                  />
                </Card>
              </div>
            </div>
            {/* Car section starts */}
            <div>
              <h2 className="text-3xl font-bold flex place-items-center gap-2 mb-5">
                Hot Deals{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#E25822"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                  />
                </svg>
              </h2>
              <div className=" grid grid-cols-3 grid-rows-4 gap-5">
                {/* Car cards */}
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#E1DFA4] py-4 px-7 rounded-xl">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 64% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={minicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Mini Cooper
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#E3ECF1] py-4 px-7 rounded-xl ">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 74% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={bmwminicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      BMW Sedan
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#F4E3E5] py-4 px-7 rounded-xl ">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 74% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={suzukiswift} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Suzuki Swift
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#F0CAA3] py-4 px-7 rounded-xl">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 64% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={minicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Mini Cooper
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#DEF5E5] py-4 px-7 rounded-xl ">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 74% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={bmwminicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      BMW Sedan
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#DEBACE] py-4 px-7 rounded-xl">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 64% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={minicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Mini Cooper
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#E1DFA4] py-4 px-7 rounded-xl">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 64% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={minicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Mini Cooper
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#FFE3E1] py-4 px-7 rounded-xl ">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 74% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={suzukiswift} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Suzuki Swift
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#E1DFA4] py-4 px-7 rounded-xl">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 64% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={minicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Mini Cooper
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#F4E3E5] py-4 px-7 rounded-xl ">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 74% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={suzukiswift} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Suzuki Swift
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#E1DFA4] py-4 px-7 rounded-xl">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 64% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={minicooper} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Mini Cooper
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[320px] h-60 flex flex-col justify-between bg-[#F4E3E5] py-4 px-7 rounded-xl ">
                  <div>
                    <h2 className="font-bold flex gap-3">
                      {" "}
                      <img src={recommend} alt="" /> 74% Recommended
                    </h2>
                  </div>
                  <div>
                    <img src={suzukiswift} alt="Minicooper" />
                  </div>
                  <div>
                    <h3 className="text-custom-black text-xl font-bold mb-2">
                      Suzuki Swift
                    </h3>
                    <div className="flex justify-between text-custom-gray2">
                      <div className="flex gap-4">
                        <img src={reshare} alt="" />
                        <p>132K</p>
                        <img src={setting} alt="" />
                        <img src={light} alt="" />
                      </div>
                      <div>
                        <p>$32/h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Car section ends */}
          </div>
        </main>
      </div>
    </section>
  );
}

export default index;

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Table, Button, DatePicker, Input } from 'antd';
import moment from 'moment';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { ArchiveContext } from '../../context/ArchiveContext';
import { useReactToPrint } from 'react-to-print';
const { RangePicker } = DatePicker;
import logo from '../../assets/logo.png';

function index() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { archive, setArchive } = useContext(ArchiveContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(archive);

  const [filteredQData, setFilteredQData] = useState(archive);
  const [filterValue, setFilterValue] = useState('');

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    // API call to retrieve archive data from database
    axios
      .get('http://localhost:3001/v1/archiveProducts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArchive(response.data.products);
        console.log(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token]);

  // ARCHIVE DATA FILTER
  const handleDateFilter = () => {
    const filteredResult = archive.filter((item) => {
      const itemDate = moment(item.archiveDate);
      if (startDate && endDate) {
        console.log(startDate, endDate);
        return itemDate.isBetween(startDate, endDate, null, '[]');
      }
      return true; // No date range selected, show all data
    });
    setFilteredData(filteredResult);
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredData(archive);
  };

  // Quantity filter
  const handleFilter = () => {
    console.log('method running', filterValue);
    const filteredResult = archive.filter((record) => {
      if (record.quantityInStock < parseFloat(filterValue)) {
        return record;
      }
    });
    setFilteredData(filteredResult);
  };

  const clearFilter = () => {
    setFilterValue('');
    setFilteredData(archive);
  };

  // END OF QUANTITY FILTER

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: ['archiveData', 'name'],
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: ['archiveData', 'category'],
    },
    {
      key: 'unitPrice',
      title: 'Price',
      dataIndex: ['archiveData', 'unitPrice'],
    },
    {
      key: 'quantityInStock',
      title: 'Quantity',
      dataIndex: ['archiveData', 'quantityInStock'],
      sorter: (a, b) => a.quantityInStock - b.quantityInStock,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Enter a number"
            value={filterValue} // Set the input value to filterValue
            onChange={(e) => setFilterValue(e.target.value)} // Update filterValue on input change
            onPressEnter={() => handleFilter()}
          />
          <Button
            type="primary"
            className="bg-indigo-600"
            onClick={() => handleFilter()}
            icon={<i className="fas fa-filter" />}
          >
            Filter
          </Button>
          <Button onClick={() => clearFilter()}>Reset</Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <i className="fas fa-filter" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => {
        console.log(record.value);
        return record.value > parseFloat(value);
      },
    },
    {
      key: 'orderDate',
      title: 'Order Date',
      dataIndex: ['archiveData', 'orderDate'],
      render: (text) => moment(text).format('DD/MM/YY'), // Format the ISO date string
    },
    {
      key: `expiryDate`,
      title: 'Expiry Date',
      dataIndex: ['archiveData', 'expiryDate'],
      render: (text) => moment(text).format('DD/MM/YY'), // Format the ISO date string
      sorter: (a, b) => moment(a.expiryDate).unix() - moment(b.expiryDate).unix(), // Custom sorting function
    },
    {
      key: 'archiveDate',
      title: 'Archive Date',
      dataIndex: 'archiveDate',
      render: (text) => moment(text).format('DD/MM/YY'), // Format the ISO date string
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.archiveDate).unix() - moment(b.archiveDate).unix(), // Custom sorting function
    },
    {
      key: 'creator',
      title: 'Creator',
      dataIndex: 'creator',
    },
  ];

  const currentDate = new Date();

  const currentDateString = currentDate.toISOString().split('T')[0];

  if (!isLoggedIn) {
    //redirect to login page if unauthenticated
    return <Navigate replace to="/login" />;
  } else {
    if (loading) {
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
                <h1 className="mt-5">Loading archive data...</h1>
              </div>
            </main>
          </div>
        </section>
      );
    }

    if (error) {
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
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                </div>
                <h1 className="mt-5">Oops! An error ocurred when retrieving archive data...</h1>
              </div>
            </main>
          </div>
        </section>
      );
    }
    if (archive.length > 0) {
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
                Archived Data
              </h1>
              <div ref={componentRef}>
                <div className="printable-content">
                  {/* Report Header */}
                  <div className="flex justify-center font-bold">
                    <img className="w-32" src={logo} alt="Logo" />
                  </div>
                  <div className="flex justify-center content-center gap-5 my-4 font-bold">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-3xl uppercase underline">Ascend Pharmacy Utawala</h1>
                      <div>Address: P.O BOX 86 - 0100, Nairobi Kenya</div>
                      <div> Phone: +25470000000 | Email: ascendpharmacy@gmail.com</div>
                      <h1 className="text-2xl">Inventory Report</h1>
                      <hr />
                      <p>Report date: {currentDateString.toString()} </p>
                    </div>
                  </div>
                  <Table dataSource={filteredData} columns={columns} pagination={false} />

                  {/* Report Footer */}
                  <div className="my-5">
                    <p className="text-xl flex justify-center">
                      Ascend Pharmacy Utawala &copy; {currentDateString.split('-')[0]}
                    </p>
                  </div>
                </div>
                {/* <Table dataSource={filteredData} columns={columns} pagination={false} /> */}
              </div>
              {/* PRINT DATA DIV */}
              <div className="m-3">
                <p className="mb-3">Filter by archiveDate: </p>
                <RangePicker
                  style={{ marginRight: 8 }}
                  onChange={(dates) => {
                    console.log(dates);
                    if (dates && dates.length === 2) {
                      setStartDate(dates[0].$d.toISOString());
                      setEndDate(dates[1].$d.toISOString());
                      console.log(startDate);
                      console.log(endDate);
                    }
                  }}
                />
                <Button className="bg-indigo-600" type="primary" onClick={handleDateFilter}>
                  Filter
                </Button>
                <Button onClick={clearDateFilter}>Reset</Button>
              </div>
              <div>
                <button
                  onClick={() => {
                    console.log('printed pdf');
                    handlePrint();
                  }}
                  className="flex w-48 my-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Print report
                </button>
              </div>
            </main>
          </div>
        </section>
      );
    }
  }
}

export default index;

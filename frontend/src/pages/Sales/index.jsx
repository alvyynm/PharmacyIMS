import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Row, Col, Button, DatePicker } from 'antd';
import { Navigate } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker;
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { AuthContext } from '../../context/AuthContext';
import { SalesContext } from '../../context/SalesContext';

function index() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { sales, setSales } = useContext(SalesContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(sales);

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    // API call to retrieve sales data from database
    axios
      .get('http://localhost:3001/v1/sales', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSales(response.data.sales);
        console.log(response.data.sales);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token]);

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const currentYear = currentDate.getFullYear();
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
  let totalSales = 0;
  let totalDailySales = 0;
  let totalMonthlySales = 0;
  if (sales) {
    // calculate total sales
    totalSales = sales.reduce((sum, obj) => sum + obj.saleValue, 0);

    // Calculate total sales within the current month
    totalMonthlySales = sales.reduce((sum, obj) => {
      // Parse the saleDate string to a Date object
      const saleDate = new Date(obj.saleDate);

      // Check if the saleDate is within the current month and year
      if (saleDate.getMonth() + 1 === currentMonth && saleDate.getFullYear() === currentYear) {
        return sum + obj.saleValue;
      }

      return sum;
    }, 0);

    // Calculate today's sales
    totalDailySales = sales.reduce((sum, obj) => {
      // Parse the saleDate string to a Date object
      const saleDate = new Date(obj.saleDate);

      // Check if the saleDate is equal to the current date
      if (
        saleDate.getDate() === currentDate.getDate() &&
        saleDate.getMonth() === currentDate.getMonth() &&
        saleDate.getFullYear() === currentDate.getFullYear()
      ) {
        return sum + obj.saleValue;
      }

      return sum;
    }, 0);
  }

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category',
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
    },
    {
      key: 'quantity',
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      key: 'saleValue',
      title: 'Sale Value',
      dataIndex: 'saleValue',
    },
    {
      key: 'saleDate',
      title: 'Sale Date',
      dataIndex: 'saleDate',
      render: (text) => moment(text).format('DD/MM/YY'), // Format the ISO date string
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.saleDate).unix() - moment(b.saleDate).unix(), // Custom sorting function
    },
  ];

  // SALES DATA FILTER
  const handleDateFilter = () => {
    const filteredResult = sales.filter((item) => {
      const itemDate = moment(item.saleDate);
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
    setFilteredData(sales);
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
            {loading ? (
              // loading state
              <Loading />
            ) : error ? (
              // error message if api call fails
              <Error />
            ) : (
              // display data after successful retrieval from api
              <div>
                <div>
                  <div className="my-4">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Card title="Total Sales">KES {totalSales.toLocaleString()}</Card>
                      </Col>
                      <Col span={8}>
                        <Card title={`${currentMonthName} Sales`}>
                          KES {totalMonthlySales.toLocaleString()}
                        </Card>
                      </Col>
                      <Col span={8}>
                        <Card title="Today's Sales">KES {totalDailySales.toLocaleString()}</Card>
                      </Col>
                    </Row>
                  </div>
                  <div className="printable-content">
                    <Table dataSource={filteredData} columns={columns} pagination={false} />
                  </div>
                </div>
                <div className="m-3">
                  <p className="mb-3">Filter by Sales Date: </p>
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
              </div>
            )}
          </main>
        </div>
      </section>
    );
  }
}

export default index;

import React, { useState, useContext, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { employeeData } from '../../data/Employee';
import { Table, Modal, Input } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { UsersContext } from '../../context/UsersContext';

function index() {
  const [Data, setData] = useState(employeeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { users, setUsers } = useContext(UsersContext);

  // Retrieve the token and userId from local storage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // API call to retrieve archive data from database
    axios
      .get(`http://localhost:3001/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
        console.log(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
          setStatus('Not authorized');
          setLoading(false);
        } else {
          setError(error);
          setLoading(false);
        }
      });
  }, [token]);

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      onFilter: (value, record) => {
        return record.name.includes(value);
      },
      filteredValue: [searchTerm],
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      filters: [
        {
          text: 'ADMIN',
          value: 'ADMIN',
        },
        {
          text: 'USER',
          value: 'USER',
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      key: 'action',
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <div className="flex gap-4">
              <EditOutlined style={{ color: 'black' }} onClick={() => Edit(record)} />
              <DeleteOutlined style={{ color: 'red' }} onClick={() => Delete(record)} />
            </div>
          </>
        );
      },
    },
  ];

  const Delete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setData((pre) => {
          return pre.filter((person) => person.id != record.id);
        });
      },
    });
  };

  // Edit user records
  const Edit = (record) => {
    setIsModalOpen(true);
    setEdit({ ...record });
  };

  // Cancel editing and reset data to initial state
  const ResetEditing = () => {
    setEdit(null);
    setIsModalOpen(false);
  };
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
                <h1 className="mt-5">Loading users data...</h1>
              </div>
            </main>
          </div>
        </section>
      );
    }

    if (status) {
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
                <h1 className="my-5">
                  You don't have permission, please contact your admin for assistance
                </h1>
                <div>
                  <Link to={'/dashboard'}>
                    {' '}
                    <button className="flex w-48 justify-center rounded-md mb-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Go to dashboard
                    </button>
                  </Link>
                </div>
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
    if (users.length > 0) {
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
                Employee List
              </h1>
              <div className="flex justify-between mb-4">
                <div>
                  <Input.Search
                    onSearch={(value) => {
                      setSearchTerm(value);
                    }}
                    placeholder="Search for employee"
                    // style={{ borderRadius: '0.5rem', display: 'block' }}
                  />
                </div>
                <button
                  onClick={() => {
                    setIsAddModalOpen(true);
                  }}
                  className="flex w-48 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add new employee
                </button>
              </div>
              <Table dataSource={users} columns={columns} pagination={false} />
              <Modal
                title="Edit Details"
                open={isModalOpen}
                okText="Save"
                onCancel={() => ResetEditing()}
                onOk={() => {
                  setData((pre) => {
                    return pre.map((employee) => {
                      if (employee.id === edit.id) {
                        return edit;
                      } else {
                        return employee;
                      }
                    });
                  });
                  ResetEditing();
                }}
              >
                <Input
                  value={edit?.name}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, name: e.target.value };
                    });
                  }}
                  className="mb-3 rounded-lg"
                />
                <Input
                  value={edit?.email}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, email: e.target.value };
                    });
                  }}
                  className="mb-3 rounded-lg"
                />
                {/* <Input
              value={edit?.address}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, address: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            /> */}
                <Input
                  value={edit?.phone}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, phone: e.target.value };
                    });
                  }}
                  className="mb-3 rounded-lg"
                />
                <Input
                  value={edit?.role}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, role: e.target.value };
                    });
                  }}
                  className="mb-3 rounded-lg"
                />
              </Modal>
            </main>
          </div>
        </section>
      );
    }
  }
}

export default index;

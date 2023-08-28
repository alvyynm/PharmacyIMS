import React, { useState } from 'react';
import { employeeData } from '../../data/Employee';
import { Table, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

function index() {
  const [Data, setData] = useState(employeeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      key: 'phone',
      title: 'Phone Number',
      dataIndex: 'phone',
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
          <Table dataSource={Data} columns={columns} pagination={false} />
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

export default index;

import React, { useState } from 'react';
import { data } from '../../data/Data';
import { Table, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

function index() {
  const [Data, setData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [formData, setFormData] = useState(null);

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend'],
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'address',
    },
    {
      key: 'phone',
      title: 'Phone Number',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone > b.phone,
      sortDirections: ['descend'],
    },
    {
      key: 'website',
      title: 'Website',
      dataIndex: 'website',
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
      title: 'Are you sure you want to delete this data',
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

  // Edit records
  const Edit = (record) => {
    setIsModalOpen(true);
    setEdit({ ...record });
  };

  // Cancel editing and reset data to initial state
  const ResetEditing = () => {
    setEdit(null);
    setIsModalOpen(false);
  };

  // Create new record

  const onAddRecord = (record) => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newRecord = {
      id: randomNumber,
      name: `name`,
      email: `email`,
      address: `address`,
      phone: 123 - 456 - 789,
      website: `website`,
    };
    console.log(newRecord);
    setData((pre) => {
      return [...pre, newRecord];
    });
  };

  // Discard new record
  const onCancelAdd = () => {
    setIsAddModalOpen(false);
    setFormData(null);
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
            List of drugs
          </h1>
          <div>
            <button
              onClick={() => {
                setIsAddModalOpen(true);
              }}
              className="flex w-48 justify-center rounded-md mb-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add new record
            </button>
          </div>
          <Table
            dataSource={Data}
            columns={columns}
            pagination={{ pageSize: 9, total: 50, showSizeChanger: false }}
          />

          {/* Edit record modal */}
          <Modal
            title="Edit Details"
            open={isModalOpen}
            okText="Save"
            onCancel={() => ResetEditing()}
            onOk={() => {
              setData((pre) => {
                return pre.map((student) => {
                  if (student.id === edit.id) {
                    return edit;
                  } else {
                    return student;
                  }
                });
              });
              ResetEditing();
            }}
          >
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={edit?.name}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, name: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              value={edit?.email}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, email: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="address">Address</label>
            <Input
              id="address"
              value={edit?.address}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, address: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="phone">Phone</label>
            <Input
              id="phone"
              value={edit?.phone}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, phone: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="website">Website</label>
            <Input
              id="website"
              value={edit?.website}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, website: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
          </Modal>

          {/* Add record modal */}
          <Modal
            title="Add new record"
            open={isAddModalOpen}
            okText="Save record"
            onCancel={() => onCancelAdd()}
            onOk={() => {
              onAddRecord();
              onCancelAdd();
            }}
          >
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={edit?.name}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, name: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              value={edit?.email}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, email: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="address">Address</label>
            <Input
              id="address"
              value={edit?.address}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, address: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="phone">Phone</label>
            <Input
              id="phone"
              value={edit?.phone}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, phone: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
            <label htmlFor="website">Website</label>
            <Input
              id="website"
              value={edit?.website}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, website: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
          </Modal>
          <div>
            <button
              onClick={() => {
                setIsAddModalOpen(true);
              }}
              className="flex w-48 justify-center rounded-md mb-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add new record
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}

export default index;

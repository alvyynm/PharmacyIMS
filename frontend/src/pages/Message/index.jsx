import React, { useState } from 'react';
import { data } from '../../data/Data';
import { Table, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

function index() {
  const [Data, setData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
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
          <h1>Latest Data</h1>
          <Table dataSource={Data} columns={columns} pagination={false} />
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
            <Input
              value={edit?.address}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, address: e.target.value };
                });
              }}
              className="mb-3 rounded-lg"
            />
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
              value={edit?.website}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, website: e.target.value };
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

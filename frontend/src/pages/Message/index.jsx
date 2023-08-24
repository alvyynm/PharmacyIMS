import React, { useState } from 'react';
import { data } from '../../data/Data';
import { Table, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

function index() {
  const [Data, setData] = useState(data);
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
            <DeleteOutlined style={{ color: 'red' }} onClick={() => Delete(record)} />
          </>
        );
      },
    },
  ];

  const Delete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this',
      onOk: () => {
        setData((pre) => {
          return pre.filter((person) => person.id != record.id);
        });
      },
    });
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
        </main>
      </div>
    </section>
  );
}

export default index;

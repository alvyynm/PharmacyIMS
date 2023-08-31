import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { data } from '../../data/Data';
import { Table, Modal, Input, Button, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

function index() {
  const [Data, setData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [formData, setFormData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { inventory, setInventory } = useContext(DataContext);
  const [modalLoading, setModalLoading] = useState(false);

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    // API call to retrieve inventory data from database
    axios
      .get('http://localhost:3001/v1/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInventory(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token]);

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend'],
      onFilter: (value, record) => {
        return record.name.includes(value);
      },
      filteredValue: [searchTerm],
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category',
    },
    {
      key: 'unitPrice',
      title: 'Price',
      dataIndex: 'unitPrice',
    },
    {
      key: 'quantityInStock',
      title: 'Quantity',
      dataIndex: 'quantityInStock',
      sorter: (a, b) => a.quantityInStock > b.quantityInStock,
      sortDirections: ['descend'],
    },
    {
      key: 'shelfNumber',
      title: 'Shelf No.',
      dataIndex: 'shelfNumber',
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
        setLoading(true);

        axios
          .delete(`http://localhost:3001/v1/product/${record._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setLoading(false);
            console.log(`${response.data.message}`);
            // Filter data in UI to remove deleted item before fetching from database again
            setInventory((pre) => {
              return pre.filter((item) => item._id != record._id);
            });
            notifySuccess();
          })
          .catch((error) => {
            setLoading(false);
            setError(error);
            notifyError();
            console.error('Error deleting record:', error);
          });
      },
    });
  };

  // Edit records

  const handleUpdate = async (record) => {
    const updatedRecord = {
      name: record.name,
      price: record.unitPrice,
      category: record.category,
      quantity: record.quantityInStock,
      shelfNumber: record.shelfNumber,
      expiryDate: record.expiryDate,
    };
    console.log('Record', updatedRecord);
    try {
      axios
        .put(`http://localhost:3001/v1/product/${record._id}`, updatedRecord, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          notifyUpdateSuccess(); // #TODO: create custom success message
          console.log('Post updated successfully:', response);
        })
        .catch((error) => {
          setIsModalOpen(false);
          setError('An error occurred while creating the post');
          console.error('Error creating post:', error);
          notifyError();
        });
      // console.log('Edit Record');
    } catch (error) {
      console.error('Error updating record:', error);
      notifyError();
    }
  };

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
  const [form] = Form.useForm();

  const onAddRecord = async () => {
    try {
      const record = await form.validateFields();

      // Process the submitted data
      const newRecord = {
        name: record.name,
        price: record.unitPrice,
        category: record.category,
        quantity: record.quantityInStock,
        shelfNumber: record.shelfNumber,
        expiryDate: record.expiryDate,
      };
      console.log(newRecord);
      setModalLoading(true);

      axios
        .post('http://localhost:3001/v1/post', newRecord, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setIsAddModalOpen(false);
          notifyCreateSuccess();
          console.log('Post created successfully:', response.data);
          form.resetFields();
          // Update inventory context
          setInventory((present) => {
            return [...present, newRecord];
          });
        })
        .catch((error) => {
          setIsAddModalOpen(false);
          setError('An error occurred while creating the post');
          console.error('Error creating post:', error);
        });
    } catch (error) {
      notifyError();
      console.error('Form validation error:', error);
    }
  };

  // Discard new record
  const onCancelAdd = () => {
    setIsAddModalOpen(false);
    setFormData(null);
  };

  // Toast helper functions for notifications
  const notifySuccess = () => {
    toast.success('Product deleted successfully', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyError = () => {
    toast.error('Ooops! An error occured, try again later', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyCreateSuccess = () => {
    toast.success('Product created successfully', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyUpdateSuccess = () => {
    toast.success('Product updated successfully', {
      position: toast.POSITION.TOP_CENTER,
    });
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
                <h1 className="mt-5">Loading inventory data...</h1>
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
                <h1 className="mt-5">Oops! An error ocurred when retrieving inventory data...</h1>
              </div>
            </main>
          </div>
        </section>
      );
    }

    if (inventory) {
      console.log(inventory);
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
              <div className="flex justify-between mb-4">
                <div>
                  <Input.Search
                    onSearch={(value) => {
                      setSearchTerm(value);
                    }}
                    placeholder="Search for drugs"
                    // style={{ borderRadius: '0.5rem', display: 'block' }}
                  />
                </div>
                <button
                  onClick={() => {
                    setIsAddModalOpen(true);
                  }}
                  className="flex w-48 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add new record
                </button>
              </div>
              <Table
                dataSource={inventory}
                columns={columns}
                pagination={{ pageSize: 9, total: 50, showSizeChanger: false }}
                rowKey={(record) => record._id}
              />

              {/* Edit record modal */}
              <Modal
                title="Edit Details"
                open={isModalOpen}
                okText="Save"
                onCancel={() => ResetEditing()}
                onOk={() => {
                  setInventory((pre) => {
                    return pre.map((record) => {
                      if (record._id === edit._id) {
                        console.log(record);
                        // call the api and update the record
                        handleUpdate(edit);
                        return edit;
                      } else {
                        return record;
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
                <label htmlFor="category">Category</label>
                <Input
                  id="category"
                  value={edit?.category}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, category: e.target.value };
                    });
                  }}
                  className="mb-3 rounded-lg"
                />
                <label htmlFor="unitPrice">Price</label>
                <Input
                  id="unitPrice"
                  value={edit?.unitPrice}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, unitPrice: e.target.value };
                    });
                  }}
                  className="mb-3 rounded-lg"
                />
                <label htmlFor="quantityInStock">Quantity in Stock</label>
                <Input
                  id="quantityInStock"
                  value={edit?.quantityInStock}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, quantityInStock: e.target.value };
                    });
                  }}
                  className="mb-3 rounded-lg"
                />
                <label htmlFor="shelfNumber">Shelf Number</label>
                <Input
                  id="shelfNumber"
                  value={edit?.shelfNumber}
                  onChange={(e) => {
                    setEdit((pre) => {
                      return { ...pre, shelfNumber: e.target.value };
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
                footer={[
                  <Button key="cancel" onClick={onCancelAdd}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" loading={modalLoading} onClick={onAddRecord}>
                    Submit
                  </Button>,
                ]}
              >
                <Form form={form}>
                  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="unitPrice" label="Unit Price" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="quantityInStock"
                    label="Quantity In Stock"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="shelfNumber" label="Shelf Number" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="expiryDate"
                    label="Expiry Date: Format MMYY e.g: 102025"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
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
  }
}

export default index;

import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Table, Modal, Input, Button, Form, DatePicker } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

function index() {
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
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedOrderDate, setSelectedOrderDate] = useState(null);

  // Retrieve the token and userId from local storage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

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
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
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
      sorter: (a, b) => a.quantityInStock - b.quantityInStock,
    },
    {
      key: 'orderDate',
      title: 'Order Date',
      dataIndex: 'orderDate',
      render: (text) => moment(text).format('DD/MM/YY'), // Format the ISO date string
    },
    {
      key: 'expiryDate',
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      render: (text) => moment(text).format('DD/MM/YY'), // Format the ISO date string
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.expiryDate).unix() - moment(b.expiryDate).unix(), // Custom sorting function
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
          .delete(`http://localhost:3001/v1/product/${record._id}/${userId}`, {
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
            if (error.response.status === 401) {
              console.log(error);
              notifyUnauthorized();
              setLoading(false);
            } else {
              setLoading(false);
              setError(error);
              notifyError();
              console.error('Error deleting record:', error);
            }
          });
      },
    });
  };

  // Create new record
  const [form] = Form.useForm();

  // Edit records

  const handleUpdate = async (record) => {
    // get updated date data from the modal
    const { expiryDate, orderDate } = await form.getFieldsValue();

    const updatedRecord = {
      name: record.name,
      price: record.unitPrice,
      category: record.category,
      quantity: record.quantityInStock,
      shelfNumber: record.shelfNumber,
      expiryDate: expiryDate?.$d.toISOString() || record.expiryDate,
      orderDate: orderDate?.$d.toISOString() || record.orderDate,
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

  // Function to disable past dates
  const disabledDate = (current) => {
    // Disable dates before today (past dates)
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const onAddRecord = async () => {
    try {
      const record = await form.validateFields();
      //  #TODO: Add specific validation parameters

      // Process the submitted data
      const newRecord = {
        name: record.name,
        price: record.unitPrice,
        category: record.category,
        quantity: record.quantityInStock,
        shelfNumber: record.shelfNumber,
        orderDate: record.orderDate.$d.toISOString(),
        expiryDate: record.expiryDate.$d.toISOString(),
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

  const notifyUnauthorized = () => {
    toast.error('You have no permission', {
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

  let totalUnitPrice = 0;
  let totalQuantityInStock = 0;

  if (inventory) {
    // Iterate through the array of products and accumulate the values
    for (const product of inventory) {
      // Multiply unitPrice by quantityInStock for each product
      const productTotal = product.unitPrice * product.quantityInStock;

      // Add the product total to the overall total
      totalUnitPrice += productTotal;

      // Accumulate total quantityInStock
      totalQuantityInStock += product.quantityInStock;
    }
  }

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
              <div>
                {/*START*/}
                <div className="flex gap-4 justify-center mt-3">
                  <div className=" flex flex-col justify-evenly place-items-center bg-gray-300 w-64 h-20 rounded-2xl">
                    <div>
                      <h3 className="text-custom-black font-bold text-sm">Available Drugs</h3>
                    </div>
                    <div>
                      <p>{Object.keys(inventory).length}</p>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-evenly place-items-center bg-gray-300 w-64 h-20 rounded-2xl">
                    <div>
                      <h3 className="text-custom-black font-bold text-sm">Stock Value</h3>
                    </div>
                    <div>
                      <p>KES {totalUnitPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-evenly place-items-center bg-gray-300 w-72 h-20 rounded-2xl">
                    <div>
                      <h3 className="text-custom-black font-bold text-sm">Total Units Available</h3>
                    </div>
                    <div>
                      <p>{totalQuantityInStock.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mb-4 mt-6">
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

                <div>
                  <Table
                    dataSource={inventory}
                    columns={columns}
                    pagination={{ pageSize: 9, total: 50, showSizeChanger: false }}
                    rowKey={(record) => record._id}
                  />
                </div>

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
                          console.log(edit);
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
                  footer={[
                    <Button key="cancel" onClick={ResetEditing}>
                      Cancel
                    </Button>,
                    <Button
                      className="bg-indigo-600"
                      key="submit"
                      type="primary"
                      loading={modalLoading}
                      onClick={() => {
                        setInventory((pre) => {
                          return pre.map((record) => {
                            if (record._id === edit._id) {
                              console.log(record);
                              console.log(edit);
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
                      Save
                    </Button>,
                  ]}
                >
                  <Form form={form}>
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
                    <Form.Item name="orderDate" label="Order Date" rules={[{ required: true }]}>
                      <DatePicker
                        picker="date"
                        onChange={(date, dateString) => {
                          console.log(date);
                          const dateT = date?.$d.toISOString();
                          console.log(`Order date: `, dateT);
                        }}
                      />
                      {selectedOrderDate && <p>Selected Date: {selectedOrderDate}</p>}
                    </Form.Item>
                    <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
                      <DatePicker
                        picker="date"
                        disabledDate={disabledDate}
                        onChange={(date, dateString) => {
                          console.log(dateString);
                          const dateT = date?.$d.toISOString();
                          console.log(dateT);
                        }}
                      />
                      {selectedMonth && <p>Selected Month: {selectedMonth}</p>}
                    </Form.Item>
                  </Form>
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
                    <Button
                      className="bg-indigo-600"
                      key="submit"
                      type="primary"
                      loading={modalLoading}
                      onClick={onAddRecord}
                    >
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
                    <Form.Item name="orderDate" label="Order Date" rules={[{ required: true }]}>
                      <DatePicker
                        picker="date"
                        onChange={(date, dateString) => {
                          console.log(dateString);
                          const dateT = date.$d.toISOString();
                          console.log(`Order date: `, dateT);
                        }}
                      />
                      {selectedOrderDate && <p>Selected Date: {selectedOrderDate}</p>}
                    </Form.Item>
                    <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
                      <DatePicker
                        picker="date"
                        disabledDate={disabledDate}
                        onChange={(date, dateString) => {
                          console.log(dateString);
                          const dateT = date.$d.toISOString();
                          console.log(dateT);
                        }}
                      />
                      {selectedMonth && <p>Selected Month: {selectedMonth}</p>}
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
              </div>
            )}
          </main>
        </div>
      </section>
    );
  }
}

export default index;

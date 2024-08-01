import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [image, setImage] = useState('');

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting product');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('category', category);
      productData.append('quantity', quantity);
      productData.append('shipping', shipping);
      productData.append('image', image);

      const { data } = await axios.post('/api/v1/product/create-product', productData);
      if (data?.success) {
        toast.success('Product created successfully');
        navigate('dashboard/admin/products')
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in creating product');
    }
  };

  return (
    <Layout title={'Dashboard - Create Product'}>
      <div className='container-fluid m-3 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
              <div className='m-1 w-75'>
                <Select
                  placeholder='Select a category'
                  size='large'
                  showSearch
                  className='form-select mb-3'
                  onChange={(value) => setCategory(value)}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className='mb-3'>
                  <label className='btn btn-outline-secondary col-md-12'>
                    {image ? image.name : 'Upload image'}
                    <input
                      type='file'
                      name='Image'
                      accept='image/*'
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className='mb-3'>
                  {image && (
                    <div className='text-center'>
                      <img
                        src={URL.createObjectURL(image)}
                        alt='product-image'
                        height={'200px'}
                        className='img img-responsive'
                      />
                    </div>
                  )}
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    value={name}
                    placeholder='Write a name'
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    value={description}
                    placeholder='Write a description'
                    className='form-control'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    value={price}
                    placeholder='Write a price'
                    className='form-control'
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    value={quantity}
                    placeholder='Write quantity'
                    className='form-control'
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <Select
                    placeholder='Select shipping'
                    size='large'
                    showSearch
                    className='form-select mb-3'
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value='0'>No</Option>
                    <Option value='1'>Yes</Option>
                  </Select>
                </div>
                <button type='submit' className='btn btn-primary'>Create Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

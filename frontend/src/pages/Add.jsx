import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosClient from '../libs/axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    name: '',
    author: '',
    publishedYear: 0,
    publisher: '',
    category: '',
    price: 0,
    quantity: 0,
  });
  const [images, setImages] = useState({ 1: null, 2: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, author, publishedYear, publisher, category, price, quantity } = inputData;
    if (!name || !author || !publishedYear || !publisher || !category || !price || !quantity) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const formData = new FormData();
      formData.append(name);
      formData.append(author);
      formData.append(publishedYear);
      formData.append(publisher);
      formData.append(category);
      formData.append(price);
      formData.append(quantity);
      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append('images', images[key]);
      });

      const res = await axiosClient.post('/books', formData);
      if (res.status === 200) {
        toast.success("Tạo mới thành công!");
        navigate('/');
      }
    }
    catch (error) {
      console.log("Lỗi khi tạo mới sách", error);
      toast.error("Lỗi khi tạo mới sách")
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-header'>
          <h2 className='card-title text-success'>Thêm sách</h2>
        </div>
        <div className='card-body'>
          <table className=' table table-striped table-hover'>
            <tbody>
              <tr>
                <td className='fw-bold'>Tên sách</td>
                <td><input type='text' /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Tác giả</td>
                <td><input /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Nhà xuất bản</td>
                <td><input /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Năm xuất bản</td>
                <td><input /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Thể loại</td>
                <td><input /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Giá tiền</td>
                <td><input /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Số lượng</td>
                <td><input /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Hình ảnh</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Add

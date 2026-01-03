import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axiosClient from '../libs/axios';
import { useNavigate, Link } from 'react-router-dom';

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
  const handleImageChange = (key, file) => {
    setImages((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, author, publishedYear, publisher, category, price, quantity } = inputData;
    if (!name || !author || !publishedYear || !publisher || !category || !price || !quantity) {
      console.log(inputData);
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('author', author);
      formData.append('publishedYear',publishedYear);
      formData.append('publisher', publisher);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('quantity', quantity);
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
      <Link to='/' className='btn btn-secondary mb-2'>Quay lại</Link>
      <div className='card'>
        <div className='card-header'>
          <h2 className='card-title text-success'>Thêm sách</h2>
        </div>
        <div className='card-body'>
          <table className=' table table-striped table-hover'>
            <tbody>
              <tr>
                <td className='fw-bold'>Tên sách</td>
                <td><input onChange={e => setInputData({...inputData,name: e.target.value})} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Tác giả</td>
                <td><input onChange={e => setInputData({...inputData,author: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Nhà xuất bản</td>
                <td><input onChange={e => setInputData({...inputData,publisher: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Năm xuất bản</td>
                <td><input onChange={e => setInputData({...inputData,publishedYear: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Thể loại</td>
                <td><input onChange={e => setInputData({...inputData,category: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Giá tiền</td>
                <td><input onChange={e => setInputData({...inputData,price: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Số lượng</td>
                <td><input onChange={e => setInputData({...inputData,quantity: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Hình ảnh</td>
                <td>
                  <div className="d-flex gap-3">
                    {Object.keys(images).map((key) => (
                      <div key={key} className="text-center">
                        <label htmlFor={`images${key}`} className="image-upload-label" style={{ cursor: 'pointer' }}>
                          <div className="border rounded d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px', overflow: 'hidden', background: '#f8f9fa' }}>
                            {images[key] ? (
                              <img src={URL.createObjectURL(images[key])} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <span className="text-muted">+ Ảnh {key}</span>
                            )}
                          </div>
                          <input
                            type="file"
                            accept='image/*'
                            id={`images${key}`}
                            hidden
                            onChange={e => handleImageChange(key, e.target.files[0])}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='card-footer d-flex justify-content-end'>
            <button type='button' className='btn btn-success' onClick={handleSubmit}>{!loading ? 'Lưu' : 'Đang lưu...'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add

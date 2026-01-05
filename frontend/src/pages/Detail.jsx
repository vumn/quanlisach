// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axiosClient from '../libs/axios';
import toast from 'react-hot-toast'



const Detail = () => {

  const [book, setBook] = useState(null);
  const [originBook, setOriginBook] = useState(null);
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    name: '',
    author: '',
    publishedYear: 0,
    publisher: '',
    category: {
      'Sci-fi': false,
      'Thiếu nhi': false,
      'Truyện tranh': false,
      'Giật gân': false,
      'Kinh dị': false,
    },
    price: 0,
    quantity: 0,
  });

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/books/${id}`);
        // console.log("Data: ", res.data)
        setBook(res.data.book);
        setOriginBook(res.data.book);
        const initialCategory = {
            'Sci-fi': false,
            'Thiếu nhi': false,
            'Truyện tranh': false,
            'Giật gân': false,
            'Kinh dị': false,
        }

        const bookCategories = res.data.book.category;
        // console.log(bookCategories)

        if (Array.isArray(bookCategories)) {
          bookCategories.forEach(cate => {
            if (cate in initialCategory) {
              initialCategory[cate] = true;
          }
          })
        }

        setInputData({
          name: res.data.book.name,
          author: res.data.book.author,
          publishedYear: res.data.book.publishedYear,
          publisher: res.data.book.publisher,
          category: initialCategory,
          price: res.data.book.price,
          quantity: res.data.book.quantity,
        })
      }
      catch (error) {
        console.log("Lỗi khi lấy dữ liệu", error);
      }
      finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [id]);

  const handleSave = async () => {
    if (!book.name.trim() || !book.author.trim() || !book.publisher.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setSaving(true);
    try {
      await axiosClient.put(`/books/${id}`, book);
      toast.success("Cập nhật thành công");
      navigate('/');
    }
    catch (error) {
      console.log("Lỗi khi lưu dữ liệu", error);
      toast.error("Lỗi khi lưu dữ liệu")
    }
    finally {
      setSaving(false);
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa cuốn sách này?")) return;

    try {
      await axiosClient.delete(`/books/${id}`);
      toast.success("Xóa thành công");
      navigate('/');
    }
    catch (error) {
      console.error("Lỗi khi xóa sách", error);
      toast.error("Xóa thất bại");
    }
  }

  // Hàm xử lý khi tick vào checkbox
  const handleCategoryChange = (cateName) => {
    // 1. Cập nhật giao diện (inputData)
    const newCategoryState = {
      ...inputData.category,
      [cateName]: !inputData.category[cateName]
    };

    setInputData({
      ...inputData,
      category: newCategoryState
    });

    // 2. Cập nhật dữ liệu để lưu (book)
    // Lọc ra những key nào đang là true để tạo thành mảng mới (VD: ['Kinh dị', 'Sci-fi'])
    const newBookCategories = Object.keys(newCategoryState).filter(key => newCategoryState[key]);
    
    setBook({
      ...book,
      category: newBookCategories
    });
  };

  if (loading) return <div className='text-center mt-5'>Đang tải...</div>
  if (!book) return <div className='text-center mt-5'>Không tìm thấy thông tin sách</div>

  const isChanged = JSON.stringify(book) !== JSON.stringify(originBook);

  return (
    <div className='container mt-4'>
      <Link to='/' className='btn btn-secondary mb-2'>Quay lại</Link>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title text-success'>Chi tiết sách</h5>
        </div>
        <div className='card-body'>
          <table className=' table table-striped table-hover'>
            <tbody>
              <tr>
                <td className='fw-bold'>Tên sách</td>
                <td><input type='text' value={book.name} onChange={e => setBook({ ...book, name: e.target.value })} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Tác giả</td>
                <td><input value={book.author} onChange={e => setBook({ ...book, author: e.target.value })} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Nhà xuất bản</td>
                <td><input value={book.publisher} onChange={e => setBook({ ...book, publisher: e.target.value })} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Năm xuất bản</td>
                <td><input value={book.publishedYear} onChange={e => setBook({ ...book, publishedYear: e.target.value })} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Thể loại</td>
                <td className='d-flex gap-4'>
                  {Object.keys(inputData.category).map((cate, index) => (
                    <div key={index}>
                      <input 
                        type="checkbox" 
                        id={`category${index + 1}`}
                        checked={inputData.category[cate]} 
                        onChange={() => handleCategoryChange(cate)} />
                      <label htmlFor={`category${index + 1}`}>{cate}</label>
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <td className='fw-bold'>Giá tiền</td>
                <td><input value={book.price} onChange={e => setBook({ ...book, price: e.target.value })} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Số lượng</td>
                <td><input value={book.quantity} onChange={e => setBook({ ...book, quantity: e.target.value })} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Hình ảnh</td>
                <td>{book.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    className='img-thumbnail'
                    style={{ width: '120px', height: '150px', objectFit: 'cover' }}
                    onClick={() => setSelectedImage(imgUrl)}
                  />
                ))}</td>
              </tr>
            </tbody>
          </table>

          {selectedImage && (
            <div className='modal-preview-overlay'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)', // Nền đen mờ
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999 // Đảm bảo đè lên mọi thứ
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={selectedImage} alt='Preview' style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} />
                <button className='btn btn-close btn-close-white'
                  style={{ position: 'absolute', top: -30, right: -30, fontSize: '1.5rem' }}
                  onClick={() => setSelectedImage(null)}
                ></button>
              </div>
            </div>)}
        </div>


        <div className='card-footer d-flex justify-content-end '>

          {/* <div className='d-flex justify-content-end'> */}
          <button type='button' className='btn btn-warning ms-2' disabled={saving || !isChanged} onClick={handleSave}>{saving ? "Đang lưu..." : "Cập nhật"}</button>
          <button type='button' className='btn btn-danger ms-2' onClick={handleDelete}>Xóa</button>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default Detail

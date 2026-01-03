// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../libs/axios';




const Detail = () => {

    const [book, setBook] = useState(null)
    const {id} = useParams();
    console.log(id);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => { 
            try {
              setLoading(true);
                const res = await axiosClient.get(`/books/${id}`);
                console.log("Data: ", res.data)
                setBook(res.data.book); 
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

    if (loading) return <div className='text-center mt-5'>Đang tải...</div>
    if (!book) return <div className='text-center mt-5'>Không tìm thấy thông tin sách</div>

  return (
      <div className='container mt-4'>
        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title text-success'>Chi tiết sách</h5>
          </div>
          <div className='card-body'>
            <table className=' table table-striped table-hover'>
              <tbody>
              <tr>
                <td className='fw-bold'>Tên sách</td>
                <td><input type='text' value={book.name} onChange={e => setBook({...book, name: e.target.value})} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Tác giả</td>
                <td><input value={book.author} onChange={e => setBook({...book, author: e.target.value})} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Nhà xuất bản</td>
                <td><input value={book.publisher} onChange={e => setBook({...book, publisher: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Năm xuất bản</td>
                <td><input value={book.publishedYear} onChange={e => setBook({...book, publishedYear: e.target.value})}/></td>
              </tr>
              <tr>
                <td className='fw-bold'>Thể loại</td>
                <td><input value={book.category} onChange={e => setBook({...book, category: e.target.value})} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Giá tiền</td>
                <td><input value={book.price} onChange={e => setBook({...book, price: e.target.value})} /></td>
              </tr>
              <tr>
                <td className='fw-bold'>Số lượng</td>
                <td><input value={book.quantity} onChange={e => setBook({...book, quantity: e.target.value})} /></td>
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
              <div style={{position: 'relative'}}>
                <img src={selectedImage} alt='Preview' style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}/>
                <button className='btn btn-close btn-close-white' 
                  style={{ position: 'absolute', top: -30, right: -30, fontSize: '1.5rem' }}
                  onClick={() => setSelectedImage(null)}
                ></button>
              </div>
            </div>)}
          </div>


          <div className='card-footer'>
            <Link to='/'>
              <button type='button' className='btn btn-secondary'>Quay lại</button>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Detail

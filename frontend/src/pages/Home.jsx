import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import axiosClient from '../libs/axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // const idAdd = '-1';

  // const [detailData, setDetailData] = useState({});

  useEffect(() => {
    // axios.get('http://localhost:3000/api/v1/books')
    // .then(response => setData(response.data))
    // .catch(error => console.log(error))
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/books');
        setData(response.data);
      }
      catch (error) {
        console.error("Loi ket noi backend", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [])
  // console.log(data);
  return (
    <div className='container mt-5'>
      <Link to={'/create'} className='btn btn-primary'>Thêm sách</Link>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            {/* <td>ID</td> */}
            <td>Tên sách</td>
            <td>Tác giả</td>
            <td>Nhà xuất bản</td>
            <td>Năm xuất bản</td>
            <td>Thể loại</td>
            <td>Giá tiền</td>
            <td>Số lượng</td>
            {/* <td>Hình ảnh</td> */}
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr >
              {/* <td>{d._id}</td> */}
              <td> <Link to={`detail/${d._id}`} className='text-decoration-none text-reset'>{d.name}</Link></td>
              <td>{d.author}</td>
              <td>{d.publisher}</td>
              <td>{d.publishedYear}</td>
              <td>{d.category}</td>
              <td>{d.price}</td>
              <td>{d.quantity}</td>
              {/* <td></td> */}
              <td>
                <Link to={`/detail/${d._id}`} className='btn btn-warning ms-0'>Sửa</Link>
                <button className='btn btn-danger ms-2'>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
      
  )
}

export default Home

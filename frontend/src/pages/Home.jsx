import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const idAdd = '-1';

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    // axios.get('http://localhost:3000/api/v1/books')
    // .then(response => setData(response.data))
    // .catch(error => console.log(error))
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/books');
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
      <Link to={`/update/${idAdd}`} className='btn btn-primary'>theem sach</Link>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <td>ID</td>
            <td>Ten sach</td>
            <td>Tac gia</td>
            <td>Nam xuat ban</td>
            <td>Nha xuat ban</td>
            <td>The loai</td>
            <td>Gia tien</td>
            <td>So luong</td>
            <td>Hanh dong</td>
          </tr>
        </thead>
        <tbody>
          {data.map((d,i) => (
            <tr>
              <td>{d._id}</td>
              <td>{d.name}</td>
              <td>{d.author.name}</td>
              <td>{d.publishedYear}</td>
              <td>{d.publisher}</td>
              <td>{d.category.name}</td>
              <td>{d.price}</td>
              <td>{d.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home

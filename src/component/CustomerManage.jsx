import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "../App.css"
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from '../axios/axiosCustom';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination } from "@mui/material";
import { Link } from 'react-router-dom';
export default function CustomerManage() {
    const [customers,setCustomer]=useState([])
    const [rank,setRank]=useState("")
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [topCustomer,setTopCustomer]=useState([])
const [loading ,setLoading]=useState(true)
const [search,setSearch]=useState("");
const handlePageChange = (e, page) => {
    setPage(page);
  };
  const handleSearch=()=>{
    if(search==""){
        return
    }
    axiosInstance.get(`http://localhost:8080/searchCustomer?value=${search}`).then(
        (res)=>{
            console.log(res.data)
        setCustomer(res.data.result)  
        setTotalPages(1)  
        }
    )
  }
  useEffect(()=>{
axiosInstance.get("http://localhost:8080/getTopCustomers").then((res)=>{
    setTopCustomer(res.data.result)
})
  },[])
const getAll=()=>{
    axiosInstance.get(`http://localhost:8080/getListCustomer?page=${page}&size=${4}`)
    .then((res)=>{
        console.log(res.data.result.data)
        setTotalPages(res.data.result.totalPage);
        setLoading(false)
setCustomer(res.data.result.data)
    })
}
    useEffect(()=>{
       if(rank==""){
   getAll()}
    },[page])
    useEffect(()=>{
        if(rank!=""){
        axiosInstance.get(`http://localhost:8080/getByRank?page=${page}&size=${4}&rank=${rank}`)
        .then((res)=>{
            console.log(res.data.result)
            setTotalPages(res.data.result.totalPage);
            setLoading(false)
    setCustomer(res.data.result.data)
        })
    }},[rank,page])

    
    
    if(loading) return ( <div style={{margin:"auto"}}>
        <CircularProgress ></CircularProgress>
        </div>)
  return (
<>
<div className="position-fixed">
        <Sidebar />
      </div>
        <div className="responsive" style={{backgroundColor:"rgb(133, 135, 150,0.1)"}}>
<h4 style={{padding:'20px',fontWeight:"bold"}}>Quản lý khách hàng</h4>
        <div className="filter">
<div className="title_filter">
    <h5 style={{padding:"10px",backgroundColor:"rgb(133, 135, 150,0.1)",border:"1px solid rgb(133, 135, 150,0.1)" ,fontWeight:"400",fontFamily:"Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI' ",color:"rgb(133, 135, 150,0.9)"}}>Bộ lọc và tìm kiếm</h5>
</div>
<div className="filter_content">
    <div className="filter_rank">
    <div className="filter_gold"  style={{color:'gold', backgroundColor: rank === 'gold' ? 'green' : 'white'}} onClick={()=>{setRank("gold");setPage(1)}}>
        Vàng
    </div>
    <div className="filter_gold" style={{color:"Highlight",backgroundColor: rank === 'gray' ? 'green' : 'white'}} onClick={()=>{setRank("gray");setPage(1)}}>
        Bạc
    </div>
    <div className="filter_gold" style={{color:"brown",backgroundColor: rank === 'brown' ? 'green' : 'white'}} onClick={()=>{setRank("brown");setPage(1)}}>
        Đồng
    </div>
    </div>
    <div className="filter_search">
<input type="text" placeholder='Nhập họ tên' value={search} onChange={(e)=>setSearch(e.target.value)} style={{backgroundColor:"rgb(133, 135, 15,0.1)"}}/>
    <div onClick={handleSearch} style={{display:"flex" ,justifyContent:"center",alignItems:"center",padding:"8px",backgroundColor:"bisque"}} className='search_filter' >
      <SearchIcon></SearchIcon>
    </div>
    </div>
    <div className="filter_fil" onClick={()=>{getAll(); setRank("")}}>
   Hiện tất cả
    </div>
</div>
        </div>

        <div className="top-employees-container">
      <h2>Top 3 khách hàng thân tiết</h2>
      <div className="employee-cards">
        {topCustomer&&topCustomer.map((employee,index) => (
          <div key={employee.id} className={`employee-card rank-${index+1}`}>
            <div className="employee-image">
              
                <img src="https://img.freepik.com/premium-vector/hidden-avatar-icon-flat-vector-mark-person-customer-head-individual_98396-65924.jpg?semt=ais_hybrid" alt={employee.name} />
            
            </div>
            <h3>{employee.name}</h3>
            <p style={{color:"InfoText"}}>Điểm tích lũy: {employee.point} $</p>
            <div className={`rank-badge rank-${index+1}`}>
              {index+1}
            </div>
          </div>
        ))}
      </div>
    </div>
        <div className="table_customer">

        
      <table className="user-table">
        <thead style={{color:'white',fontFamily:"fantasy"}}>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số liên hệ</th>
            <th>Mức độ</th>
            <th>Điểm thưởng</th>
        <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          { customers&&customers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
         
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
              <span className={`rank ${user.rank === "Vàng" ? "gold" : user.rank === "Bạc" ? "gray" : "brown"}`}>
  {user.rank}
</span>

              </td>
              <td>{user.point}</td>
              <td><Link to={`/detailCustomer/${user.id}`}><div  className='butCustomer' style={{color:"wheat",backgroundColor:"#98cfe1",padding:"4px",borderRadius:"10px",textAlign:"center"}}  >Chi Tiết</div> </Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
         {/* Phân trang */}
         <div className="pagination-container" style={{padding:"10px"}}>
            <Pagination
              color="secondary"
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      
</>
  )
}

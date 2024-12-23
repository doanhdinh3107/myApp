import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "../App.css"
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from '../axios/axiosCustom';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination } from "@mui/material";
import { Link } from 'react-router-dom';
export default function HistoryBill() {
    const [bills,setBill]=useState([])
    const [rank,setRank]=useState("")
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [topCustomer,setTopCustomer]=useState([])
const [loading ,setLoading]=useState(true)
const [search,setSearch]=useState("");
const handlePageChange = (e, page) => {
    setPage(page);
  };
  const getAll=()=>{
    axiosInstance.get(`http://localhost:8080/getHistory?page=${page}&size=${4}`)
    .then((res)=>{
        console.log(res.data.result.data)
        setTotalPages(res.data.result.totalPage);
        setLoading(false)
setBill(res.data.result.data)
    })
}
    useEffect(()=>{
       if(rank==""){
   getAll()}
    },[page])
  if(loading) return ( <div style={{margin:"auto"}}>
    <CircularProgress ></CircularProgress>
    </div>)
return (
<>
<div className="position-fixed">
    <Sidebar />
  </div>
    <div className="responsive" style={{backgroundColor:"rgb(133, 135, 150,0.1)" ,height:"100vh"}}>
<h4 style={{padding:'20px',fontWeight:"bold"}}>Quản lý hóa đơn</h4>
    <div className="filter">
<div className="title_filter">
<h5 style={{padding:"10px",backgroundColor:"rgb(133, 135, 150,0.1)",border:"1px solid rgb(133, 135, 150,0.1)" ,fontWeight:"400",fontFamily:"Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI' ",color:"rgb(133, 135, 150,0.9)"}}>Bộ lọc và tìm kiếm</h5>
</div>
<div className="filter_content">
<div className="filter_rank">
<div className="filter_gold"  style={{color:'gold', backgroundColor: 'white',flexBasis:"50%"}} >
    Chưa thanh toán
</div>
<div className="filter_gold" style={{color:"Highlight",backgroundColor:'white',flexBasis:"50%"}}>
    Đã Thanh Toán
</div>

</div>
<div className="filter_search">
<input type="text" placeholder='Nhập họ tên' style={{backgroundColor:"rgb(133, 135, 15,0.1)"}}/>
<div style={{display:"flex" ,justifyContent:"center",alignItems:"center",padding:"8px",backgroundColor:"bisque"}} className='search_filter' >
  <SearchIcon></SearchIcon>
</div>
</div>
<div className="filter_fil"  onClick={()=>{getAll(); setRank("")}} >
Hiện tất cả
</div>
</div>
</div>
<div className="table_customer">

        
<table className="user-table">
  <thead style={{color:'white',fontFamily:"fantasy"}}>
    <tr>
      <th>STT</th>
      <th>Tên khách hàng</th>
      <th>Số điện thoại</th>
      <th>Ngày Đặt</th>
      <th>Trạng thái</th>
  <th>Hoạt động</th>
    </tr>
  </thead>
  <tbody>
  {bills && bills.map((bill, index) => (
  <tr key={index}>
    <td>{index + 1}</td>

    {/* Kiểm tra sự tồn tại của customer trước khi truy cập */}
    <td>{bill.customer.name }</td>
    <td>{bill.customer.phone}</td>
    <td>{ bill.orderDate }</td>

    <td 
  style={{
    borderRadius: "4px", 
    
  }}
>
  <span style={{    backgroundColor: bill.status === "paid" ? "green" : "red" ,padding:"4px",color:"white",borderRadius:"8px"}}>{bill.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</span>
</td>

    <td style={{ display: "flex", justifyContent: "space-around" }}>
  
      <Link to={`/detailOrder/${bill.id}`}>
        <div
          className="butCustomer"
          style={{
            color: "wheat",
            backgroundColor: "#98cfe1",
            padding: "4px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          Chi Tiết
        </div>
      </Link>
      {bill.status=="paid"&&
      <Link to={`/printBill/${bill.id}`}>
        <div
          className="butCustomer"
          style={{
            color: "wheat",
            backgroundColor: "green",
            padding: "4px",
            borderRadius: "10px",
            textAlign: "center",
            minWidth:"40px",
padding:"4px"
          }}
        >
          In
        </div>
      </Link>}
    </td>
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
</>)
}

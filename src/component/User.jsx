import React, { useEffect, useState } from 'react'
import "../App.css"
import Sidebar from './Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosCustom';
export default function User() {
    const [search,setSearch]=useState()
    const [users,setUser]=useState([])
   useEffect(
()=>{
    axiosInstance.get("http://localhost:8080/getListUser").then(
        res=>{
           console.log(res.data) 
           setUser(res.data.result)
        }
    )},[])
  return (
    <>
    <div className="position-fixed">
            <Sidebar />
          </div>
            <div className="responsive" style={{backgroundColor:"rgb(133, 135, 150,0.1)",height:"100vh"}}>
    <h4 style={{padding:'20px',fontWeight:"bold"}}>Danh sách nhân viên</h4>
            <div className="filter">
    <div className="title_filter" >
        <h5 style={{padding:"10px",backgroundColor:"rgb(133, 135, 150,0.1)",border:"1px solid rgb(133, 135, 150,0.1)" ,fontWeight:"400",fontFamily:"Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI' ",color:"rgb(133, 135, 150,0.9)"}}>Thao tác và tìm kiếm</h5>
    </div>
    <div className="filter_content" >
    <div className="filter_rank">
    <Link to={`/add-user`}>
<Button variant="contained" startIcon={<PersonAddAltIcon></PersonAddAltIcon>} >
  Thêm Nhân Viên
</Button>
</Link>
        </div>
        <div className="filter_search">
    <input type="text" placeholder='Nhập họ tên' value={search} onChange={(e)=>setSearch(e.target.value)} style={{backgroundColor:"rgb(133, 135, 15,0.1)"}}/>
        <div style={{display:"flex" ,justifyContent:"center",alignItems:"center",padding:"8px",backgroundColor:"bisque"}} className='search_filter' >
          <SearchIcon></SearchIcon>
        </div>
        </div>
        <div className="filter_fil" >
   Hiện tất cả
    </div>  
    </div>
            </div>
            <div className="table_customer">

        
<table className="user-table">
  <thead style={{color:'white',fontFamily:"fantasy"}}>
    <tr>
      <th>STT</th>
      <th>Hình ảnh</th>
      <th>Họ tên</th>
      <th>Email</th>

      <th>Nhóm quyền</th>
  <th>Hoạt động</th>
    </tr>
  </thead>
  <tbody>
   {users && users.map((user,idex)=>(
      <tr >
        <td>{idex+1}</td>
   
        <td><img src={user.avatars} alt="d" style={{width:"80px",height:"80px",margin:"auto",display:"block",objectFit:"cover"}}/></td>
        <td>{user.username}</td>
        <td>{user.email}</td>
   
        <td>{user.role[0]}</td>
        <td><Link to={`/add-user`}><div  className='butCustomer' style={{color:"wheat",backgroundColor:"#98cfe1",padding:"4px",borderRadius:"10px",textAlign:"center"}}  >Chi Tiết</div> </Link></td>
      </tr>))
}
  </tbody>
</table>
</div>
            </div>
            </>
  )
}

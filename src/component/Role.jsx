import React, { useState } from 'react'
import Sidebar from './Sidebar'
import "../App.css"
import { Link } from 'react-router-dom'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';
export default function Role() {
    const [search,setSearch]=useState()
    return (
      <>
      <div className="position-fixed">
              <Sidebar />
            </div>
              <div className="responsive" style={{backgroundColor:"rgb(133, 135, 150,0.1)",height:"100vh"}}>
      <h4 style={{padding:'20px',fontWeight:"bold"}}>Danh sách quyền</h4>
              <div className="filter">
      <div className="title_filter" >
          <h5 style={{padding:"10px",backgroundColor:"rgb(133, 135, 150,0.1)",border:"1px solid rgb(133, 135, 150,0.1)" ,fontWeight:"400",fontFamily:"Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI' ",color:"rgb(133, 135, 150,0.9)"}}>Thao tác và tìm kiếm</h5>
      </div>
      <div className="filter_content" >
      <div className="filter_rank" style={{flexBasis:"50%"}}>
      <Link to={`/add-role`}>
  <Button variant="contained" startIcon={<PersonAddAltIcon></PersonAddAltIcon>} >
    Thêm nhóm quyền
  </Button>
  </Link>
          </div>
  
          <div className="filter_fi" style={{flexBasis:"20%",justifyContent:"center",alignContent:"center",display:"flex"}}>
          <IconButton aria-label="fingerprint" color="secondary">
        <Fingerprint />
      </IconButton>
      </div>  
      </div>
              </div>
              <div className="table_customer">
  
          
  <table className="user-table">
    <thead style={{color:'white',fontFamily:"fantasy"}}>
      <tr>
        <th>STT</th>
        <th>Nhóm quyền</th>
        <th>Mô tả</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
     
        <tr >
          <td>1</td>
     
          <td>Admin</td>
          <td>Có đầy đủ mọi quyền hạn với hệ thống</td>
         
          <td><Link to={`/add-user`}><div  className='butCustomer' style={{color:"wheat",backgroundColor:"#98cfe1",padding:"4px",borderRadius:"10px",textAlign:"center",width:"40%",margin:"auto"}}  >Chi Tiết</div> </Link></td>
        </tr>
  
    </tbody>
  </table>
  </div>
              </div>
              </>
    )
}

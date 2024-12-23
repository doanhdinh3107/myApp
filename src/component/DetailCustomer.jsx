import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axios/axiosCustom';
import "../App.css"
import Sidebar from './Sidebar';
export default function DetailCustomer() {
    const {id}=useParams();
    const [infor,setInfor]=useState()
    useEffect(()=>{
        axiosInstance.get(`http://localhost:8080/detail-customer?id=${id}`).then((res)=>{
            setInfor(res.data.result)
        })
    },[])

  return (
   <>
   <div>
    <div className="position-fixed">
        <Sidebar />
      </div>
   
        <div className="responsive">
    {infor &&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center" ,backgroundColor:"rgb(133, 135, 150,0.1)",height:"100vh"}}>
         <h4 className="customer-details-title">Chi tiết khách hàng</h4>

    <div className="container-cus">
  
      <div className="avatar-wrapper">
        <img src="https://img.freepik.com/premium-vector/hidden-avatar-icon-flat-vector-mark-person-customer-head-individual_98396-65924.jpg?semt=ais_hybrid" className="avatar-cus" />
      </div>

      {/* Thông tin người dùng */}
      <div className="info-cus">
        <h2 className="name-cus">{infor.name}</h2>
        <p className="phone-cus">📞 {infor.phone}</p>
        <p className="points-cus">⭐ Điểm tích lũy: {infor.point}</p>
        <p className="address-cus">🏠 Email: {infor.email}</p>
      </div>
    </div>
    </div>
    )}
    </div>
    </div>
    </>
  )
}

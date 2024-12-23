import React, { useEffect, useState } from 'react'
import "../App.css";
import axiosInstance from "../axios/axiosCustom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Button } from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import CloseIcon from '@mui/icons-material/Close';
import { Link, useParams } from 'react-router-dom'
import Sidebar from './Sidebar';

export default function DetailOrder() {
    const {id}=useParams()
    const [order,setOrder]=useState()
    useEffect(()=>{
axiosInstance.post("http://localhost:8080/getDetailOrder",JSON.stringify({id}))
.then(response=>{
    console.log(response.data)
  setOrder(response.data.result)
})
    },[])
    const total=(order)=>{
        if(order){
       return order.orderDishes.reduce((acc, item) => acc + parseInt(item.dish.sellPrice) * parseInt(item.quantity), 0)}
       else{
        return 0;
       }
    }
  return (
    <div>
  <div className="position-fixed">
    <Sidebar />
  </div>
  <div className="responsive">
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: 'center', color: '#00796b' }}>Chi Tiết Đặt Bàn</h1>
      <div className="confirmOrder" style={{ width: "80%", margin: "auto" }}>
        <table border="1" width="100%" cellPadding="10" style={{ marginBottom: "20px", marginTop: "50px" }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Món ăn</th>
              <th>Giá bán</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order && order.orderDishes.map((item, index) => (
              <tr key={item.id} style={{ borderBottom: "solid 1px rgb(147, 141, 141)" }}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.dish.image_url.split(',')[0] || "https://via.placeholder.com/50"} // Placeholder nếu không có ảnh
                    alt={item.dish.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                  />
                </td>
                <td>{item.dish.name}</td>
                <td>{parseInt(item.dish.sellPrice).toLocaleString()} đ</td>
                <td>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                </td>
                <td>{(parseInt(item.dish.sellPrice) * parseInt(item.quantity)).toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "right", width: "300px", position: "relative", right: "0px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ marginRight: "40px" }}>Tạm tính:</p>
            <span>{total(order).toLocaleString()} đ</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ marginRight: "40px" }}>Khuyến mãi:</p>
            <span>0 đ</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p><strong>Tổng cộng (VAT):</strong></p>
            <span style={{ color: "red" }}>{total(order).toLocaleString()} đ</span>
          </div>
        </div>
        {order && (
                   <div className="detail-container">
                   <h2>Thông tin đặt bàn</h2>
                   <div>
                       <strong>Họ tên: </strong><span>{order.customer.name}</span>
                   </div>
                   <div>
                       <strong>Ngày nhận: </strong><span>{order.orderDate}</span>
                   </div>
                   <div>
                       <strong>Số khách: </strong><span>{order.guests}</span>
                   </div>
                   <div>
                       <strong>Số điện thoại: </strong><span>{order.customer.phone}</span>
                   </div>
                   <div>
                       <strong>Khung giờ: </strong><span>{order.time}</span>
                   </div>
                   <div>
                       <strong>Email: </strong><span>{order.customer.email}</span>
                   </div>
                   <div>
                       <strong>Lời nhắn với nhà hàng: </strong><p>{order.message}</p>
                   </div>
                   <Link to={"/schedule"}>
                   <button>
                       Xác nhận thông tin
                   </button>
                   </Link>
               </div>
               
                )}
      </div>
    </div>
  </div>
</div>

  )
}

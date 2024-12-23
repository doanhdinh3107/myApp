import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "../App.css"
import { Button } from '@mui/material';
import axiosInstance from '../axios/axiosCustom';
import { Link } from 'react-router-dom';
export default function Schedule() {
   const [openCancel,setOpenCancel]=useState(false)
      const [openMenuId, setOpenMenuId] = useState(null);
      const [orders,setOrders]=useState([])
      const [reason, setReason] = useState('Khách yêu cầu hủy');
const [orderCurrent,setOrderCurrent]=useState()
      const handleLyDoChange = (event) => {
        setReason(event.target.value);
      };
    
      const handleSubmit = () => {
        setOpenCancel(false)
axiosInstance.post("http://localhost:8080/cancelOrder",JSON.stringify({"id":orderCurrent,"reason":reason}))
.then(res=>{
  console.log(res)
})
      };
useEffect(()=>{
axiosInstance.get("http://localhost:8080/getListOrders").
then((response=>{
  const preOrderList = response.data.result.filter(order => order.status === "pre-order");
  setOrders(preOrderList);  // Lưu các đơn hàng đã lọc vào state
}))
},[])
const handleCancel=(id)=>{
  setOpenMenuId(null)
setOpenCancel(true)
setOrderCurrent(id)
}
const handleComeIn=(order)=>{
    //gui yeu cau cap nhat lai don hang
    axiosInstance.post("http://localhost:8080/comeIn",JSON.stringify({"id":order.id}))
    .then(res=>{
        console.log(res)
    })
    window.location.href=`/detailOrder/${order.id}`
}
const total = (item)=>{
 return   item.orderDishes.reduce((acc, item) => acc + parseInt(item.dish.sellPrice) * parseInt(item.quantity), 0)};
  return (
    <div>
      
    <div className="position-fixed">
      <Sidebar />
    </div>
    <div className='responsive'>
    <div style={{ padding: "20px" }}>
    <h1 style={{ textAlign: 'center', color: '#00796b' }}>Lịch Đặt Bàn</h1>
    
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
      {orders&&orders.map((order) => (
     <div
     style={{
       border: "1px solid #ddd",
       borderRadius: "12px",
       padding: "16px",
       backgroundColor: "white",
       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
       position: "relative",
       transition: "transform 0.2s, box-shadow 0.2s",
       cursor: "pointer",
     }}
     onMouseEnter={(e) => {
       e.currentTarget.style.transform = "scale(1.02)";
       e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.15)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.transform = "scale(1)";
       e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
     }}
   >
     <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 8px",borderBottom:"solid 1px gray",paddingBottom:"4px" }}>
       {order.customer.name} - {order.customer.phone}
     </h3>
     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", alignItems: "center" }}>
       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
         <span role="img" aria-label="time">🕒</span>
         <span>{order.time}</span>
       </div>
       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
         <span role="img" aria-label="people">👥</span>
         <span>{order.guests} người</span>
       </div>
     </div>
     <div style={{ marginTop: "16px", fontSize: "16px", fontWeight: "bold", color: "#007BFF" }}>
      {total(order).toLocaleString()}  đ
     </div>
     <button
       onClick={(e) => {
         e.stopPropagation(); // Ngăn chặn sự kiện "click" lan ra ngoài
         setOpenMenuId(openMenuId === order.id ? null : order.id); // Đóng/mở menu của từng thẻ
       }}
       style={{
         position: "absolute",
         top: "2px",
         right: "10px",
         background: "none",
         border: "none",
         fontSize: "20px",
         cursor: "pointer",
         color: "#555",
       }}
     >
       ...
     </button>
     {openMenuId === order.id && (
       <div
         className="booking-card-menu"
         style={{
           position: "absolute",
           bottom: "0px",
           right: "10px",
           border: "1px solid #ddd",
           background: "white",
           borderRadius: "8px",
           boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
           zIndex: 10,
         }}
       >
         <ul style={{ listStyle: "none", padding: "10px", margin: 0 }}>
           <Link to={`/select-table/${order.id}`} style={{textDecoration:"none"}}>
           <li
             style={{
               padding: "8px 16px",
               cursor: "pointer",
               transition: "background-color 0.2s",
        
             }}
             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
           >
             🪑 Xếp bàn
           </li>
           </Link>
           <Link to={`/detailOrder/${order.id}`} style={{textDecoration:"none",color:"green"}}>
           <li
             style={{
               padding: "8px 16px",
               cursor: "pointer",
               transition: "background-color 0.2s",
             }}
             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
           >
             🍴 Chi tiết
           </li>
           </Link>
           <li
             style={{
               padding: "8px 16px",
               cursor: "pointer",
               color: "red",
               transition: "background-color 0.2s",
             }}
             onClick={()=>handleCancel(order.id)}
             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
           >
             ❌ Hủy đặt bàn
           </li>
         </ul>
       </div>
     )}
   <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }}
>
  <h3 style={{ fontSize: "16px", fontWeight: "500", margin: 0, color: "#333" }}>
  🪑 {order.banAn?order.banAn.name:"Chưa Xếp bàn"}
  </h3>
  
  <Button
onClick={()=>handleComeIn(order)}
style={{
      backgroundColor: "#007BFF",
      color: "white",
      padding: "6px 12px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
  >
    Khách nhận bàn
  </Button>

</div>

   </div>
      ))}
    </div>
    </div>
        
        </div>
        {openCancel&&(
          <>
 <div className="overlay" ></div>
 <div className="huy-don-container">
      <h2 className="huy-don-title">Hủy đơn</h2>
      <div className="huy-don-options">
       <div className="huy-don-option">
        <label >
          <input
            type="radio"
            name="lyDoHuy"
            checked={reason === 'Khách yêu cầu hủy'}
            value="Khách yêu cầu hủy"
            onChange={handleLyDoChange}
          />
        </label>
        <div className='text'>Khách yêu cầu hủy</div>
        </div>
        <div className="huy-don-option">
        <label >
          <input
            type="radio"
            name="lyDoHuy"
            checked={reason === 'Hết hàng'}
            value="Hết hàng"
            onChange={handleLyDoChange}
          />
         
        </label>
        <div className='text'>Hết hàng</div>
        </div>
        <div className="huy-don-option">
        <label >
          <input
            type="radio"
            name="lyDoHuy"
            checked={reason === 'Lý do khác'}
            value="Lý do khác"
            onChange={handleLyDoChange}
          />
          
        </label>
        <div className='text'>Lý do khác</div>
        </div>
      </div>
      <textarea
        className="huy-don-textarea"
        placeholder="Nhập lý do hủy đơn"
        value={reason === 'Lý do khác' ? '' : reason}
      onChange={handleLyDoChange}
      />
      <div className="huy-don-buttons">
        <button className="huy-don-button" onClick={()=>setOpenCancel(false)}>
          Đóng
        </button>
        <button className="huy-don-button huy-don-button--primary" onClick={handleSubmit}>
          Xác nhận
        </button>
      </div>
    </div>
  </>
        )}
        </div>
  )
}

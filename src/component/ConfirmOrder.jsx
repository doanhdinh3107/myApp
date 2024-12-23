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
export default function ConfirmOrder() {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
      });
      const saveCartToLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
      };
    
  useEffect(() => {
    console.log(cart)
    saveCartToLocalStorage(cart);
  }, [cart]);

  const updateQuantity = (id, action) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: action === "increment" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const total = cart.reduce((acc, item) => acc + parseInt(item.sellPrice) * parseInt(item.quantity), 0);
const [formData, setFormData] = useState({
    name: '',
 orderDate: '',
    guests: '',
    phone: '',
    email:"",
    message: '',
    time:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        "name": formData.name,
        "email": formData.email,
        "orderDate": formData.orderDate,
        "time": formData.time,
        "guests": formData.guests,
        "phone": formData.phone,
        "message": formData.message,
        "dishes": cart.map(cartItem => ({
            id: cartItem.id,
            "quantity": cartItem.quantity
        }))
    };
    
axiosInstance.post("http://localhost:8080/createOrder",JSON.stringify(data))
.then(response=>{
    localStorage.removeItem("cart")
window.location.href="/success-order"
})
  };
  return (
    <>
    <div>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#67908b" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Xác nhận Order
            </Typography>
            <IconButton size="large" aria-label="show cart items" color="inherit" >
              <Badge badgeContent={cart.length} color="error">
                <RedeemIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="confirmOrder" style={{width:"80%",margin:"auto"}}>
      <table border="1" width="100%" cellPadding="10" style={{ marginBottom: "20px" ,marginTop:"50px"}}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Món ăn</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id} style={{borderBottom:"solid 1px rgb(147, 141, 141)"}}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{parseInt(item.sellPrice).toLocaleString()} đ</td>
              <td>
                <Button onClick={() => updateQuantity(item.id, "decrement")}>-</Button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <Button onClick={() => updateQuantity(item.id, "increment")}>+</Button>
              </td>
              <td>{(parseInt(item.sellPrice)*parseInt(item.quantity)).toLocaleString()} đ</td>
              <td>
                <Button onClick={() => removeItem(item.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "right",width:"300px",position:"relative" ,right:"0px"}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <p style={{ marginRight: "40px" }}>Tạm tính:</p>
  <span>{total.toLocaleString()} đ</span>
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <p style={{ marginRight: "40px" }}>Khuyến mãi:</p>
  <span>0 đ</span>
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <p><strong>Tổng cộng (VAT):</strong></p>
  <span style={{ color: "red" }}>{total.toLocaleString()} đ</span>
</div>

      </div>
<div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px',marginBottom:"20px" ,marginTop:"20px" }}>
      <h2 style={{ textAlign: 'center', color: '#2f4f4f' }}>Thông tin đặt bàn</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
       
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={formData.name}
            onChange={handleChange}
            style={{ flex: 1, marginRight: '5px' }}
          />
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        </div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="number"
            name="guests"
            placeholder="Số khách "
            value={formData.guests}
            onChange={handleChange}
            style={{ flex: 1, marginRight: '5px' }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            style={{ flex: 1, marginRight: '5px' }}
          />
          <select name="time" value={formData.time} onChange={handleChange} style={{ flex: 1 }}>
            <option value="">---Chọn Khung giờ---</option>
            <option value="8-10 giờ">8-10 giờ</option>
            <option value="10-12 giờ">10-12 giờ</option>
            <option value="18-20 giờ">18-20 giờ</option>
            <option value="20-22 giờ">20-22 giờ</option>
          </select>
        </div>
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ flex: 1, marginRight: '5px',marginBottom: '10px' }}
          />
        <textarea
          name="message"
          placeholder="Lời nhắn với nhà hàng"
          value={formData.message}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', backgroundColor: '#d4a373', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>
          Gửi đơn đặt bàn
        </button>
      </form>
    </div>
      </div>
      </div>
    </>
  )
}

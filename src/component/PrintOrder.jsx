import React, { useEffect, useState } from 'react';
import "../App.css";
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios/axiosCustom';

export default function PrintOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);  // Initial state is null
  const [isPrinted, setIsPrinted] = useState(false);

  useEffect(() => {
    // Fetch order data first
    axiosInstance
      .post("http://localhost:8080/getDetailOrder",JSON.stringify({id})) 
      .then(res => {
        setOrder(res.data.result);
      });
  }, [id]);
  const total=(order)=>{
    if(order){
   return order.orderDishes.reduce((acc, item) => acc + parseInt(item.dish.sellPrice) * parseInt(item.quantity), 0)}
   else{
    return 0;
   }
}
  // dam bao da hien order
  useEffect(() => {
    if (order) {
      window.print();
      window.location.href = "/history";
      setIsPrinted(true);
    }
  }, [order]);

  const getTime = (timeIn) => {

    return timeIn;
  };

  const getTimeNow = () => {
    const now = Date.now();
    const date = new Date(now);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

 
  if (isPrinted) return null; 

  if (!order) return <h1>Loading...</h1>; 
  return (
    <div
      className="printable"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          width: "600px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#4CAF50",
            marginBottom: "10px",
          }}
        >
          Nhà Hàng Doanh Seafood
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "1rem",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          88 Phùng Hưng , Hà Đông , Hà Nội
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#4CAF50",
            marginBottom: "20px",
          }}
        >
          Hóa Đơn Thanh Toán
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>Khách hàng:</strong> {order?.customer?.name || "N/A"}
          </p>
          <p>
            <strong>Ngày đặt hàng:</strong> {order?.orderDate || "N/A"}
          </p>
          <p>
            <strong>Số khách:</strong> {order?.guests || "N/A"}
          </p>
          <p>
            <strong>Bàn ăn:</strong> {order?.banAn?.name || "N/A"}
          </p>
          <p>
            <strong>Giờ vào:</strong> {getTime(order?.timeIn) || "N/A"}
          </p>
          <p>
            <strong>Giờ ra:</strong> {getTimeNow() || "N/A"}
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            Danh Sách Món Ăn
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>STT</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Tên món
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Số lượng
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Giá</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderDishes?.map((orderDish, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderDish?.dish?.name || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderDish?.quantity || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderDish?.dish?.sellPrice || "N/A"} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            textAlign: "right",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Tổng Tiền:{" "}
          <span style={{ color: "#4CAF50", fontSize: "1.5rem" }}>
            {total(order) } đ
          </span>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            fontSize: "1rem",
            color: "#4CAF50",
            fontWeight: "bold",
          }}
        >
          Cảm ơn Quý Khách! Hẹn Gặp Lại!
        </p>
      </div>
    </div>
  );
}

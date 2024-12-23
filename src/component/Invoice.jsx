import React, { useEffect, useState } from 'react';
import "../App.css";

export default function Invoice({ order, print, total }) {
  const [isPrinted, setIsPrinted] = useState(false); // Trạng thái hiển thị

  useEffect(() => {
    console.log(order);
    if (print) {
      window.print(); // Gọi in
      setIsPrinted(true); // Đánh dấu đã in xong
      window.location.href = "/bill";
    }
  }, [print]);

  const getTime = (timeIn) => {
    const time = timeIn.split("T")[1].split(".")[0];
    return time;
  };

  const getTimeNow = () => {
    const now = Date.now();
    const date = new Date(now);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  if (!print || isPrinted) return null; // Nếu không cần in hoặc đã in xong, không hiển thị gì

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
            <strong>Khách hàng:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Ngày đặt hàng:</strong> {order.orderDate}
          </p>
          <p>
            <strong>Số khách:</strong> {order.guests}
          </p>
          <p>
            <strong>Bàn ăn:</strong> {order.banAn.name}
          </p>
          <p>
            <strong>Giờ vào:</strong> {getTime(order.timeIn)}
          </p>
          <p>
            <strong>Giờ ra:</strong> {getTimeNow()}
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
              {order.orderDishes.map((orderDish, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderDish.dish.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderDish.quantity}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {orderDish.dish.sellPrice} đ
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
            {total} đ
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
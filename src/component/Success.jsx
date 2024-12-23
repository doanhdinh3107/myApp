import React from 'react'
import "../App.css"
export default function Success() {
  return (
    <div className="thong-bao-container">
    <div className="thong-bao">
      <h2>Đặt bàn thành công!</h2>
      <p>Cảm ơn bạn đã đặt bàn. Chúng tôi đã nhận được yêu cầu của bạn và sẽ xác nhận sớm nhất.</p>
      <button onClick={() => window.location.href = '/'}>Trở về trang chủ</button>
    </div>
  </div>
  )
}

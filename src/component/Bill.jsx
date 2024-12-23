import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Button, Switch, TextField } from "@mui/material";
import { Link } from "react-router-dom"; // Đảm bảo bạn đã import Link
import axiosInstance from "../axios/axiosCustom";
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, Alert,CircularProgress } from '@mui/material'; 
import PaidIcon from '@mui/icons-material/Paid';
import Invoice from "./Invoice";
export default function Bill() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [billList, setBillList] = useState([]);
  const [elapsedTimes, setElapsedTimes] = useState({});
  const [customerPay, setCustomerPay] = useState(0);
  const [openPaymentModal, setOpenPaymentModal] = useState(false); 
  const [currentBillTotal, setCurrentBillTotal] = useState(); 
  const [remaining, setRemaining] = useState();
  const [openConfirm,setOpenConfirm]=useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [print,setPrint]=useState(false)
  const [orderCurrent,setOrderCurrent]=useState()
  const [checked, setChecked] = useState(false);
const [used,setUsed]=useState(false)
  const handleUseChange = () => {
    setChecked(!checked); 
    if(!used){
    setCurrentBillTotal(pre=>pre-orderCurrent.customer.point*1000);
    setRemaining(pre=>pre+orderCurrent.customer.point*1000)
  setUsed(true)
  }
  };
  useEffect(() => {
    axiosInstance.get("http://localhost:8080/comeBillList").then((res) => {
      console.log(res.data.result)
      setBillList(res.data.result);
// Khởi tạo thời gian đã trôi qua cho từng hóa đơn
      const initialElapsedTimes = res.data.result.reduce((acc, bill) => {
        acc[bill.id] = calculateElapsedTime(bill.timeIn);
        return acc;
      }, {});
      setElapsedTimes(initialElapsedTimes);
    });
  }, []);

  useEffect(() => {
      // Cập nhật thời gian đã trôi qua mỗi giây
    const interval = setInterval(() => {
      setElapsedTimes((prev) =>
        billList.reduce((acc, bill) => {
          acc[bill.id] = calculateElapsedTime(bill.timeIn);
          return acc;
        }, {})
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [billList]);
  // Hàm tính thời gian đã trôi qua
  const calculateElapsedTime = (timeIn) => {
    const timeInDate = new Date(timeIn);
    const now = new Date();
    const distance = Math.max(0, now - timeInDate);

    const hours = Math.floor(distance/ (1000 * 60 * 60));
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const total = (item) =>
    item.orderDishes.reduce(
      (acc, item) => acc + parseInt(item.dish.sellPrice) * parseInt(item.quantity),
      0
    );

    const handleCustomerPayChange = (e) => {
      console.log(e.target.value)
      const value = parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;// Remove non-numeric characters
      setCustomerPay(value);
      setRemaining(value-currentBillTotal);
    };
    const handlePaymentClick = (billTotal) => {
      setCurrentBillTotal(billTotal);
      setRemaining(-billTotal)
      setOpenPaymentModal(true); // Open the payment modal
    };
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
    const handleSuccessPay=()=>{
      setOpenPaymentModal(false)
      setCustomerPay(0)
      setOpenConfirm(true)
      setSnackbarMessage('Thanh Toán Thành Công');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      //goi api cap nhat du lieu
      axiosInstance.post("http://localhost:8080/paymentOrder",JSON.stringify({"id":orderCurrent.id})).
      then(res=>{
        console.log(res.data)
      })
    }
    const handlePrint=()=>{
      setPrint(true);  

    }
  return (
    <div>
      <div className="position-fixed">
        <Sidebar />
      </div>
      <div className="responsive">
        <div style={{ padding: "20px" }}>
          <h1 style={{ textAlign: "center", color: "#00796b" }}>Đơn Hiện Thời</h1>
        
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {billList &&
              billList.map((order) => (
                <div
                  key={order.id}
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
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "0 0 8px",
                      borderBottom: "solid 1px gray",
                      paddingBottom: "4px",
                    }}
                  >
                    {order.customer.name} - {order.customer.phone}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span role="img" aria-label="time" >
                        🕒
                      </span>
                      <span style={{color:"green"}}>{elapsedTimes[order.id] || "00:00:00"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span role="img" aria-label="people">
                        👥
                      </span>
                      <span>{order.guests} người</span>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#007BFF",
                    }}
                  >
                    {total(order).toLocaleString()} đ
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === order.id ? null : order.id);
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
                        <Link
                          to={`/select-table/${order.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <li
                            style={{
                              padding: "8px 16px",
                              cursor: "pointer",
                              transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#f5f5f5")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "white")
                            }
                          >
                            🪑 Chuyển bàn
                          </li>
                        </Link>
                        <Link
                          to={`/detailOrder/${order.id}`}
                          style={{ textDecoration: "none", color: "green" }}
                        >
                          <li
                            style={{
                              padding: "8px 16px",
                              cursor: "pointer",
                              transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#f5f5f5")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "white")
                            }
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
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f5f5f5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "white")
                          }
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
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        margin: 0,
                        color: "#333",
                      }}
                    >
                      🪑 {order.banAn ? order.banAn.name : "Chưa Xếp bàn"}
                    </h3>

                    <Button
                     onClick={() => {handlePaymentClick(total(order));setOrderCurrent(order)}}
                      style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        padding: "6px 12px",
                        fontSize: "14px",
                        fontWeight: "500",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Thanh Toán
                    </Button>
                  </div>
                  
                </div>
              ))
              }
          </div>
        </div>
      </div>
      {openPaymentModal&&(
         <div
         style={{
           position: "fixed",
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           backgroundColor: "rgba(0, 0, 0, 0.5)",
           zIndex: 1000,
         }}
       >
         <div
           style={{
             padding: "20px",
             width: "400px",
             margin: "auto",
             marginTop: "100px",
             borderRadius: "12px",
             backgroundColor: "#fff",
             boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
             position:"relative"
           }}
         >
          <CloseIcon onClick={()=>setOpenPaymentModal(false)} sx={{position:"absolute",top:"25px",right:"15px","&:hover":{cursor:"pointer"},color:"blue"}}></CloseIcon>
           <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Thanh toán</h2>
           <div style={{ marginBottom: "10px" }}>
             <TextField
               label="Cần thanh toán"
               value={`${currentBillTotal.toLocaleString()} ₫`}
               variant="outlined"
               fullWidth
               disabled
             />
           </div>
   
           <div style={{ marginBottom: "10px" }}>
             <TextField
               label="Khách trả"
               value={customerPay}
               onChange={handleCustomerPayChange}
               variant="outlined"
               fullWidth
             />
           </div>
   
           <div style={{ marginBottom: "20px" }}>
  <TextField
    label={remaining < 0 ? "Còn thiếu" : "Tiền Thừa"}
    value={`${remaining.toLocaleString()} ₫`}
    variant="outlined"
    fullWidth
    disabled
   style={{color: remaining < 0 ? "red" : "green",}}
  />
</div>
<Switch
      checked={checked}
      onClick={handleUseChange}
    
    />
    <span style={{color:"green"}}>{orderCurrent.customer.point} Point</span>

           <Button
             variant="contained"
             color="primary"
             fullWidth
             onClick={handleSuccessPay}
             disabled={remaining < 0}
             style={{ padding: "12px" }}
           >
             Xác nhận thanh toán
           </Button>
         </div>
       </div>
      )}
      {openConfirm && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        padding: "20px",
        width: "400px",
        borderRadius: "16px",
        margin: "auto",
        marginTop: "100px",
        background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        position: "relative",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#4CAF50",
        }}
      >
        🎉 Thông Báo
      </h2>
      <h3
        style={{
          fontSize: "1.6rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Thanh Toán Thành Công
      </h3>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "500",
          color: "#555",
          marginBottom: "30px",
        }}
      >
        Khách hàng đã tích thêm được{" "}
        <span style={{ fontWeight: "bold", color: "#4CAF50" }}>
          {`${Math.round(currentBillTotal / 100000)} điểm`}
        </span>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            background: "#4CAF50",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#45a049")}
          onMouseOut={(e) => (e.target.style.background = "#4CAF50")}
          onClick={()=>setOpenConfirm(false)}
        >
          Đóng
        </button>
        <button
        onClick={handlePrint}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            background: "#2196F3",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#1976D2")}
          onMouseOut={(e) => (e.target.style.background = "#2196F3")}
        >
          In Hóa Đơn
        </button>
      </div>
    </div>
  </div>
)}

       {/* Snackbar hiển thị thông báo */}
       <Snackbar 
        open={openSnackbar} 
       
        onClose={handleCloseSnackbar}
        autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* {hien thi hoa don } */}
      {billList&&print&&<Invoice print={print} order={orderCurrent} total={currentBillTotal}/>}
    </div>
  );
}

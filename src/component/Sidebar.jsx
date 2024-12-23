import React, { useState } from 'react';
import "../App.css";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TableBarIcon from '@mui/icons-material/TableBar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Face5Icon from '@mui/icons-material/Face5';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DnsIcon from '@mui/icons-material/Dns';
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';
import { Link } from 'react-router-dom';
export default function SideBar() {
   const [showSubItems, setShowSubItems] = useState(false);
   const [showBill, setShowBill] = useState(false);
   const [showUser,setShowUser]=useState(false)
  // Hàm toggle hiển thị menu con
  const toggleSubItems = () => {
    setShowSubItems(!showSubItems);
  };
  const toggleUser = () => {
    setShowUser(!showUser);
  };
  const toggleBill = () => {
    setShowBill(!showBill);
  };

  return (
    <div className="sidebar_class" style={{ color: "white" }}>
      <div
        className="sidebar_title"
        style={{
          padding: "24px 16px 4px 16px",
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid rgb(133, 135, 150)",
        }}
      >
        <div className="logo_sidebar" style={{ flexBasis: "30%", height: "50px" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="logo"
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-pizza-restaurant-logo-design-template-premium-vector-png-image_5435494.jpg"
            alt="Logo"
          />
        </div>
        <div
          className="textSideBar"
          style={{
            flexBasis: "60%",
            fontWeight: "800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h6>QUẢN LÝ QUÁN</h6>
        </div>
      </div>

      {/* Các mục sidebar */}
      <Link  className=" text-white" to="/dashboard">
      <div className="sidebar_item" style={{ display: "flex", padding: "16px" }}>
        <div className="icon_item" style={{ marginRight: "8px" }}>
          <DashboardIcon />
        </div>
        <div
          className="text_item"
          style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
        >
          <h6 style={{ margin: 0 }}>Thống kê</h6>
        </div>
      </div>
      </Link>
      <Link className=" text-white" to="/menu">
      <div className="sidebar_item" style={{ display: "flex", padding: "16px" }}>
        <div className="icon_item" style={{ marginRight: "8px" }}>
          <MenuBookIcon />
        </div>
        <div
          className="text_item"
          style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
        >
          <h6 style={{ margin: 0 }}>Menu</h6>
        </div>
      </div>
</Link>
      {/* Bàn ăn có menu con */}
      <div
        className="sidebar_item"
        style={{
          display: "flex",
          padding: "16px",
          justifyContent: "",
          cursor: "pointer",
        }}
        onClick={toggleSubItems}
      >
        <div className="icon_item" style={{ marginRight: "8px" }}>
          <TableBarIcon />
        </div>
        <div
          className="text_item"
          style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
        >
          <h6 style={{ margin: 0 }}>Bàn ăn</h6>
        </div>
      </div>

      {/* Hiển thị menu con nếu được click */}
      {showSubItems && (
        <div style={{ marginLeft: "32px" }}>
         <Link  className=" text-white" to="/map">
          <div className="sidebar_item" style={{ display: "flex", padding: "8px" }}>
            <div className="icon_item" style={{ marginRight: "8px" }}>
              <QueryStatsIcon />
            </div>
           
            <div
              className="text_item"
              style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
            >
              <h6 style={{ margin: 0 }}>Sơ đồ bàn</h6>
            </div>
          
          </div>
          </Link>
          <Link  className=" text-white" to="/schedule">
          <div className="sidebar_item" style={{ display: "flex", padding: "16px" }}>
            <div className="icon_item" style={{ marginRight: "8px" }}>
              <AccessAlarmIcon />
            </div>
            
           <div
              className="text_item"
              style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
            >
              <h6 style={{ margin: 0 }}>Lịch đặt bàn</h6>
            </div>
          
          </div>
          </Link>
        </div>
      )}

      <div className="sidebar_item" style={{ display: "flex", padding: "16px" , cursor: "pointer"}}
           onClick={toggleBill}>
        <div className="icon_item" style={{ marginRight: "8px" }}>
          <CreditCardIcon />
        </div>
        <div
          className="text_item"
          style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
        >
          <h6 style={{ margin: 0 }}>Hóa đơn</h6>
        </div>
      </div>
       {/* Hiển thị menu con nếu được click */}
       {showBill&& (
        <div style={{ marginLeft: "32px" }}>
             <Link  className=" text-white" to="/bill">
          <div className="sidebar_item" style={{ display: "flex", padding: "8px" }}>
            <div className="icon_item" style={{ marginRight: "8px" }}>
              <ReceiptLongIcon />
            </div>
        

            <div
              className="text_item"
              style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
            >
              <h6 style={{ margin: 0 }}>Đơn hiện thời</h6>
            </div>
           
          </div>
          </Link>
          <Link  className=" text-white" to="/history">
          <div className="sidebar_item" style={{ display: "flex", padding: "16px" }}>
            <div className="icon_item" style={{ marginRight: "8px" }}>
              <AssuredWorkloadIcon />
            </div>
            <div
              className="text_item"
              style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
            >
              <h6 style={{ margin: 0 }}>Lịch sử đơn</h6>
            </div>
          </div>
          </Link>
        </div>
      )}
    
      <div className="sidebar_item" style={{ display: "flex", padding: "16px",cursor:"pointer" }}
      onClick={toggleUser}
      >
        <div className="icon_item" style={{ marginRight: "8px" }}>
          <SupportAgentIcon />
        </div>
        <div
          className="text_item"
          style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
        >
          <h6 style={{ margin: 0 }}>Nhân viên</h6>
        </div>
      </div>
      {showUser&& (
        <div style={{ marginLeft: "32px" }}>
     
     <Link  className=" text-white" to="/user">
          <div className="sidebar_item" style={{ display: "flex", padding: "8px" }}>
            <div className="icon_item" style={{ marginRight: "8px" }}>
              <DnsIcon />
            </div>
          
            <div
              className="text_item"
              style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
            >
              <h6 style={{ margin: 0 }}>Danh sách nhân viên</h6>
            </div>
          
          </div>
          </Link>
          <Link  className=" text-white" to="/role">
          <div className="sidebar_item" style={{ display: "flex", padding: "16px" }}>
            <div className="icon_item" style={{ marginRight: "8px" }}>
              <PestControlRodentIcon/>
            </div>
            <div
              className="text_item"
              style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
            >
              <h6 style={{ margin: 0 }}>Phân quyền</h6>
            </div>
          </div>
          </Link>
        </div>
      )}
         <Link  className=" text-white" to="/customer-manage">
      <div className="sidebar_item" style={{ display: "flex", padding: "16px" }}>
        <div className="icon_item" style={{ marginRight: "8px" }}>
          <Face5Icon />
        </div>
        <div
          className="text_item"
          style={{ textAlign: "center", justifyContent: "center", alignContent: "center" }}
        >
          <h6 style={{ margin: 0 }}>Khách hàng</h6>
        </div>
      </div>
      </Link>
    </div>
  );
}

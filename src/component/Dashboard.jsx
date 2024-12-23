import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, CircularProgress, IconButton, Container, CardMedia, Rating, colors } from '@mui/material';
import Sidebar from './Sidebar';
import PaidIcon from '@mui/icons-material/Paid';

import {Line,Doughnut} from "react-chartjs-2"
import { Chart ,ArcElement ,CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import {Stomp} from "@stomp/stompjs"
import SockJS from 'sockjs-client';
import axiosInstance from '../axios/axiosCustom';
Chart.register(CategoryScale,ArcElement, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);
const DashBoard = () => {
  // Trạng thái hiện tại của vị trí dịch chuyển
  const [stompClient,setStompClient]=useState()

const [currentIndex,setCurrentIndex]=useState(0);
const [dataTk,setDataTk]=useState()
const [topDishes,setTopDishes]=useState([])
const [topCustomers,setTopCustomers]=useState([])
useEffect(()=>{
axiosInstance.get("http://localhost:8080/getDashboard")
.then(res=>{
  console.log(res.data.result)
 setDataTk(res.data.result)
 setTopDishes(res.data.result["topDish"])
  setTopCustomers(res.data.result["topCustomer"])
})
},[])
useEffect(() => {
  const connection = new SockJS("http://localhost:8080/ws");
  const stompJs = Stomp.over(connection);
  const onConnect=()=>{
    stompJs.subscribe(`/topic/public`, (mes) => {
      //cap nhat thoi gian thuc khi có sự thay đổi
      axiosInstance.get("http://localhost:8080/getDashboard")
      .then(res=>{
        console.log(res.data.result)
       setDataTk(res.data.result)
       setTopDishes(res.data.result["topDish"])
       setTopCustomers(res.data.result["topCustomer"])
      })
        });
       
  }
  const onError=(err)=>{
console.log(err);
  }
  stompJs.connect({},
   onConnect,
   onError
  );
setStompClient(stompJs);


return ()=>{
  if(stompClient){
    stompClient.disconnect();
  }
}
}, []);


  const chartDatas = {
    labels: dataTk?.topDish?.slice(0, 4).map(dish => dish.name) || [], 
    datasets: [
      {
        label: 'Số lượng',
        data: dataTk?.topDish?.slice(0, 4).map(dish => dish.soldQuantity) || [],// Dữ liệu cho từng phần
        backgroundColor: ['red', 'blue', 'yellow',"pink"], // Màu nền cho từng phần
        hoverOffset: 4, // Tạo hiệu ứng khi hover
      },
    ],
  };

const chartData = {
  labels: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: 'Doanh thu',
      data: dataTk?.doanhThu || [],
      borderColor: 'green',
      backgroundColor: 'rgba(0, 255, 0, 0.3)', // Màu nền trong suốt
      fill: true, // Bật fill
    },
    {
      label: 'Lợi nhuận',
      data: dataTk?.loiNhuan|| [],
      borderColor: 'blue',
      backgroundColor: 'blue',
      fill: true,
    },
  ],
};

// Các tùy chọn cho biểu đồ
const options = {
  responsive: true,
  plugins: {
    title: {
      display: false
    },
    tooltip: {
      mode: 'index', 
      intersect: false, 
      backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      titleColor: '#fff', 
      bodyColor: '#fff', 
   
    },
    legend: {
      position: "bottom",
    
    },
  },
 
  scales: {
    x: {
      grid: {
        display: false, // Ẩn các đường grid dọc
      },
    },
    
  },
};
const option = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Món ăn bán chạy',
      font: {
        size: 20, 
        family: 'Arial',
        weight: 'bold', 
      },
    },
    legend: {
      position: 'top', 
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màu nền của tooltip
      titleColor: '#fff', // Màu chữ tiêu đề
      bodyColor: '#fff', // Màu chữ nội dung tooltip
    },
  },
};


  const stats = [
    { title: 'Total Revenue', value: '$425k', icon: '💰' },
    { title: 'Total Menu', value: '325', icon: '🍔' },
    { title: 'Total Customers', value: '985', icon: '👤' },
    { title: 'Total Orders', value: '415', icon: '📋' },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
     
      setCurrentIndex((prevIndex) => {
        if(prevIndex===3){
          return 0
        }
        return (prevIndex +1)} );
    }, 3000); // Thời gian 3 giây
    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [topDishes]);
  const getIcon = (rank) => {
    switch (rank) {
      case 1:
        return <EmojiEventsIcon sx={{color:"rgb(195, 195, 76)"}}></EmojiEventsIcon>
      case 2:
        return <EmojiEventsIcon sx={{color:"gray"}}></EmojiEventsIcon>
      case 3:
        return <EmojiEventsIcon sx={{color:"brown"}}></EmojiEventsIcon>
      default:
        return <span className="rank-number">{rank}</span>;
    }
  };
 if(!dataTk) return(
 <div style={{margin:"auto"}}>
 <CircularProgress ></CircularProgress>
 </div>)
  return (
    <div>
    <div className="position-fixed">
      <Sidebar />
    </div>
      <div className="responsive" style={{backgroundColor:"rgb(245, 245, 245)"}}>
        
    <h1 style={{ textAlign: 'center', color: '#00796b' ,padding:"10px"}}>Thống kê</h1>
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6} md={3} >
          <Card
            sx={{
              textAlign: "center",
              background: "white",
              boxShadow: "4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.7)",
              borderRadius: "16px",
              padding: "20px",
              minHeight: "210px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <PaidIcon sx={{ color: "orange", fontSize: "50px", marginBottom: "12px" }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "gray",
                  marginBottom: "8px",
                }}
              >
               Món Ăn
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#222",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
          {dataTk["totalDish"]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
          <Card
            sx={{
              textAlign: "center",
              background: "white",
              boxShadow: "4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.7)",
              borderRadius: "16px",
              padding: "20px",
              minHeight: "210px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <PaidIcon sx={{ color: "orange", fontSize: "50px", marginBottom: "12px" }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "gray",
                  marginBottom: "8px",
                }}
              >
          Khách Hàng
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#222",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
            {dataTk["totalCustomer"]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
          <Card
            sx={{
              textAlign: "center",
              background: "white",
              boxShadow: "4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.7)",
              borderRadius: "16px",
              padding: "20px",
              minHeight: "210px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <PaidIcon sx={{ color: "orange", fontSize: "50px", marginBottom: "12px" }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "gray",
                  marginBottom: "8px",
                }}
              >
             Đơn Hàng
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#222",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
          {dataTk["totalOrder"]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} >
          <Card
            sx={{
              textAlign: "center",
              background: "white",
              boxShadow: "4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.7)",
              borderRadius: "16px",
              padding: "20px",
              minHeight: "210px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <PaidIcon sx={{ color: "orange", fontSize: "50px", marginBottom: "12px" }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "gray",
                  marginBottom: "8px",
                }}
              >
                Bàn ăn
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#222",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
          {dataTk["totalBanAn"]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

    </Grid>
      <div className="responsive-chart" style={{flexDirection:"column"}}>
      <h4 class="top-products-title">Doanh thu và lợi nhuận</h4>
      <Line className='line-chart' data={chartData} options={options} />
      </div>
      
      <div className="slider" style={{marginTop:"20px",borderRadius:"20px"}}>
      <h4 class="top-products-title">Top sản phẩm bán chạy</h4>
      <div
        className="slider_container"
        style={{
          transform: `translateX(-${currentIndex*33.33}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {topDishes.map((dish, index) => (
          <div className="slider_item" key={index}>
            <div
              style={{
                width: "80%",
                aspectRatio: "1/1",
                objectFit: "cover",
                margin: "auto",
              }}
            >
              <img
                src={dish.image_url.split(",")[0]}
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius:"20px"
                }}
                alt={dish.name}
              />
             <div className="product_info">
  <h4 className="content_image">{dish.name}</h4>
  <Rating className="product_rating" name="half-rating" defaultValue={5} precision={5} />
  <div className="quantity_image">{dish.soldQuantity} Lượt</div>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
    <div  style={{display:"flex"}}>
    <div className="chartDonut">
      
      <Doughnut className='chartDonutItem' data={chartDatas} options={option} />
      </div>
      <div className="top-customers">
      <h7>🏆 Top Khách hàng </h7>
      <table>
        <thead>
          <tr>
            <th>Thứ Hạng</th>
            <th>Tên Khách Hàng</th>
            <th>Điểm Thưởng</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{getIcon(index + 1)}</td>
              <td>{customer.name}</td>
              <td>{customer.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </Box>
   
     
    </div>
    </div>
  );
};

export default  DashBoard;

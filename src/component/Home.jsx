import React, { useEffect, useRef, useState } from 'react';
import '../style.css'; // Ensure the styles are imported properly
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {  IconButton, Button } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
const App = () => {

  const [headerHeight, setHeaderHeight] = useState(60); // Default header height
  const [menuOpen, setMenuOpen] = useState(false);
  const [myIndex, setMyIndex] = useState(0);
  const slidesRef = useRef([]);
 const [topDishes,setTopDishes]=useState([])
 useEffect(()=>{
  axios("http://localhost:8080/getTopDishes").
  then((res)=>{
setTopDishes(res.data.result)
  })
 },[])
  const displaySlide = () => {
    const slides = slidesRef.current;
    console.log(slides)
    if (slides.length === 0) return;

    // Ẩn tất cả các slide
    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    // Hiển thị slide tiếp theo
    const nextIndex = (myIndex + 1) % slides.length;
    slides[nextIndex].style.display = "block";
    setMyIndex(nextIndex);
  };
  useEffect(() => {
    // Tự động chạy `displaySlide` mỗi 2 giây
    const interval = setInterval(displaySlide, 2000);
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [myIndex]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setHeaderHeight(headerHeight === 60 ? 'auto' : 60);
  };



 
  return (
    <div id="main">
      <header id="header" style={{ height: headerHeight ,display:"flex",justifyContent:"space-between"}}>
        <ul id="nav">
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#band">Giới Thiệu</a></li>
          <li><a href="#tour">Đặt Trước</a></li>
          <li><a href="#contact">Liên hệ</a></li>
        </ul>
     
      <Link style={{alignSelf:"center"}} to={"/login"}><h5  style={{marginRight:"40px",color:"white"}}>Đăng nhập</h5></Link>  
      </header>
      <div
        className="mySlides"
        ref={(element) => (slidesRef.current[0] = element)}
        style={{ display: "block" }}
      >
        <img
          src="https://image-tc.galaxy.tf/wijpeg-c5byq6ssk21t0h97xnqwmf61/dining-room_standard.jpg?crop=111%2C0%2C1779%2C1334"
          style={{ width: "100%" ,height:"690px",objectFit:"cover"}}
          alt="Slide 1"
        />
      </div>
      <div
        className="mySlides"
        ref={(element) => (slidesRef.current[1] = element)}
        style={{ display: "none" }}
      >
        <img
          src="https://essencedining.com/wp-content/uploads/2021/01/IMG_2193.jpg"
          style={{ width: "100%" ,height:"690px",objectFit:"cover"}}
          alt="Slide 2"
        />
      </div>
      <div

        className="mySlides"
        ref={(element) => (slidesRef.current[2] = element)}
        style={{ display: "none" }}
      >
        <img
          src="https://sunhome.com.vn/wp-content/uploads/2021/07/Hotel-de-la-Coupole-Chic.jpg"
        style={{ width: "100%" ,height:"690px",objectFit:"cover"}}
          alt="Slide 3"
        />
      </div>
   
  

      <div id="content">
        {/* Band Section */}
        <div id="band" className="content-section">
          <h2 className="section-heading">Doanh SeaFood Restaurant</h2>
          <p className="section-subheading">Nhà hàng sang trọng</p>
          <p className="about-text">
          Nằm ngay trung tâm thành phố, nhà hàng Việt Nam là điểm đến lý tưởng cho những ai muốn thưởng thức những món ăn truyền thống của Việt Nam. Với không gian ấm cúng, gần gũi,mang lại cảm giác thật sự chill và hạnh phúc đến mọi người.
          </p>
        </div>

        {/* Tour Section */}
        <div id="tour" className="tour-section">
          <div className="content-section">
            <h2 className="section-heading text-white">Đặt bàn</h2>
            <p className="section-subheading text-white">Nhớ đặt bàn trước nha!</p>
            <ul className="tickets-list">
              <li>Tháng Hai  <span className="sold-out">Ưu đãi</span></li>
              <li>Tháng Ba <span className="sold-out">Ưu đãi</span></li>
              <li>Tháng Năm <span className="quantity"> 3</span></li>
            </ul>

            <div className="row places-list">
            {topDishes && topDishes.map((dish,index)=>
           (
            <div className="s-col-ful mt-16 col col-third" key={index}>
            <img src={dish.image_url.split(",")[0]} className="place-img" />
            <div className="place-body">
              <h3 className="place-heading">{dish.name}</h3>
              <p className="place-time">{dish.category.name}</p>
              <button className="s-full-width btn js-buy-ticket" >Đặt món</button>
            </div>
          </div>
           ) 
          )          
}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="content-section">
          <h2 className="section-heading">Liên Hệ</h2>
          <p className="section-subheading">Bạn có ấn tượng không?</p>
          <div className="row contact-content">
            <div className="s-col-ful col col-half contact-info">
              <p><i className="fas fa-map-marker-alt"></i> Họ tên</p>
              <p><i className="fas fa-phone"></i> Số điện thoại <a href="tel:+00 151515"></a></p>
              <p><i className="fas fa-envelope"></i> Email <a href="mailto:mail@mail.com"></a></p>
            </div>
            <div className="s-col-ful col col-half contact-form">
              <form action="">
                <div className="row">
                  <div className="s-col-ful col col-half">
                    <input className="form-control" required type="text" placeholder="Tên" />
                  </div>
                  <div className="s-col-ful col col-half s-mt-8">
                    <input className="form-control" required type="Email" placeholder="Số điện thoại" />
                  </div>
                </div>
                <div className="row mt-8">
                  <div className="col col-full">
                    <input className="form-control" required type="text" placeholder="Email" />
                  </div>
                </div>
                <input className="mt-16 form-submit btn s-full-width" type="submit" value="Gửi" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer" style={{backgroundColor:"black"}}>
            <div className="footer-content" >
           
              
                <img 
      className='logo'
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-pizza-restaurant-logo-design-template-premium-vector-png-image_5435494.jpg" // Thay logo của bạn ở đây
            alt="Logo"
            
          />

                <div className="social-icons">
                 <IconButton >
                 <FacebookIcon color='primary'></FacebookIcon>
                 </IconButton>
                  <IconButton >
                    <InstagramIcon color='success'></InstagramIcon>
                  </IconButton>
                  <IconButton >
                    <YouTubeIcon color='error'></YouTubeIcon>
                  </IconButton>
                  <IconButton >
                    <XIcon color='secondary'></XIcon>
                  </IconButton>
                </div>
            </div>
        </footer>
     

    </div>
  );
};

export default App;

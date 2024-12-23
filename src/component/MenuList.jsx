import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios/axiosCustom";
import Sidebar from "./Sidebar";
import { Pagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';

const MenuList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const [searchDishes, setSearchDishes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Tạo tham chiếu tới dropdown

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8080/dishes?page=${page}&size=${4}`)
      .then((response) => {
        setMenuItems(response.data.result.data);
        setTotalPages(response.data.result.totalPage);
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 500);
    return () => {
      clearTimeout(handle);
    };
  }, [searchValue]);

  useEffect(() => {
    if (debounceValue) {
      axiosInstance
        .get(`http://localhost:8080/searchDish?value=${debounceValue}`)
        .then((res) => {
          setSearchDishes(res.data.result);
          setIsDropdownOpen(res.data.result.length > 0);
        });
    } else {
      setIsDropdownOpen(false);
    }
  }, [debounceValue]);

  // Xử lý click bên ngoài dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) // Nếu click không thuộc dropdown
      ) {
        setIsDropdownOpen(false); // Đóng dropdown
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Dọn dẹp event listener khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handlePageChange = (e, page) => {
    setPage(page);
  };

  const getImage = (image_url) => {
    return image_url.split(",")[0];
  };
const handleEdit=(menu)=>{
window.location.href=`/edit/${menu.id}`
}
const handelDelete = (id) => {
  const confirmed = window.confirm("Bạn có chắc chắn muốn xóa món ăn này?");
  if (confirmed) {
    axiosInstance
      .post(`http://localhost:8080/deleteDish`,JSON.stringify({"id":id}))
      .then((response) => {
        alert("Xóa món ăn thành công!");
        setMenuItems(menuItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Lỗi khi xóa món ăn:", error);
        alert("Xóa món ăn thất bại, vui lòng thử lại.");
      });
  }
};

  return (
    <div>
      <div className="position-fixed">
        <Sidebar />
      </div>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="responsive">

<h1 style={{ textAlign: 'center', color: '#00796b',padding:"5px" }}>Quản lý menu</h1>
          <div className="menu-list">
        

            <div className="filter" style={{height:"130px"}}>
    <div className="title_filter" style={{display:"flex"}} >
        <h5 style={{padding:"10px",backgroundColor:"rgb(133, 135, 150,0.1)",border:"1px solid rgb(133, 135, 150,0.1)" ,fontWeight:"400",fontFamily:"Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI' ",color:"rgb(133, 135, 150,0.9)"}}>Thao tác và tìm kiếm</h5>
        <div className="search" >
              <input
                type="text"
                placeholder="Tìm món ăn"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={()=>setIsDropdownOpen(true)}
                className="search-input"
              />
              {isDropdownOpen &&searchDishes.length>0 && (
                <div className="dropdown" ref={dropdownRef}>
                  {searchDishes.map((dish) => (
                    <div onClick={()=>{window.location.href=`/search/${dish.name}`}} key={dish.id} className="dropdownItem" style={{display:"flex"}}>
                      <img
                        src={getImage(dish.image_url)}
                        alt={dish.name}
                        className="dropdown-image"
                      />
                      <div className="dropdown-content">
                        <p className="dropdown-name">{dish.name}</p>
                       
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
  {/* Lớp Overlay */}


  {isDropdownOpen && searchDishes.length>0&& (
              <div className="overlay" ></div>
            )}
          
    </div>
    <div className="filter_content"  style={{alignItems:"center"}}>
    <div className="filter_rank">
    <Link to={`/add-menu`}>
<Button variant="contained" startIcon={<PersonAddAltIcon></PersonAddAltIcon>} >
  Thêm Món Ăn
</Button>
</Link>
        </div>
        <Link to={`/add-category`}>
        <div className="filter_search">
        <Button variant="outlined" startIcon={<PersonAddAltIcon></PersonAddAltIcon>} >
  Thêm Danh Mục
</Button>
        </div>
        </Link>
        <div className="filter_fil" >
   Hiện tất cả
    </div>  
    </div>
            </div>
            <div className="menu-grid" style={{marginTop:"40px"}}>
              {menuItems &&
                menuItems.map((menu) => (
                  <div className="menu-card" key={menu.id}>
                    <div className="image">
                      <img
                        src={getImage(menu.image_url)}
                        alt={menu.name}
                        className="menu-image"
                      />
                    </div>
                    <div className="content">
                      <h3>{menu.name}</h3>
                      <p>{menu.category.name}</p>
                    </div>
                    <div className="actions">
                      <button className="action-btn delete" onClick={()=>handelDelete(menu.id)}>Delete</button>
                      <button className="action-btn edit" onClick={()=>handleEdit(menu)}>Edit</button>
                     
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Phân trang */}
          <div className="pagination-container">
            <Pagination
              color="secondary"
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;

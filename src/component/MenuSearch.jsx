import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios/axiosCustom";
import Sidebar from "./Sidebar";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";

const MenuSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDishes, setSearchDishes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Tạo tham chiếu tới dropdown
const {value}=useParams()
console.log(value)
  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8080/search?value=${value}`)
      .then((response) => {
        console.log(response.data.result);
        setMenuItems(response.data.result);
       
      });
    setLoading(false);
  }, []);

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


  const getImage = (image_url) => {
    return image_url.split(",")[0];
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
           {/* Thanh Search */}
           <div className="search-bar" style={{position:"fixed"}}>
              <input
                type="text"
                placeholder="Search"
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
  {isDropdownOpen && (
              <div className="overlay" ></div>
            )}
          <div className="menu-list">
           
            {/* Danh sách món ăn */}
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
                      <button className="action-btn delete">Delete</button>
                      <button className="action-btn edit">Edit</button>
                      <button className="action-btn view">View</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

   
        </div>
      )}
    </div>
  );
};

export default MenuSearch;

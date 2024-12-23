import React, { useEffect, useState } from "react";
import "../App.css";
import axiosInstance from "../axios/axiosCustom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import CloseIcon from '@mui/icons-material/Close';
const Order = () => {
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (category) {
      axiosInstance
        .post(
          "http://localhost:8080/getDishOfCategory",
          JSON.stringify({ name: category })
        )
        .then((response) => {
          const updatedMenuItems = response.data.result.map((item) => ({
            ...item,
            quantity: 0,
          }));
          setMenuItems(updatedMenuItems);
        });
    }
  }, [category]);

  useEffect(() => {
    axiosInstance.get("http://localhost:8080/getListCategory").then((res) => {
      setCategoryList(res.data.result);
      setCategory(res.data.result[0].name);
      setSelectedCategory(res.data.result[0].name);
    });
  }, []);

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    console.log(cart)
    saveCartToLocalStorage(cart);
  }, [cart]);

  const getImage = (image_url) => {
    return image_url.split(",")[0];
  };

  const handleAddMenu = (menu) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menu.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...menu, quantity: 1 }];
      }
    });
  };

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

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <div>
      <Box className="responsive" sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: " #4e73df" }}>
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
              Orders
            </Typography>
            <IconButton size="large" aria-label="show cart items" color="inherit" onClick={handleCartOpen}>
              <Badge badgeContent={cart.length} color="error">
                <RedeemIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="position-fixed">
        <div className="d-flex" style={{ height: "100vh", marginTop: "-64px" }}>
          <div className="text-white p-3 sidebar">
            <img
              className="logo"
              src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-pizza-restaurant-logo-design-template-premium-vector-png-image_5435494.jpg"
              alt="Logo"
            />
            <ul className="nav flex-column">
              {categoryList.length > 0 &&
                categoryList.map((item) => (
                  <li
                    key={item.name}
                    onClick={() => {
                      setCategory(item.name);
                      setSelectedCategory(item.name);
                    }}
                    className="nav-item cate_item"
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor:
                        selectedCategory === item.name
                          ? "#1d65b3"
                          : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <h4 style={{ color: "antiquewhite" }}>{item.name}</h4>
                  </li>
                ))}
            </ul>
          </div>
          </div>
          </div>
          <div className="responsive">
            <div className="menu-list" style={{marginTop:"25px"}}>
              <div className="menu-grid">
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
                        <button
                          onClick={() => handleAddMenu(menu)}
                          className="action-btn delete"
                        >
                          Đặt Món
                        </button>
                        <button className="action-btn view">View</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            </div>
       
  

      <Dialog
        open={isCartOpen}
        onClose={handleCartClose}
        PaperProps={{
          sx: {
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "400px",
          },
        }}
      >
        <div className="cart_header" style={{display:"flex",justifyContent:"space-between"}}>
        <DialogTitle>Giỏ hàng</DialogTitle>
        <IconButton onClick={handleCartClose}>
          <CloseIcon></CloseIcon>
        </IconButton>
        </div>
       
        
        <DialogContent dividers>
          {cart.length === 0 ? (
            <Typography>Giỏ hàng của bạn đang trống.</Typography>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item" style={{ marginBottom: "10px" }}>
                <div>
                  <h7>{item.name}</h7>    
                </div>
                <div>
                <button onClick={() => updateQuantity(item.id, "decrement")}>-</button>
                  <span style={{padding:"10px"}}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, "increment")}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)}>Xóa</button>
              </div>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
            window.location.href="/confirm-order"
              handleCartClose();
            }}
            variant="contained"
            color="primary"
          >
            Đặt hàng
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Order;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../App.css';
import axiosInstance from '../axios/axiosCustom';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../service/LocalStorageService';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const [email, setEmail] = useState('');
    const navigate=useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
      
        axiosInstance.post("http://localhost:8080/user/login", JSON.stringify({
            email: email,
            password: password
        }))
        .then(response => {
            console.log(response);
            setToken(response.data.result);
  navigate("/menu")
        })
        .catch((err) => {
            const errorMessage = err.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập';
            setError(errorMessage);
            setOpenSnackbar(true); // Hiển thị Snackbar khi có lỗi
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="body" style={{backgroundImage:"url('https://wallpapers.com/images/featured/restaurant-background-2ez77umko2vj5w02.jpg') no-repeat"}}>
            <div className="wrapper">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"s
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required
                        />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="remember-forgot">
  <label className="checkbox-label">
    <input
      type="checkbox"
      onChange={() => setShowPassword(!showPassword)}
    />
    <span className="checkbox-text">Show Password</span>
  </label>
  <Link to="/password/reset" className="forgot-password-link">
    Forgot Password?
  </Link>
</div>

                    <Button type="submit" variant="contained" color="primary" className="btn">
                        Login
                    </Button>
                </form>
            </div>

            {/* Snackbar hiển thị thông báo lỗi */}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}

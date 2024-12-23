import React, { useState } from 'react'
import "../App.css"
import { Snackbar, Alert ,CircularProgress} from '@mui/material'; 
import Sidebar from './Sidebar';
export default function AddUser() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' hoặc 'error'
    const [categories,setCategories]=useState([])
    const [isUploading, setIsUploading] = useState(false); 
    const [previewImage, setPreviewImage] = useState();
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file= e.target.files[0]
    setFormData({
      ...formData,
      image: file,
    });
    const imagePreview =  URL.createObjectURL(file);
    setPreviewImage(imagePreview);
  };
    const [formData, setFormData] = useState({
        name: '',
     email: '',
        password: '',
phone:"",
       role: '',
        image: '',

      });
      const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };
  return (
<div >
     
      <div className="position-fixed">
        <Sidebar />
      </div>

    
      <div className="responsives" >
       
          <h3 className="text-center">Thêm nhân viên</h3>
          <form  style={{width:"80%",margin:"auto",boxShadow:" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"30px",marginBottom:"20px"}} >
            <div >
              <label htmlFor="name" className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

         
            <div >
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>



            <div >
              <label htmlFor="role" className="form-label">Nhóm quyền</label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                    <option value="" disabled>
            -- Select a status --
          </option>
                <option value="Còn Hàng">Còn Hàng</option>
                <option value="Đã Hết">Đã Hết</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="form-label">Avatar</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image" 
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>

            {previewImage && (
              <div >
                <label className="form-label">Image Preview</label>
                <div className="d-flex flex-wrap gap-2">
                 
                    <img
                     
                      src={previewImage}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
           
                </div>
              </div>
            )}

        

            <button type="submit" className="btn btn-primary w-100"
             disabled={isUploading}>
            {isUploading ? (
                 <CircularProgress size={24} color="inherit" />
               ) : (
                 "  Thêm Nhân Viên"
               )}
            </button>
          </form>
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
        </div>
     
       
    </div>
  )
}

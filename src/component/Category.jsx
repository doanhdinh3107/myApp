import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import "../App.css"
import axiosInstance from '../axios/axiosCustom';
import axios from 'axios';
import { Snackbar, Alert,CircularProgress } from '@mui/material'; 
export default function Category() {

  const [previewImages, setPreviewImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // Theo dõi trạng thái tải
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
  });

  // State để kiểm soát việc hiển thị Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' hoặc 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra nếu formData đã đầy đủ và có hình ảnh
    if (formData.name && formData.description && formData.images.length > 0) {
      setIsUploading(true);
      // Tạo một FormData mới để gửi hình ảnh
      const uploadData = new FormData();
      // Lặp qua các tệp ảnh và thêm vào formData
      for (const file of formData.images) {
        uploadData.append('files', file);
      }

      // Gửi yêu cầu tải ảnh lên
      axios.post("http://localhost:8080/multiUpload", uploadData)
        .then(response => {
          console.log(response.data);
          console.log(formData);
          // Gửi yêu cầu tạo danh mục
          axiosInstance.post("http://localhost:8080/add-category", JSON.stringify({
            "name": formData.name,
            "description": formData.description,
            "images": response.data.result
          }))
          .then(res => {
            console.log(res);
            // Hiển thị Snackbar thành công
            setSnackbarMessage('Category added successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Reset formData và hình ảnh sau khi thành công
            setFormData({
              name: '',
              description: '',
              images: [],
            });
            setPreviewImages([]);
          
          })
        })
        .catch(err => {
          console.error('Error uploading files:', err);
          // Hiển thị Snackbar lỗi
          setSnackbarMessage('Failed to add category. Please try again.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      )
      .finally(() => {
        setIsUploading(false); // Kết thúc trạng thái tải lên
      });
        
    } else {
      alert('Please fill out all fields and upload images.');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
    setFormData({
      ...formData,
      images: files
    });
    return () => URL.revokeObjectURL(files);
  };

  // Hàm đóng Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="d-flex flex-wrap">
      <div className="position-fixed">
        <Sidebar />
      </div>
      <div className="flex-grow-1 responsives">
        <div className="container">
          <h3 className="text-center " style={{padding:"20px"}}>Thêm Danh Mục</h3>
          
          <form  onSubmit={handleSubmit}  style={{width:"80%",margin:"auto",boxShadow:" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"30px",marginBottom:"20px"}} >
            <div className="mb-3">
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

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Mô tả</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="images" className="form-label">Chọn ảnh</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>

            {previewImages.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Image Previews</label>
                <div className="d-flex flex-wrap gap-2">
                  {previewImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100"
             disabled={isUploading} // Vô hiệu hóa nút khi tải
             >
               {isUploading ? (
                 <CircularProgress size={24} color="inherit" />
               ) : (
                 "  Thêm danh mục"
               )}
            
            
            </button>
          </form>
        </div>
      </div>

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
  )
}

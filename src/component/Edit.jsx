import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import "../App.css"
import { Snackbar, Alert ,CircularProgress} from '@mui/material'; 
import axiosInstance from '../axios/axiosCustom';
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function Edit() {
const [dish,setDish]=useState()  
const {id}=useParams();
const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' hoặc 'error'
const [categories,setCategories]=useState([])
const [isUploading, setIsUploading] = useState(false); // Thêm state để theo dõi trạng thái tải
const [formData, setFormData] = useState({
  name: '',
  description: '',
  originalPrice: '',
  salePrice: '',
  quantity: '',
  status: 'available',
  images: [],
  category: 'Món Chính',
});
useEffect(()=>{
    axiosInstance.get(`http://localhost:8080/getDishItem?id=${id}`)
    .then(res=>{
        console.log(res.data)
        setDish(res.data.result)
        setFormData({
            name: res.data.result.name ,
            description: res.data.result.description ,
            originalPrice: res.data.result.rawPrice,
            salePrice: res.data.result.sellPrice,
            quantity: res.data.result.soldQuantity,
            status: res.data.result.status ,
            category: res.data.result.category || 'Món Chính', // Loại món ăn
          });
    })
},[])   

   
  useEffect(()=>{
  axiosInstance.get("http://localhost:8080/getListCategory")
  .then(response=>{
  setCategories(response.data.result)
  })
  },[])
    const [previewImages, setPreviewImages] = useState([]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: files,
      });
  
      const imagePreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(imagePreviews);
    };
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Kiểm tra nếu formData đã đầy đủ và có hình ảnh
      if (formData && formData.images.length > 0) {
        console.log(formData)
        setIsUploading(true); // Bắt đầu trạng thái tải lên
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
            axiosInstance.post(`http://localhost:8080/editDish`, JSON.stringify({
               "id":id,
            "name": formData.name,
              "description": formData.description,
              "rawPrice":formData.originalPrice,
              "sellPrice":formData.salePrice,
              "status":formData.status,
              "category":formData.category,
              "images": response.data.result
            }))
            .then(res => {
              console.log(res);
              // Hiển thị Snackbar thành công
              setSnackbarMessage('Dish edited successfully!');
              setSnackbarSeverity('success');
              setOpenSnackbar(true);
  
              // Reset formData và hình ảnh sau khi thành công
              setFormData({
                name: '',
                description: '',
                originalPrice: '',
                salePrice: '',
                quantity: '',
                status: 'available',
                images: [],
                category: '',
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
          })
          .finally(() => {
            setIsUploading(false); // Kết thúc trạng thái tải lên
          });
      } else {
        alert('Please fill out all fields and upload images.');
       }
    };
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
    if(!dish) return (<h1>loading....</h1>)
  return (
<div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="position-fixed" style={{ width: '250px',margin:"auto" }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 responsives" >
        <div className="container">
          <h3 className="text-center " style={{padding:"20px"}}>Thêm món ăn</h3>
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
              <label htmlFor="description" className="form-label">Miêu Tả</label>
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
              <label htmlFor="originalPrice" className="form-label">Giá Gốc</label>
              <input
                type="number"
                className="form-control"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="salePrice" className="form-label">Giá Bán</label>
              <input
                type="number"
                className="form-control"
                id="salePrice"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Số Lượng Kho</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">Trạng Thái</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                    <option value="" disabled>
            -- Select a status --
          </option>
                <option value="Còn Hàng">Còn Hàng</option>
                <option value="Đã Hết">Đã Hết</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="images" className="form-label">Ảnh Món Ăn</label>
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

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                   <option value="" disabled>
            -- Select a category --
          </option>
             {categories.map(category=>
              ( <option value={category.name}>{category.name}</option>)
             )}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100"
             disabled={isUploading}>
            {isUploading ? (
                 <CircularProgress size={24} color="inherit" />
               ) : (
                 "  Sửa Món"
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

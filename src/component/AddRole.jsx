import React, { useState } from 'react'
import "../App.css"
import { Snackbar, Alert ,CircularProgress} from '@mui/material'; 
import Sidebar from './Sidebar';
export default function AddRole() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [isUploading, setIsUploading] = useState(false);  // 'success' hoặc 'error'
    const [formData, setFormData] = useState({
        name: '',
    description: '',
      });
      const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
 return (
<div >
     
     <div className="position-fixed">
       <Sidebar />
     </div>

   
     <div className="responsives" >
      
         <h3 className="text-center">Thêm nhóm quyền</h3>
         <form  style={{width:"80%",margin:"auto",boxShadow:" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"30px",marginBottom:"20px"}} >
           <div >
             <label htmlFor="name" className="form-label">Tên nhóm</label>
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

          

           <div >
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
        
          
           <button type="submit" className="btn btn-primary w-100"
            disabled={isUploading}>
           {isUploading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "  Thêm Nhóm quyền "
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

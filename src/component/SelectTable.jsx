import React, { useEffect, useState } from "react";
import "../App.css";
import Sidebar from "./Sidebar";
import axiosInstance from "../axios/axiosCustom";
import { Grid, Card, CardContent, Typography, IconButton, Button } from "@mui/material";
import { Snackbar, Alert ,CircularProgress} from '@mui/material'; 
import "../App.css";
import { useParams } from "react-router-dom";

export default function SelectTable() {
  const [tables, setTableList] = useState([]); // Danh sách bàn
  const { id } = useParams();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [selectedTable, setSelectedTable] = useState(null); // Bàn được chọn
  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    axiosInstance.get("http://localhost:8080/getListTable").then((response) => {
      setTableList(response.data.result);
    });
  }, []);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleSelect = (table) => {
    // Kiểm tra nếu bàn đã được "reserved", không cho chọn
    if (table.status === "reserved") {
        setSnackbarMessage('Bàn đã được chọn!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
    }
    setSelectedTable(table.id);
  };
  const handleSaveTable = () => {
    if (selectedTable) {

      axiosInstance
        .post("http://localhost:8080/saveTable",JSON.stringify({ "tableId": selectedTable,"orderId":id }))
        .then((response) => {
          console.log(response)
          setSnackbarMessage("Bàn đã được lưu thành công!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          if(response.data.result.status==="come"){
window.location.href="/bill"
          }
           else{window.location.href="/schedule"}
        })
        .catch((error) => {
          setSnackbarMessage("Lưu bàn thất bại!");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  };
  return (
    <div>
      <div className="position-fixed">
        <Sidebar />
      </div>
      <div className="responsive">
        <h1 style={{ textAlign: "center", color: "#00796b" }}>Chọn Bàn</h1>
        <Grid container spacing={3} sx={{ padding: "20px" }}>
          {tables.map((table) => (
            <Grid item xs={12} sm={6} md={4} key={table.id}>
              <Card
                onClick={() => handleSelect(table)}
                sx={{
                  "&:hover": { backgroundColor: "whitesmoke", cursor: "pointer" },
                  border:
                    table.id === selectedTable
                      ? "2px solid green" // Viền xanh khi được chọn
                      : "none",
                }}
                className={`table-card ${
                  table.status === "reserved" ? "reserved" : "available"
                }`}
              >
                <CardContent>
                  <img
                    src={
                      table.status === "reserved"
                        ? "https://t4.ftcdn.net/jpg/09/38/32/41/360_F_938324181_NKpsHA3onPqIjGMbFEUXWZIHaVhWPnfP.jpg"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJmZnMKoJz32qzxOPBF6C9lwDw-Xf5dUcj_NRIwZJEp1OWbHjGWWNOxw21rne7UCzZl0&usqp=CAU"
                    }
                    alt="Table Icon"
                    className="table-icon"
                  />
        
                  <Typography variant="h6" align="center" sx={{ color: "plum" }}>
                    {table.name}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {table.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
         {/* Nút Lưu Bàn */}
         {selectedTable && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveTable}
            >
              Lưu Bàn
            </Button>
          </div>
        )}
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
 
  );
}

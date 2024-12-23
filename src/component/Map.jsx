import React, { useEffect, useState } from 'react'

import "../App.css"
import Sidebar from "./Sidebar";
import axiosInstance from "../axios/axiosCustom";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import "../App.css"
export default function Map() {
    const [tables,setTableList]=useState([])
    useEffect(()=>{
        axiosInstance.get("http://localhost:8080/getListTable")
        .then(response=>{
         setTableList(response.data.result)
        })
    },[])
 
  return (
    <div>
  
    <div className="position-fixed">
      <Sidebar />
    </div>
    <div className='responsive'  >

    <h1 style={{ textAlign: 'center', color: '#00796b' ,padding:"20px"}}>Sơ Đồ Bàn</h1>
    
    <Grid container spacing={3} sx={{padding:"20px"}}>
      {tables.map((table) => (
        <Grid item xs={12} sm={6} md={4} key={table.id}>
          <Card
            className={`table-card ${
              table.status === 'reserved' ? 'reserved' : 'available'
            }`}
          >
            <CardContent>
              <img
                src={
                  table.status === 'reserved'
                    ? 'https://t4.ftcdn.net/jpg/09/38/32/41/360_F_938324181_NKpsHA3onPqIjGMbFEUXWZIHaVhWPnfP.jpg'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJmZnMKoJz32qzxOPBF6C9lwDw-Xf5dUcj_NRIwZJEp1OWbHjGWWNOxw21rne7UCzZl0&usqp=CAU'
                }
                alt="Table Icon"
                className="table-icon"
              />
              <Typography variant="h6" align="center" sx={{color:"plum"}}>
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
        </div>
        </div>
  )
}

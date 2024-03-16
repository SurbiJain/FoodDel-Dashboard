import React, { createContext, useEffect, useState } from "react";
import axios from "../../hooks/axios";
import { DataGrid } from "@mui/x-data-grid";
import * as moment from "moment";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";


const Stores = () => {
  const [store, setStore] = useState();
  
  

  const columns = [
    { field: "id", headerName: "Store ID", minWidth: 100, flex: 1 / 2 },
    {
      field: "title",
      headerName: "Title",
      valueGetter: (params) => params.row.title,
      minWidth: 100,
      flex: 1,
    },
    { field: "email", headerName: "Email Address", minWidth: 100, flex: 2 },
    {
      field: "gsm",
      headerName: "Phone Number",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "address.text",
      headerName: "Address",
      valueGetter: (params) => params.row.address.text,
      minWidth: 100,
      flex: 2,
    },

    {
      field: "isActive",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <div
            style={{
              border: 1,
              borderRadius: 10,
              width: 70,
              height: 30,
              backgroundColor: params.row.isActive === true ? "green" : "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
           {params.row.isActive === true ? "Open"   : "Closed"} 
           {params.row.isActive === true ? <CheckIcon/>   : <ClearIcon/>} 
            
            
          </div>
        );
      },
      minWidth: 100,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
      <Link to={`/stores/edit/${params.row.id}`}>
       <Button>
        <VisibilityOutlinedIcon fontSize="large" sx={{color: "white"}}/>
       </Button>
       </Link>
      ),
      minWidth: 100,
      flex: 1,
      onclick: {onclick}
    },
   
    
  ];

  useEffect(() => {
    axios.get("/stores").then(function (response) {
      setStore(response.data);
    });
  }, []);

  return (
    store && (
      <>
        <Typography variant="h1" textAlign="center">
          Stores
        </Typography>
        <Box display="flex" sx={{ columnGap: 2, m: 2 }}>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={store}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20, 50, 100]}
            />
          </div>
        </Box>
      </>
    )
  );
};

export default Stores;

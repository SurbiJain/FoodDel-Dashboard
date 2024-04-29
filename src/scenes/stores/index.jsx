import React, { useEffect, useState } from "react";
import axios from "../../hooks/axios";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import {  Button, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import "./index.css";

const Stores = () => {
  const [store, setStore] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns = [
    { field: "id", headerName: "Store ID", minWidth: 100, flex: 1/3 },
    {
      field: "title",
      headerName: "Title",
      valueGetter: (params) => params.row.title,
      minWidth: 150,
      flex: 1/2,
    },
    { field: "email", headerName: "Email Address", minWidth: 200, flex: 1 },
    {
      field: "gsm",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 1/2,
    },
    {
      field: "address.text",
      headerName: "Address",
      valueGetter: (params) => params.row.address.text,
      minWidth: 300,
      flex: 1,
    },

    {
      field: "isActive",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <div
            className="tableStatus"
            style={{
              backgroundColor: params.row.isActive === true ? "green" : "gray",
            }}
          >
            {params.row.isActive === true ? "Open" : "Closed"}
            {params.row.isActive === true ? <CheckIcon /> : <ClearIcon />}
          </div>
        );
      },
      minWidth: 100,
      flex: 1/2,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Link to={`/stores/edit/${params.row.id}`}>
          <div className="tableActions">
            <Button>
              <VisibilityOutlinedIcon
                fontSize="small"
                sx={{ color: "white" }}
              />
            </Button>
          </div>
        </Link>
      ),
      minWidth: 100,
      flex: 1/2,
      onclick: { onclick },
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
        <div className="mainContainer">
          <div className="header">
            <div>
              <Typography
                variant={width > 1000 ? "h1" : "h3"}
                fontWeight="bolder"
              >
                Stores
              </Typography>
            </div>
            <div>
              <Link to="/stores/new">
              <Button variant="contained" >Add New Store</Button>
              </Link>
            </div>
          </div>
          <div className="storeTable">
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
        </div>
      </>
    )
  );
};

export default Stores;

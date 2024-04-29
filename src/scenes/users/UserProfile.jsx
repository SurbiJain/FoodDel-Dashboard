import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../hooks/axios";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { Link } from "react-router-dom";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import "./index.css";

const UserProfile = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    axios.get(`/users/${userId}`).then(function (response) {
      setUser(response.data);
    });

    axios
      .get(
        `/orders?_end=4&_order=desc&_sort=createdAt&_start=0&user.id=${userId}`
      )
      .then(function (response) {
        setOrder(response.data);
      });
  }, []);

  const columns = [
    {
      field: "orderNumber",
      headerName: "Order Number",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      valueGetter: (params) => params.row.status.text,
      minWidth: 100,
      flex: 1 / 2,
    },
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 1 / 2 },
    {
      field: "store",
      headerName: "Store",
      valueGetter: (params) => params.row.store.title,
      minWidth: 100,
      flex: 2,
    },
    {
      field: "fullName",
      headerName: "User",
      valueGetter: (params) => params.row.user.fullName,
      minWidth: 100,
      flex: 2,
    },
    {
      field: "products",
      headerName: "Products",
      valueGetter: (params) => params.row.products.length + " Items",
      minWidth: 100,
      flex: 1 / 2,
    },
    {
      field: "createdAt",
      headerName: "Created At",

      minWidth: 100,
      flex: 1,
    },
  ];
  const column = [
    {
      field: "text",
      headerName: "Address",
      minWidth: 100,
      flex: 1,
    },
  ];

  return (
    user && (
      <>
        <div className="mainContainer">
          <div className="userContainer">
            <div className="userBox">
              <Box sx={{ marginTop: 3, textAlign: "center" }}>
                <img src={user?.avatar[0].url} style={{ borderRadius: 70 }} />
                <Typography variant="h3">{user?.fullName}</Typography>
              </Box>

              <Box sx={{ marginTop: 3, marginLeft: 2 }}>
                <Box display="flex" sx={{ marginTop: 1 }}>
                  <PersonOutlineOutlinedIcon />
                  <Typography variant="h10">{user?.gender}</Typography>
                </Box>
                <Box display="flex" sx={{ marginTop: 1 }}>
                  <PhoneEnabledOutlinedIcon />
                  <Typography variant="h10">{user?.gsm}</Typography>
                </Box>
                <Box display="flex" sx={{ marginTop: 1 }}>
                  <CalendarTodayOutlinedIcon />
                  <Typography variant="h10">{user?.createdAt}</Typography>
                </Box>
                <Box display="flex" sx={{ marginTop: 1 }}>
                  {user?.isActive ? <CheckOutlinedIcon /> : <CloseIcon />}
                  <Typography> {user?.isActive ? "Yes" : "No"}</Typography>
                </Box>
              </Box>
            </div>
            
              <Box sx={{ display: "flex", gap: 1 }}>
                <SpeedOutlinedIcon />
                <Typography variant="h10">/</Typography>
                <GroupAddOutlinedIcon />
                <Link
                  to={`/users`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="h10"> Users /</Typography>
                </Link>
                <Typography variant="h10">Show</Typography>
              </Box>
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h3">Orders</Typography>
              </Box>
              {order?.length > 0 ? (
                <div className="userTable">
                  <DataGrid
                    className="user_table"
                    rows={order}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                  />
                </div>
              ) : (
                <Box sx={{ marginTop: 3, textAlign: "center" }}>
                  <FilterAltOutlinedIcon fontSize="large" />
                  <Typography variant="h5">No Order to Show</Typography>
                </Box>
              )}
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h3">Addresses</Typography>
              </Box>
              {user && (
                <div className="userTable">
                  <DataGrid
                    className="user_table"
                    rows={user.addresses}
                    getRowId={(row) => row.text}
                    columns={column}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                  />
                </div>
              )}
            
          </div>
        </div>
      </>
    )
  );
};

export default UserProfile;

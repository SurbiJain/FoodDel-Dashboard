import React, { useContext, useEffect, useState } from "react";
import axios from "../../hooks/axios";
import useAxios from "./../../hooks/useAxios";
import { DataGrid } from "@mui/x-data-grid";
import * as moment from "moment";
import { Box, Button, Typography } from "@mui/material";
import Filter from "./../../global/Filter";
import { FilterContext } from "./../../App";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";

const columns = [
  { field: "gsm", headerName: "Gsm Number", minWidth: 100, flex: 3,  },
  {
    field: "avatar",
    headerName: "Avatar",
    renderCell: (params) => (
      <img src={params.row.avatar[0].url} width="30" style={{borderRadius: 20}}/>
    ),
    minWidth: 100,
    flex: 1 / 2,
    
  },
  {
    field: "firstName",
    headerName: "First Name", 
    minWidth: 100,
    flex: 2,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    minWidth: 100,
    flex: 2,
  },
  {
    field: "gender",
    headerName: "Gender",
    minWidth: 100,
    flex: 1 / 2,
  },
  {
    field: "isActive",
    headerName: "Is Active",
    minWidth: 100,
    flex: 1 / 2,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    valueGetter: (params) =>
      moment(params.row.createdAt).format("MMM DD, YYYY"),
    minWidth: 100,
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actios",
    renderCell: (params) => (
    <Link to={`/users/${params.row.id}`}>
     <Button>
      <VisibilityOutlinedIcon fontSize="Medium" sx={{color: "white"}}/>
     </Button>
     </Link>
    ),
    minWidth: 100,
    flex: 1,
    onclick: {onclick}
  },
  
];


const Users = () => {
  let [filteredUsers, setFilteredUsers] = useState([]);
  
  



  const [users] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/users",
  });
  const {filterData, setFilterData} = useContext(FilterContext);

  useEffect(() => {
    setFilteredUsers(users);
    console.log(filterData);

    if (
      filterData.search ||
      filterData.store ||
      filterData.user ||
      filterData.status ||
      filterData.startDate
    ) {
      const TempUsers = users.filter((entry) => {
        const createdAt = moment(entry.createdAt).format("YYYY-MM-DD");
        const startDate = moment(filterData.startDate).format("YYYY-MM-DD");
        const endDate = moment(filterData.endDate).format("YYYY-MM-DD");

        console.log(
          entry.orderNumber,
          moment(createdAt).isBetween(startDate, endDate, undefined, "[]"),
          createdAt,
          startDate,
          endDate
        );

        return (
          entry.store.title === filterData.search ||
          String(entry.orderNumber) === filterData.search ||
          entry.user.fullName === filterData.search ||
          entry.status.text === filterData.search ||
          entry.store.title === filterData.store ||
          entry.user.fullName === filterData.user ||
          filterData.status.includes(entry.status.text) ||
          moment(createdAt).isBetween(startDate, endDate, undefined, "[]") ===
            true
        );
      });
      setFilteredUsers(TempUsers);
    }
  }, [filterData, users]);

  const onclick = ()=>{}
 
  

  return (filteredUsers &&
      <>
        <Typography variant="h1" textAlign="center">
          Users
        </Typography>
        <Box display="flex" sx={{ columnGap: 2, m: 2 }}>
          <Box width="30%">
            <Filter />
          </Box>

          <div style={{ height: "100%", width: "70%" }}>
            <DataGrid
              rows={filteredUsers}
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
  );
};

export default Users;

import React, { createContext, useEffect, useState } from "react";
import axios from "../../hooks/axios";
import { DataGrid } from "@mui/x-data-grid";
import * as moment from "moment";
import { Box, Button, Typography } from "@mui/material";
import Filter from "./Filter";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom";
export const UserFilterContext = createContext();
export const UserStartDateContext = createContext();
export const UserEndDateContext = createContext();

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
    headerName: "Actions",
    renderCell: (params) => (
    <Link to={`/user/${params.row.id}`}>
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


const Users = () => {
  const [users, setUsers] = useState()
  const [filterData, setFilterData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
   let [filteredUser, setFilteredUser] = useState([]);
  

  useEffect(()=>{axios.get("/users").then(function (response) {
    setUsers(response.data);
  })},[])
  

  

  useEffect(() => {
    setFilteredUser(users);
    
    if ((filterData) &&
      (filterData.search ||
      filterData.gender ||
      filterData.activeStatus ||
      filterData.startDate)
    ) {
      const TempUsers = users.filter((entry) => {
        const createdAt = moment(entry.createdAt).format("YYYY-MM-DD");
        const startDate = filterData.startDate ? moment(filterData.startDate).format("YYYY-MM-DD") : null;
        const endDate = filterData.endDate ? moment(filterData.endDate).format("YYYY-MM-DD") : null;

       
        return (
          entry.firstName === filterData.search ||
          String(entry.isActive) === filterData.activeStatus ||
          String(entry.isActive) === filterData.search ||
          entry.gender === filterData.gender ||
          moment(createdAt).isBetween(startDate, endDate, undefined, "[]") === true
        );
      });
      setFilteredUser(TempUsers);
    }
  }, [filterData, users]);

 
 
  

  return (filteredUser&&
   
      <>
        <Typography variant="h1" textAlign="center">
          Users
        </Typography>
        <Box display="flex" sx={{ columnGap: 2, m: 2 }}>
        <UserFilterContext.Provider value={{ filterData, setFilterData }}>
            <UserStartDateContext.Provider value={{ startDate, setStartDate }}>
              <UserEndDateContext.Provider value={{ endDate, setEndDate }}>
          <Box width="30%">
            <Filter />
          </Box>
          </UserEndDateContext.Provider>
            </UserStartDateContext.Provider>
          </UserFilterContext.Provider>

          <div style={{ height: "100%", width: "70%" }}>
            <DataGrid
              rows={filteredUser}
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

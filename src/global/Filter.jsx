import React, { useContext, useEffect, createContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import axios from "./../hooks/axios";
import useAxios from "./../hooks/useAxios";
import { useFormik } from "formik";
import { setFilterContext } from "../scenes/orders";
import DateSelector from "./DatePicker";


export const startDateContext = createContext();
export const endDateContext = createContext();

const Filter = () => {
  const setFilterData = useContext(setFilterContext);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  let [store] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/stores",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  let [user] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/users",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  let [status] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/orderStatuses",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  const handleEventChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStatus(typeof value === "string" ? value.split(",") : value);
    formik.handleChange(event);
  };

  const formik = useFormik({
    initialValues: {
      status: [],
      store: "",
      search: "",
      user: "",
      
    },
    onSubmit: (values) => {
      setFilterData({...values,
        startDate: startDate,
        endDate: endDate
      });
    },
  });
  

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        display="flex"
        flexdirection="column"
        sx={{
          rowGap: 2,
          width: 1 / 3,
          border: 1,
          borderRadius: 1,
          p: 2,
          mt: 1,
        }}
      >
        <Typography variant="h3" textAlign="center">
          Filters
        </Typography>

        <Box>
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            name="search"
            onChange={formik.handleChange}
            value={formik.values.search}
            placeholder="Search by Order Name, User, etc.,"
            fullWidth={true}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
            <Select
              name="status"
              value={selectedStatus}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Status"
              multiple
              onChange={handleEventChange}
            >
              {status.map((e) => {
                return (
                  <MenuItem value={e.text} key={e.id}>
                    {e.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <InputLabel>Store</InputLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Search Store</InputLabel>
            <Select
              name="store"
              onChange={formik.handleChange}
              value={formik.values.store}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Store"
            >
              {store.map((e) => {
                return (
                  <MenuItem value={e.title} key={e.id}>
                    {e.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <InputLabel>User</InputLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Search User</InputLabel>
            <Select
              name="user"
              onChange={formik.handleChange}
              value={formik.values.user}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="User Name"
            >
              {user.map((e) => {
                return (
                  <MenuItem value={e.fullName} key={e.id}>
                    {e.fullName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
              <startDateContext.Provider value={{startDate, setStartDate}}>
              <endDateContext.Provider value={{endDate, setEndDate}}>
              <Box paddingTop="0">
              <InputLabel>Created At</InputLabel>
              <DateSelector />
            </Box>
              </endDateContext.Provider>
              </startDateContext.Provider>
            
          
        <Button variant="contained" type="submit" fullWidth={true}>
          Filter
        </Button>
      </form>
    </>
  );
};

export default Filter;

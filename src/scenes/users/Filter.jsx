import React, { useContext,  useState } from "react";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import DateSelector from "./DatePicker";
import { UserFilterContext, UserStartDateContext, UserEndDateContext } from "./index";

const Filter = () => {
  const {filterData, setFilterData} = useContext(UserFilterContext);
  const {startDate, setStartDate} = useContext(UserStartDateContext);
  const {endDate, setEndData} = useContext(UserEndDateContext);
  
  
  const formik = useFormik({
    initialValues: {
      search:"",
      gender: "",
      activeStatus: null,
      
      
    },
    onSubmit: (values) => {
      setFilterData({...values,
        startDate: startDate,
        endDate: endDate
      });
      console.log(values)
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
        <Box paddingTop="0">
              <InputLabel>Created At</InputLabel>
              <DateSelector/>
            </Box>

        <Box sx={{ minWidth: 120 }}>
          <InputLabel>Gender</InputLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              name="gender"
              // value={formik.values.activeStatus}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Gender"
              onChange={formik.handleChange}
            >
            
                  <MenuItem value={"Female"} key={1}>
                    Female
                  </MenuItem>
                  <MenuItem value={"Male"} key={2}>
                   Male
                  </MenuItem>
                
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <InputLabel>Active</InputLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Active</InputLabel>
            <Select
              name="activeStatus"
              // value={formik.values.activeStatus}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Status"
              onChange={formik.handleChange}
            >
            
                  <MenuItem value={"true"} key={1}>
                    Yes
                  </MenuItem>
                  <MenuItem value={"false"} key={2}>
                   No
                  </MenuItem>
                
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" type="submit" fullWidth={true}>
          Filter
        </Button>
      </form>
    </>
  );
};

export default Filter;

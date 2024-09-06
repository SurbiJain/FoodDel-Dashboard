import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import axios from "../../hooks/axios";
import { useFormik } from "formik";
import DateSelector from "./DatePicker";
import { FilterContext, startDateContext, endDateContext } from "./index";

const Filter = () => {
  const { filterData, setFilterData } = useContext(FilterContext);
  const { startDate, setStartDate } = useContext(startDateContext);
  const { endDate, setEndData } = useContext(endDateContext);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [store, setStore] = useState();
  const [user, setUser] = useState();
  const [status, setStatus] = useState();
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

  useEffect(() => {
    let ignore = false;
    axios.get("/stores").then(function (response) {
      if (!ignore) {
        setStore(response.data);
      }
    });

    axios.get("/users").then(function (response) {
      if (!ignore) {
        setUser(response.data);
      }
    });
    axios.get("/orderStatuses").then(function (response) {
      if (!ignore) {
        setStatus(response.data);
      }
    });
  }, []);

  const handleEventChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedStatus(typeof value === "string" ? value.split(",") : value);
    formik.handleChange(event);
  };

  const formik = useFormik({
    initialValues: {
      search: "",
      status: [],
      store: "",
      search: "",
      user: "",
    },
    onSubmit: (values) => {
      setFilterData({ ...values, startDate: startDate, endDate: endDate });
    },
  });

  return (
    <>
      <div className="filterForm">
        <form
          onSubmit={formik.handleSubmit}
          display="flex"
          flexdirection="column"
          
        >
          <Typography variant={width > 1000 ? "h3" : "h5"} textAlign="center">
            Filters
          </Typography>

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
              {status &&
                status.map((e) => {
                  return (
                    <MenuItem value={e.text} key={e.id}>
                      {e.text}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

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
              {store &&
                store.map((e) => {
                  return (
                    <MenuItem value={e.title} key={e.id}>
                      {e.title}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <InputLabel>User</InputLabel>
          {user && (
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
                {user?.map((e) => {
                  return (
                    <MenuItem value={e.fullName} key={e.id}>
                      {e.fullName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}

          <InputLabel>Created At</InputLabel>
          <DateSelector />

          <Button variant="contained" type="submit" fullWidth={true}>
            Filter
          </Button>
        </form>
      </div>
    </>
  );
};

export default Filter;

import React, { createContext, useEffect, useState } from "react";
import axios from "../../hooks/axios";
import useAxios from "./../../hooks/useAxios";
import { DataGrid } from "@mui/x-data-grid";
import * as moment from "moment";
import { Box, Typography } from "@mui/material";
import Filter from "./Filter";

export const FilterContext = createContext();
export const startDateContext = createContext();
export const endDateContext = createContext();
const columns = [
  { field: "orderNumber", headerName: "Order Number", minWidth: 100, flex: 1 },
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
    field: "user.fullName",
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
    valueGetter: (params) =>
      moment(params.row.createdAt).format("MMM DD, YYYY"),
    minWidth: 100,
    flex: 1,
  },
];

const Orders = () => {
  const [filterData, setFilterData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let [filteredOrder, setFilteredOrder] = useState([]);
  const [order, setOrder] = useState();

  axios.get("/orders").then(function (response) {
    setOrder(response.data);
  });

  useEffect(() => {
    
    setFilteredOrder(order);

    if ((filterData) &&
      (filterData.search ||
      filterData.store ||
      filterData.user ||
      filterData.status ||
      filterData.startDate)
    ) {
      const startDate = filterData.startDate ? moment(filterData.startDate).format("YYYY-MM-DD") : null;
      const endDate = filterData.endDate ? moment(filterData.endDate).format("YYYY-MM-DD") : null;


      const TempOrder = order.filter((entry) => {
        const createdAt = moment(entry.createdAt).format("YYYY-MM-DD"); 
        return (
          entry.store.title === filterData.search ||
          String(entry.orderNumber) === filterData.search ||
          entry.user.fullName === filterData.search ||
          entry.status.text === filterData.search ||
          entry.store.title === filterData.store ||
          entry.user.fullName === filterData.user ||
          filterData.status.includes(entry.status.text) ||
          moment(createdAt).isBetween(startDate, endDate, undefined, "[]")
        );
      });
      setFilteredOrder(TempOrder);
    }
  }, [filterData, order]);

  return (
    filteredOrder && (
      <>
        <Typography variant="h1" textAlign="center">
          Orders
        </Typography>
        <Box display="flex" sx={{ columnGap: 2, m: 2 }}>
          <FilterContext.Provider value={{ filterData, setFilterData }}>
            <startDateContext.Provider value={{ startDate, setStartDate }}>
              <endDateContext.Provider value={{ endDate, setEndDate }}>
                <Box width="30%">
                  <Filter />
                </Box>
              </endDateContext.Provider>
            </startDateContext.Provider>
          </FilterContext.Provider>

          <div style={{ height: "100%", width: "70%" }}>
            <DataGrid
              rows={filteredOrder}
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

export default Orders;

import React, { useEffect, createContext, useContext, useState } from "react";
import axios from "../../hooks/axios";
import useAxios from "./../../hooks/useAxios";
import { DataGrid } from "@mui/x-data-grid";
import * as moment from "moment";
import { Box, Typography } from "@mui/material";
import Filter from "../../global/Filter";

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

export const setFilterContext = createContext();
const Orders = () => {
  let [filteredOrder, setFilteredOrder] = useState([]);

  const [order] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/orders",
  });
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    setFilteredOrder(order);
    console.log(filterData);

    if (
      filterData.search ||
      filterData.store ||
      filterData.user ||
      filterData.status ||
      filterData.startDate
    ) {
      const TempOrder = order.filter((entry) => {
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
          moment(createdAt).isBetween(startDate, endDate, undefined, "[]")
        );
      });
      setFilteredOrder(TempOrder);
    }
  }, [filterData, order]);

  return (
    <setFilterContext.Provider value={setFilterData}>
      <>
        <Typography variant="h1" textAlign="center">
          Orders
        </Typography>
        <Box display="flex" sx={{ columnGap: 2, m: 2 }}>
          <Box width="30%">
            <Filter />
          </Box>

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
    </setFilterContext.Provider>
  );
};

export default Orders;

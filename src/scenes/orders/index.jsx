import React, { createContext, useEffect, useState } from "react";
import axios from "../../hooks/axios";
import { DataGrid } from "@mui/x-data-grid";
import * as moment from "moment";
import {  Typography } from "@mui/material";
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
    axios
      .get("/orders")

      .then((response) => {
        if (!ignore) {
          setOrder(response.data);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setFilteredOrder(order);

    if (
      filterData &&
      (filterData.search ||
        filterData.store ||
        filterData.user ||
        filterData.status ||
        filterData.startDate)
    ) {
      const startDate = filterData.startDate
        ? moment(filterData.startDate).format("YYYY-MM-DD")
        : null;
      const endDate = filterData.endDate
        ? moment(filterData.endDate).format("YYYY-MM-DD")
        : null;

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
        <div className="mainContainer">
          <div className="orderTitle">
            <Typography
              variant={width > 1000 ? "h1" : "h3"}
              fontWeight="bolder"
            >
              Orders
            </Typography>
          </div>
          <div className="orderContainer">
            <FilterContext.Provider value={{ filterData, setFilterData }}>
              <startDateContext.Provider value={{ startDate, setStartDate }}>
                <endDateContext.Provider value={{ endDate, setEndDate }}>
                  <div className="filterContainer">
                    <Filter />
                  </div>
                </endDateContext.Provider>
              </startDateContext.Provider>
            </FilterContext.Provider>

            <div className="orderTable">
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
          </div>
        </div>
      </>
    )
  );
};

export default Orders;

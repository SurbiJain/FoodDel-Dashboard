import React, { useEffect, useState } from "react";
import { Box, collapseClasses } from "@mui/material";
import BarChart from "./BarChart";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../hooks/axios";
import * as moment from "moment";
import "./index.css";
const columns = [
  {
    field: "status",
    headerName: "Status",

    renderHeader: () => <strong>Timeline</strong>,
    valueGetter: (params) => params.row.status.text,
    minWidth: 100,
    flex: 1 / 2,
  },
  {
    field: "orderNumber",
    headerName: "Order Number",
    renderHeader: () => <strong></strong>,
    minWidth: 100,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    renderHeader: () => <strong></strong>,
    valueGetter: (params) => moment(params.row.createdAt).fromNow(),
    minWidth: 100,
    flex: 1,
  },
];

const Dashboard = () => {
  const [order, setOrder] = useState();
  const [trendingProducts, setTrendingProducts] = useState();

  useEffect(() => {
    axios.get(`/orders?&_order=desc&_sort=createdAt`).then((response) => {
      setOrder(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/trendingProducts?_end=5&_start=0`).then((response) => {
      setTrendingProducts(response.data);
    });
  }, []);

  const recentOrderColumns = [
    {
      field: "orderNumber",
      headerName: "Order Number",
      renderHeader: () => <strong>Recent Orders</strong>,
      flex: 1,
    },
    {
      field: "user",
      headerName: "user",
      renderHeader: () => <strong></strong>,
      renderCell: (params) => {
        return params.row.user.fullName;
      },
      minWidth: 100,
      flex: 1 / 2,
    },
    {
      field: "products",
      headerName: "Products",

      renderHeader: () => <strong></strong>,
      renderCell: (params) => {
        return (
          <div>
            {params.row.products?.map((e) => {
              return <div key={e.id}>{e.name} X 1</div>;
            })}
          </div>
        );
      },
      minHeight: 550,
      flex: 1,
      rowspan: 4,
    },
    {
      field: "amount",
      headerName: "Amount",
      renderHeader: () => <strong></strong>,
      renderCell: (params) => {
        return <div> US$ {params.row.amount / 100} </div>;
      },
      minHeight: 550,
      flex: 1,
      rowspan: 4,
    },
  ];
  const trendingProductColumn = [
    {
      field: "trendingProduct",
      headerName: "Trending Products",
      renderHeader: () => <strong>Trending Products</strong>,
      minWidth: 300,
      renderCell: (params) => (
        <>
          <span
            style={{ borderRadius: 24, width: 100, height: 100, fontSize: 18 }}
          >
            <img
              src={params.row.product.images[0]?.url}
              style={{ borderRadius: 10, width: "100%", height: "100%" }}
            />
          </span>
          <div>
            <div style={{ margin: 20, fontSize: "larger", fontWeight: "bold" }}>
              {params.row.product.name}
            </div>
            <div style={{ margin: 20 }}>US$ {params.row.product.price}</div>
            <div style={{ margin: 20 }}>
              Ordered {params.row.orderCount} times
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="mainContainer">
        <Box sx={{ mb: 5 }}>
          <BarChart />
        </Box>

        <div>
          <div className="timeline">
            {order && (
              <DataGrid
                rows={order}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20, 50, 100]}
              />
            )}
          </div>
        </div>
        <div className="productDetails">
          <div className="recentOrders">
            {order && (
              <DataGrid
                rows={order}
                columns={recentOrderColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                getRowHeight={() => 70}
                pageSizeOptions={[10, 20, 50, 100]}
              />
            )}
          </div>
          <div className="trendingProducts">
            {trendingProducts && (
              <DataGrid
                rows={trendingProducts}
                columns={trendingProductColumn}
                showColumnHeaders={false}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                getRowHeight={() => 120}
                pageSizeOptions={[10, 20, 50, 100]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

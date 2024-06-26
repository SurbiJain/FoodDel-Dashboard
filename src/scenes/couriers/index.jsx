import React, { useState, useEffect } from "react";
import axios from "../../hooks/axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import AddCourier from "./AddCourier.jsx";


const Couriers = () => {
  const [courier, setCourier] = useState();
  const [review, setReview] = useState();
  const courierList = [];
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
      .get("/couriers")

      .then((response) => {
        if (!ignore) {
          setCourier(response.data);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    axios
      .get("/reviews")

      .then((response) => {
        setReview(response.data);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID#", minWidth: 100, flex: 1 / 2 },
    {
      field: "Avatar",
      headerName: "Avatar",
      renderCell: (params) => (
        <img
          src={params.row.avatar[0].url}
          width="30"
          style={{ borderRadius: 20 }}
        />
      ),
      minWidth: 100,
      flex: 1 / 2,
    },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 / 2 },
    {
      field: "licensePlate",
      headerName: "Vehicle Id",
      minWidth: 100,
      flex: 1 / 2,
    },
    {
      field: "gsm",
      headerName: "Gsm",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "store",
      headerName: "Store",
      valueGetter: (params) => params.row.store?.title,
      minWidth: 200,
      flex: 1,
    },
    {
      field: "Rating",
      headerName: "Rating",
      renderCell: (params) => {
        review?.map((e) => {
          courierList.push({ courier: e.order.courier, rating: e.star });
        });
        const result = courierList.filter((e) => {
          return e.courier.id === params.row.id;
        });
        let sum = 0;
        result.forEach((e) => {
          sum += e.rating / result.length;
        });
        let rating = Math.round(sum * 10) / 10;
        rating = Math.floor(rating * 2) / 2;

        return rating;
      },
      minWidth: 100,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        
        if (params.row.status.text === "Available") {
          return (
            <Button variant="contained" color="success">
              Available
            </Button>
          );
        } else if (params.row.status.text === "Offline") {
          return (
            <Button variant="contained" disabled>
              {params.row.status.text}
            </Button>
          );
        } else
          return (
            <Button variant="contained" color="secondary">
              {typeof params.row.status.text === String
                ? params.row.status.text
                : "absent"}
            </Button>
          );
      },
      minWidth: 200,
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      
      renderCell: (params) => (
        <Link to={`/couriers/${params.row.id}`}>
          <div className="tableActions">

          <Button>
            <VisibilityOutlinedIcon fontSize="small" sx={{ color: "white" }} />
          </Button>
          </div>
        </Link>
      ),
      minWidth: 100,
      flex: 1,
      onclick: { onclick },
    },
  ];

  return (
    <div className="mainContainer">
      <div
       className="header">
        <Typography variant={width > 1000 ? "h1" : "h3"} fontWeight="bolder">Couriers</Typography>
        <AddCourier />
      </div>
      {courier && (
        <div>
          <DataGrid
            rows={courier}
            columns={columns}
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
  );
};

export default Couriers;

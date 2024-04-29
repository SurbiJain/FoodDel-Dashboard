import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import axios from "../../hooks/axios";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import "./index.css";

const BarChart = () => {
  const [dailyOrderNumb, setDailyOrderNumb] = useState();
  const [newCustomers, setNewCustomers] = useState();
  const [dailyRevenue, setDailyRevenue] = useState();
  const [daysArray, setDaysArray] = useState();
  const endDate = moment().format("YYYY-MM-DD");
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        border: { display: false },
        beginAtZero: true,
        grid: {
          display: true, // Display grid lines for the y-axis
        },
        ticks: {
          padding: 10,
        },
      },
      x: {
        border: { display: true },
        grid: {
          display: false, // Display grid lines for the x-axis
        },
        ticks: {
          padding: 10,
          maxTicksLimit: 7,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 30,
        borderWidth: 0.7,
      },
    },
  };

  useEffect(() => {
    let ignore = false;
    const array = [];
    for (let i = 0; i < 30; i++) {
      array.push(moment().subtract(i, "days").format("MM/DD"));
    }

    setDaysArray(array);

    axios
      .get(`/dailyOrders?&end=${endDate}&start=${startDate}`)
      .then((response) => {
        if (!ignore) {
          setDailyOrderNumb(response.data);
        }
      });
  }, [startDate, endDate]);

  useEffect(() => {
    axios
      .get(`/newCustomers?&end=${endDate}&start=${startDate}`)
      .then((response) => {
        setNewCustomers(response.data);
      });
  }, [startDate, endDate]);
  useEffect(() => {
    axios
      .get(`/dailyRevenue?&end=${endDate}&start=${startDate}`)
      .then((response) => {
        setDailyRevenue(response.data);
      });
  }, [startDate, endDate]);

  // useEffect(()=>{
  //   console.log(dailyRevenue)
  // },[dailyRevenue])

  const labels = daysArray;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily Orders",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: dailyOrderNumb?.data.map((e) => {
          return  e.value
        }),
        datasetKeyProvider:dailyOrderNumb?.data.map((e) => {
          return  e.date
        }),
        visible: false,
      },
    ],
  };
  const newData = {
    labels: labels,
    datasets: [
      {
        label: "New Customers",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        data: newCustomers?.data.map((e) => {
          
          return ( e.value);
        }),
        datasetKeyProvider:newCustomers?.data.map((e) => {
          return  e.date
        }),
      },
    ],
  };
  const revenueData = {
    labels: labels,
    datasets: [
      {
        label: "Daily Revenue",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        data: dailyRevenue?.data.map((e) => {
          return e.value;
        }),
        datasetKeyProvider:dailyRevenue?.data.map((e) => {
          return  e.date
        }),
      },
    ],
  };

  return (
    <>
      <div className="chartContainer">
       
        <div className="graph">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={width > 1000 ? "h4" : "h8"}>Daily Revenue</Typography>
            <Typography variant={width > 1000 ? "h4" : "h8"}>
              US${dailyRevenue?.trend}
            </Typography>
          </Box>
          <Line data={revenueData} options={options} style={{ height: 170 }} />
        </div>
        <div
         className="graph"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={width > 1000 ? "h4" : "h8"}>Daily Order</Typography>
            <Typography variant={width > 1000 ? "h4" : "h8"}>
              {dailyOrderNumb?.trend}
            </Typography>
          </Box>
          <Bar data={data} options={options} style={{ height: 170 }} />
        </div>
        <div
          
         className="graph"
        >
          <div
           className="chartContainer"
          >
            <Typography variant={width > 1000 ? "h4" : "h8"}>New Customers</Typography>
            <Typography variant={width > 1000 ? "h4" : "h8"}>
              {newCustomers?.trend}.00%
            </Typography>
          </div>
          <Bar data={newData} options={options} style={{ height: 170 }} />
        </div>
      </div>
    </>
  );
};
export default BarChart;

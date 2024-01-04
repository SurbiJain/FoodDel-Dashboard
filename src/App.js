import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from "./global/Topbar";
import MySidebar from "./global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import Orders from "./scenes/orders/index";
import { createContext, useState } from "react";
import React from "react";
import Users from "./scenes/users/index";
import UserProfile from "./scenes/users/UserProfile";
import Products from "./scenes/products";
// import Contacts from './scenes/contacts/index'
// import Bar from './scenes/bar/index'
// import Form from './scenes/form'
// import Line from './scenes/line/index'
// import Pie from './scenes/pie/index'
// import FAQ from './scenes/faq/index'
// import Geo from './scenes/geo/index'
// import Calender from './scenes/calender/index'
export const FilterContext = createContext();
export const startDateContext = createContext();
export const endDateContext = createContext();

function App() {
  const [theme, colorMode] = useMode();
  const [filterData, setFilterData] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [users, setUsers] = useState();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Topbar />
        <CssBaseline />
        <div className="app">
          <MySidebar />

          <FilterContext.Provider value={{ filterData, setFilterData }}>
            <startDateContext.Provider value={{ startDate, setStartDate }}>
              <endDateContext.Provider value={{ endDate, setEndDate }}>
                <main className="content">
                  <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/orders" element={<Orders />}></Route>
                    <Route path="/users" element={<Users />}></Route>
                    <Route path="/users/:userId" element={<UserProfile />}></Route>
                    <Route path="/products" element={<Products/>}></Route>
             {/*  <Route path="/form" element={<Form/>}></Route>
              <Route path="/bar" element={<Bar/>}></Route>
              <Route path="/line" element={<Line/>}></Route>
              <Route path="/pie" element={<Pie/>}></Route>
              <Route path="/faq" element={<FAQ/>}></Route>
              <Route path="/geography" element={<Geo/>}></Route>
              <Route path="/calender" element={<Calender/>}></Route> */}
                  </Routes>
                </main>
              </endDateContext.Provider>
            </startDateContext.Provider>
          </FilterContext.Provider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

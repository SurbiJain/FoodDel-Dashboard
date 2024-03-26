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
import Stores from './scenes/stores/index'
import CreateStore from "./scenes/stores/createStore";
import EditProduct from "./scenes/stores/editProduct";
import EditStore from "./scenes/stores/editStore";
import Categories from './scenes/categories/index'
import Couriers from './scenes/couriers/index'
import CourierDetails from "./scenes/couriers/CourierDetails";


function App() {
  const [theme, colorMode] = useMode();

  const [users, setUsers] = useState();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Topbar />
        <CssBaseline />
        <div className="app">
          <MySidebar />

          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/user/:userId" element={<UserProfile />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/stores" element={<Stores/>}></Route>
              <Route path="/stores/:storeId" element={<CreateStore/>}></Route>
              <Route path="/stores/:storeId/products" element={<EditProduct/>}></Route>
              
              <Route path="/stores/edit/:editId" element={<EditStore/>}></Route>
              <Route path="/categories" element={<Categories/>}></Route>
              <Route path="/couriers" element={<Couriers/>}></Route>
              <Route path="/couriers/:courierId" element={<CourierDetails/>}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

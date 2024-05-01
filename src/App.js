import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from "./global/Topbar";
import MySidebar from "./global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import Orders from "./scenes/orders/index";
import { createContext, useEffect, useState } from "react";
import React from "react";
import Users from "./scenes/users/index";
import UserProfile from "./scenes/users/UserProfile";
import Products from "./scenes/products";
import Stores from "./scenes/stores/index";
import CreateStore from "./scenes/stores/createStore";
import EditProduct from "./scenes/stores/editProduct";
import EditStore from "./scenes/stores/editStore";
import Categories from "./scenes/categories/index";
import Couriers from "./scenes/couriers/index";
import CourierDetails from "./scenes/couriers/CourierDetails";
import Login from "./scenes/logIn/LogIn";
import "./index.css";
import CreateNewStore from "./scenes/stores/CreateNewStore";

import { AuthProvider } from "./scenes/logIn/useAuth";
import { ProtectedRoute } from "./scenes/logIn/ProtectedRoute";
import { Sidebar } from "react-pro-sidebar";
export const sidebarContext = createContext();
export const logInContext = createContext();

function App() {
  const [theme, colorMode] = useMode();

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ProtectedRoute>
            <Topbar />
          </ProtectedRoute>

          <CssBaseline />
          <div className="app">
            <ProtectedRoute>
              <MySidebar />
            </ProtectedRoute>

            <main className="content">
              <Routes>
                <Route path="/LogIn" element={<Login />}></Route>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/user/:userId"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/stores"
                  element={
                    <ProtectedRoute>
                      <Stores />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/stores/:storeId"
                  element={
                    <ProtectedRoute>
                      <CreateStore />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/stores/new"
                  element={
                    <ProtectedRoute>
                      <CreateNewStore />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/stores/:storeId/products"
                  element={
                    <ProtectedRoute>
                      <EditProduct />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/stores/edit/:editId"
                  element={
                    <ProtectedRoute>
                      <EditStore />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/couriers"
                  element={
                    <ProtectedRoute>
                      <Couriers />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/couriers/:courierId"
                  element={
                    <ProtectedRoute>
                      <CourierDetails />
                    </ProtectedRoute>
                  }
                ></Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;

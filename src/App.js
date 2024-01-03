import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from "./global/Topbar";
import MySidebar from "./global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import Orders from "./scenes/orders/index";
// import Invoices from './scenes/invoices/index'
// import Contacts from './scenes/contacts/index'
// import Bar from './scenes/bar/index'
// import Form from './scenes/form'
// import Line from './scenes/line/index'
// import Pie from './scenes/pie/index'
// import FAQ from './scenes/faq/index'
// import Geo from './scenes/geo/index'
// import Calender from './scenes/calender/index'

function App() {
  const [theme, colorMode] = useMode();
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
              {/* <Route path="/invoices" element={<Invoices/>}></Route>
              <Route path="/contacts" element={<Contacts/>}></Route>
              <Route path="/form" element={<Form/>}></Route>
              <Route path="/bar" element={<Bar/>}></Route>
              <Route path="/line" element={<Line/>}></Route>
              <Route path="/pie" element={<Pie/>}></Route>
              <Route path="/faq" element={<FAQ/>}></Route>
              <Route path="/geography" element={<Geo/>}></Route>
              <Route path="/calender" element={<Calender/>}></Route> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

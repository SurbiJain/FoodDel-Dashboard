import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../Theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const SmallContainers = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    //Menu item box
    <MenuItem
      onClick={() => {
        setSelected(title);
      }}
      active={selected === title}
      icon={icon}
      component={<Link to={to} />}
      style={{ color: colors.grey[100] }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MySidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[700]} !important`,
        },
        "& .MuiBox-root": {
          backgroundColor: "transparent !important",
        },

        "& .ps-menuitem-root:hover": {
          color: "#868dfb !important",
        },
        "& .ps-active": {
          color: "#6870fa !important",
          background: "#000",
        },
        "& .ps-menu-button:hover": {
          backgroundColor: "transparent !important",
          color: "#ffffff !important",
        },
        "& .ps-menuitem-root:hover": {
          backgroundColor: "#000 !important",
        },
        "& .ps-sidebar-root": {
          height: 'inherit'
        },
      }}
    >
      {/*  */}
      <Box height="100%">
        <Sidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <Box>
              <SmallContainers
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <SmallContainers
                title="Orders"
                to="/orders"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <SmallContainers
                title="Users"
                to="/users"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <SmallContainers
                title="Products"
                to="/products"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <SmallContainers
                title="Stores"
                to="/stores"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <SmallContainers
                title="Categories"
                to="/categories"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <SmallContainers
                title="Couriers"
                to="/couriers"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <SmallContainers
                title="Reviews"
                to="/reviews"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </Box>
  );
};

export default MySidebar;

import { useContext, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../Theme";
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
import { useAuth } from "../scenes/logIn/useAuth";
import "../index.css"


 

export const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useAuth();
  
  
    const [language, setLanguage] = useState('');
  
    const handleChange = (e) => {
      setLanguage(e.target.value);
    }
    
    const handleLogout = () => {
      logout();
    };
  
  return (
    <Box display="flex" justifyContent="space-between" p={2} bgcolor={colors.grey[900]}  > 
      <Box display="flex">
      

      <IconButton>
          <PedalBikeIcon fontSize="large"/>
        </IconButton>
        <Typography variant="h4" sx={{m:"10px"}}>
          Speed Delivery
        </Typography>
      </Box>
      <Box display="flex" sx={{  width: 500, border: 1, borderRadius: 2}} bgcolor={colors.grey[900]}>
      <InputBase  placeholder="Search by Store ID, E-mail, Keyword" fullWidth={true} sx={{pl: 2}}
      endAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      />
      </Box>
      <Box display="flex" >
      <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
       
          
        <button  className="logout" onClick={handleLogout}>
          Log Out
          </button>
        
        
      </Box>

      
     
    </Box>
  );
};
export default Topbar;

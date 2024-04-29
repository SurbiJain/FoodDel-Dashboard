import { useContext, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../Theme";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
import { sidebarContext } from "../App";
import "../index.css"


 

export const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
 
    const [language, setLanguage] = useState('');
  
    const handleChange = (e) => {
      setLanguage(e.target.value);
    }
    
  
  
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
        <div className="loginAvatar">
    <Typography variant="h5" sx={{m:"10px"}}>
          Surbhi Jain
        </Typography>
        </div>
      </Box>

      
     
    </Box>
  );
};
export default Topbar;

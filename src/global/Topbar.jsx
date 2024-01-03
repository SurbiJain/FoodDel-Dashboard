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


export const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
   
    const [language, setLanguage] = useState('');
  
    const handleChange = (e) => {
      setLanguage(e.target.value);
    }
  
  
  return (
    <Box display="flex" justifyContent="space-between" p={2} bgcolor={colors.primary[600]} > 
      <Box display="flex">
      <IconButton>
          <PedalBikeIcon fontSize="large"/>
        </IconButton>
        <Typography variant="h4" sx={{m:"10px"}}>
          Speed Delivery
        </Typography>
      </Box>
      <Box display="flex" sx={{  width: 500, border: 1, borderRadius: 2}} bgcolor={colors.primary[400]}>
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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Language</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Language"
        onChange={handleChange}
        value={language}
      >
        <MenuItem value={language}>
          <em>None</em>
        </MenuItem>
        <MenuItem value="English" >English</MenuItem>
        <MenuItem value="Hindi">Hindi</MenuItem>
        <MenuItem value="German">German</MenuItem>
      </Select>
    </FormControl>
    <Typography variant="h5" sx={{m:"10px"}}>
          Surbhi Jain
        </Typography>

      </Box>

      
     
    </Box>
  );
};
export default Topbar;

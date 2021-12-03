import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./NavBar.css"
import image from "../../Images/meme-stock-colleen.png"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function NavBar(props) {
  const [value, setValue] = React.useState("home");
  const [mode, setMode] = React.useState("light");
  const [textColors, setTextColors] = React.useState({color:"black", fontSize:18, fontWeight:700});
  const onModeChange = (event, newValue) => {
    if (localStorage.getItem("mode") == "dark") {
      setMode("light")
      props.handleModeChange("light")
      localStorage.setItem("mode", "light")
      setTextColors({color:"black", fontSize:18, fontWeight:700})
    } else {
      setMode("dark")
      props.handleModeChange("dark")
      localStorage.setItem("mode", "dark")
      setTextColors({color:"white", fontSize:18, fontWeight:700})
    }
    
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    if (localStorage.getItem("mode") == null){
      localStorage.setItem("mode", "light")
    }
  },[mode]);
  return (
    <Box className={"nav-box-" + mode}>
      <div className="meme-container"><img className="meme-icon" src={image} /></div>
      <Tabs
        value={props.value}
        onChange={handleChange}
        variant="scrollable"
        textColor="secondary"
        indicatorColor="secondary"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
      >
        <Tab
          value="home"
          label="Home"
          wrapped
          sx={textColors}
          to="/" LinkComponent={Link}
        />
        <Tab value="competition" 
        label="Competiton" 
        to="/competition" 
        sx={textColors}
        LinkComponent={Link} 
        />
        <Tab value="rankings" 
        label="Rankings" 
        to="/rankings" 
        sx={textColors}
        LinkComponent={Link} 
        />
      </Tabs>
      {
        localStorage.getItem("mode") == "dark"?
        <div className="mode-container"><Button   sx={[
          { backgroundColor:"black"},
          {
            '&:hover': {
              backgroundColor: 'gray',
            },
          },
        ]} variant="contained" onClick={()=>onModeChange()}><LightModeIcon htmlColor={"orange"}/></Button></div>
        :
        <div className="mode-container"><Button sx={[
          { backgroundColor:"black"},
          {
            '&:hover': {
              backgroundColor: 'gray',
            },
          },
        ]}  variant="contained" onClick={()=>onModeChange()}><DarkModeIcon htmlColor={"white"}/></Button></div>
      }
    </Box>
  );
}
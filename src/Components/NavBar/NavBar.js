import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./NavBar.css"
import image from "../../Images/meme-stock-colleen.png"
import {Link} from "react-router-dom"
export default function NavBar(props) {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box className="nav-box">
      <div className="meme-container"><img className="meme-icon" src={image} /></div>
      <Tabs
        value={props.value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
      >
        <Tab
          value="home"
          label="Home"
          wrapped
          to="/" LinkComponent={Link}
        />
        <Tab value="competiton" 
        label="Competiton" 
        to="/competition" 
        LinkComponent={Link} 
        />
        <Tab value="rankings" 
        label="Rankings" 
        to="/rankings" 
        LinkComponent={Link} 
        />
      </Tabs>
    </Box>
  );
}
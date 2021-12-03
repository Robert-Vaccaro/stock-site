import React, { useEffect, useState } from "react"
import "./Competition.css"
import NavBar from "../NavBar/NavBar.js"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import image from "../../Images/no-camera.png"
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';


function Competition() {
    let [memes, setMemes] = useState([])
    let [page, setPage] = useState("0")
    let [pageTotal, setPageTotal] = useState(0)
    let [memeClass, setMemeClass] = useState("fadeOut")
    let [hideLoader, setHideLoader] = useState(false)
    const [expanded, setExpanded] = React.useState(false);
    const changePage = (e, val) => {
      console.log(val-1)
      setPage((val-1).toString())
      setHideLoader(false)
      setMemeClass("fadeOut")
      getMemes()
    }
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    let memeStateSet = (res) => {
      
      setMemes(res)
      setHideLoader(true)
      setMemeClass("fadeIn")
    }
    let getPageTotal = () => {

      console.log("getPageTotal")
      
        fetch('https://ancient-springs-47837.herokuapp.com/get-total-memes', {
            method: 'post', 
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
             body: JSON.stringify({username: "",startPoint:page, like:"",category:""})
          }).then(res=>res.json())
            .then(res => setPageTotal(Math.ceil(res[0]/25)))
            .catch(err => console.log(err))
    }
    let getMemes = () => {

      console.log("getMemes")
      
        fetch('https://ancient-springs-47837.herokuapp.com/get-all-champ-memes-v2', {
            method: 'post', 
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
             body: JSON.stringify({username: "",startPoint:page, like:"",category:""})
          }).then(res=>res.json())
            .then(res => memeStateSet(res))
            .catch(err => console.log(err))
    }
    useEffect(() => {
      console.log("inside useEffect")
      getPageTotal()
        getMemes()
      }, [page]);// eslint-disable-line react-hooks/exhaustive-deps
    
  return (
    <div className="landing">
      <NavBar value="competition"/>
    {memes.map((item,index) => (
    <Card  sx={{ width: 345, padding: 1, margin: 1 }} key={index}>

        {
            item.profilePhoto!==""?
            <CardHeader
            avatar={
              <Avatar src={item.profilePhoto} sx={{ bgcolor: "white", width: 56, height: 56,}} aria-label="recipe">
              </Avatar>
            }
            title={item.username}
            subheader={
                new Date(item.timeCreated * 1000).toLocaleString()
                }
          />
          :
          <CardHeader
          avatar={
            <Avatar src={image} sx={{ bgcolor: "white", width: 56, height: 56,}} aria-label="recipe">
            </Avatar>
          }

          title={item.username}
          subheader={
              new Date(item.timeCreated * 1000).toLocaleString()
              }
        />
          }
        




      <CardMedia
        className="meme-image"
        component="img"
        image={item.url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">

        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: red[500] }}/>
          </IconButton>

        <Typography>{item.alreadyLiked.length}</Typography>


      </CardActions>
      
    </Card>
    
    ))}
        <div style={{width:"100%", bottom: "70px", position: "fixed"}} hidden={hideLoader}>
        <LinearProgress />
    </div>
  <div className="pagination-container">
  
  <Pagination count={pageTotal} color="secondary" onChange={changePage}/>
  </div>

    </div>
  );
}

export default Competition;

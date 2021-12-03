import React, { useEffect, useState } from "react"
import "./Rankings.css"
import NavBar from "../NavBar/NavBar.js"
import Button from '@mui/material/Button';
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
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import image from "../../Images/no-camera.png"
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
function Rankings() {
    let [users, setUsers] = useState([])
    let [like, setLiked] = useState(false)
    let [page, setPage] = useState("0")
    let [hideLoader, setHideLoader] = useState(false)
    let [pageTotal, setPageTotal] = useState(0)
    const [expanded, setExpanded] = React.useState(false);
    const changePage = (e, val) => {
        console.log(val-1)
        setPage((val-1).toString())
        setHideLoader(false)
        getUsers()
      }
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    let memeUsers = (res) => {
        setUsers(res)
        setHideLoader(true)
    }
    let getPageTotal = () => {

        console.log("getPageTotal")
        
          fetch('https://ancient-springs-47837.herokuapp.com/get-total-users', {
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
    let getUsers = () => {
        console.log("getUsers")
        setHideLoader(false)
        fetch('https://ancient-springs-47837.herokuapp.com/get-memer-rankings-v2', {
            method: 'post', 
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
             body: JSON.stringify({username: "",startPoint:page,like:"",category:""})
          }).then(res=>res.json())
            .then(res => memeUsers(res))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getPageTotal()
        getUsers()
      }, [page]);// eslint-disable-line react-hooks/exhaustive-deps
    
  return (
    <div className="rankings">
      <NavBar value="rankings"/>
    {users.map((item,index) => (
    <Card sx={{ width: 345, padding: 1, margin: 1 }} key={index}>
        {
            item.profilePhoto!==""?
            <CardHeader
            avatar={
              <Avatar src={item.profilePhoto} sx={{ bgcolor: "white", width: 200, height: 200,}} aria-label="recipe">
              </Avatar>
            }
          />
          :
          <CardHeader
          avatar={
            <Avatar src={image} sx={{ bgcolor: "white", width: 200, height: 200,}} aria-label="recipe">
            </Avatar>
          }
        />
        }


      <CardContent>
          <div>

          </div>
      <Typography variant="h3" color="text.secondary">
      {item.username}
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Rank: {index+1}
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Memes Posted: {item.memes}
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Level: {item.level}
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Exp: {item.exp}/100
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Meme to Like Ratio: {item.ratio}%
        </Typography>

      </CardContent>
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

export default Rankings;

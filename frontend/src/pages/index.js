import React , {useEffect , useState}from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import LocalBar from '@mui/icons-material/LocalBar';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

function Index(){

    const [data, setData] = useState(); 
    useEffect(() =>{
        axios.get("http://localhost:8000/api/mocktail")
        .then(function (response) {
            setData(response.data);
          })
        .catch(function (error) {
            console.log(error);
          })
        .then(function () {
            // always executed
          })// eslint-disable-next-line
    },[]);


    return data?
    <ImageList sx={{ width: "95%", height: 'auto' , m: 'auto' , mt:2, mb: 10}} cols={4}>
    {data.slice(0).reverse().map((item) => (
      <ImageListItem key={item.id} sx={{ m: 0.1}}>{/* eslint-disable-next-line*/}
        <img
          src={`${item.image}`}
          srcSet={`${item.image}`}
          alt={item.title}
          id="imglist"
          loading="lazy"
        />
        <ImageListItemBar
          title={item.title}
          subtitle={item.owner}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${item.title}`}
            >
              <Link to={`/detailMock/${item.id}`}><LocalBar sx={{ color: '#fff'}} /></Link>
            </IconButton>
          }
        />
      </ImageListItem>
    ))}
  </ImageList>  
    :(<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
        <CircularProgress color="inherit" sx={{m: 'auto'}}/>
        </Grid>  
      </Grid> )
}

export default Index;
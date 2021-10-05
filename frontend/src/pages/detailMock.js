import React ,{useEffect, useState}from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function DetailMock(props) {

    const [data, setData] = useState(); 
    useEffect(() =>{
        axios.get(`http://localhost:8000/api/mocktail/${props.match.params.id}`)
        .then(function (response) {
            setData(response.data[0]);
          })
        .catch(function (error) {
            console.log(error);
          })
        .then(function () {
            // always executed
          })// eslint-disable-next-line
    },[]);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleEdit = () =>{
        let secret = prompt("ใส่รหัสผ่านของคุณแก้ไขข้อมูลของคุณ");
        if (secret === data.secret){
            props.history.push(`/editMock/${data.id}`)
        }else if (secret !== data.secret && secret !== null){
            alert("รหัสผิด โปรดลองอีกครั้ง!");
        }
    }
    

    const handleDelete = () =>{
        let secret = prompt("ใส่รหัสผ่านของคุณเพื่อลบ");
        if (secret === data.secret){
            axios.delete(`http://localhost:8000/api/mocktail/${props.match.params.id}`)
            .then((response) =>{
                props.history.push("/")
            }
            ).catch((error) => {
                console.error(error);
            })
            
        }else if (secret !== data.secret && secret !== null){
            alert("รหัสผิด โปรดลองอีกครั้ง!");
        }
    }

    return data?
        <Box sx={{ width: "100vh", mx: 'auto', mt: 5, p:2, mb: 12, bgcolor: '#ffffffE5', boxShadow: 2 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 12">
                    <Item>
                        <Typography variant="h4" component="div" gutterBottom>
                            รายละเอียด
                        </Typography>
                    </Item>
                </Box>
                <Box gridColumn="span 12">
                    <Item>{/* eslint-disable-next-line*/}
                        <img src={`${data.image}`} id="img" className="preview-img"/>
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            disabled
                            value={data.title}
                            sx={{ width:'100%'}} 
                            label="ชื่อม็อกเทล" 
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            disabled
                            label="ชื่อเจ้าของสูตร"
                            value={data.owner}
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            disabled
                            multiline
                            rows={5}
                            value={data.ingredient}
                            label="ส่วนผสม และปริมาณ (ml)"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                        </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            disabled
                            multiline
                            rows={5}
                            value={data.recipe}
                            label="สูตรวิธี และขั้นตอนการทำ"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 12">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            disabled
                            multiline
                            rows={2}
                            value={data.desc}
                            label="อธิยบายความรู้สึกจากแก้วนี้"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                    <Button variant="outlined" sx={{width:'97%'}} color="error" onClick={handleDelete} startIcon={<DeleteOutline/>}>delete</Button>
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                    <Button variant="outlined" sx={{width:'97%'}} color="info" onClick={handleEdit} startIcon={<EditOutlined/>}>edit</Button>
                    </Item>
                </Box>
            </Box>
        </Box>
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

export default DetailMock;
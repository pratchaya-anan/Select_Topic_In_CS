import React ,{useRef, useEffect , useState}from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function EditMock(props) {

    const mockName = useRef();
    const ownerName = useRef();
    const ingredient = useRef();
    const recipe = useRef();
    const description = useRef();
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
    

    const handleUpdate =  async () =>{
        let item = {
            'owner': ownerName.current.value,
            'title': mockName.current.value,
            'ingredient': ingredient.current.value,
            'recipe': recipe.current.value,
            'desc':description.current.value,
            'secret': data.secret,
            'image': data.image,
        }
        await axios.put(`http://localhost:8000/api/mocktail/${data.id}`, item)
            .then(function (response) {
                window.location.replace("/");
              })
            .catch(function (error) {
                console.warn(error);
              });
    }

    return data?
        <Box sx={{ width: "100vh", mx: 'auto', mt: 5, p:2, mb: 17, bgcolor: '#ffffffE5', boxShadow: 2 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 12">
                    <Item>
                        <Typography variant="h4" component="div" gutterBottom>
                            แก้ไขสูตรม็อคเทลของคุณ
                        </Typography>
                    </Item>
                </Box>
                <Box gridColumn="span 12" >
                    <Item>{/* eslint-disable-next-line*/}
                        <img src={`${data.image}`} id="img" className="preview-img"/>
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            inputRef={mockName}
                            defaultValue={data.title}
                            sx={{ width:'100%'}} 
                            label="ชื่อม็อกเทล" 
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            inputRef={ownerName}
                            defaultValue={data.owner}
                            label="ชื่อเจ้าของสูตร"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            inputRef={ingredient} 
                            defaultValue={data.ingredient} 
                            multiline
                            rows={5}
                            label="ส่วนผสม และปริมาณ (ml)"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                        </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            inputRef={recipe}
                            defaultValue={data.recipe}
                            multiline
                            rows={5}
                            label="สูตรวิธี และขั้นตอนการทำ"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 12">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            inputRef={description} 
                            defaultValue={data.desc}
                            multiline
                            rows={2}
                            label="อธิยบายความรู้สึกจากแก้วนี้"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 12">
                    <Item>
                        <Button 
                            color="info"
                            size="large"
                            variant="outlined"
                            startIcon={<SaveOutlined/>}
                            onClick={handleUpdate}
                            sx={{ width:'100%'}}>
                            บันทึก
                        </Button>
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
      </Grid>)
}

export default EditMock;
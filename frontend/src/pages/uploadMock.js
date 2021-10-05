import React ,{useRef}from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileUpload from '@mui/icons-material/FileUpload';
import ImageSearch from '@mui/icons-material/ImageSearch';
import axios from 'axios';

function UploadMock(props) {

    const image = useRef();
    const mockName = useRef();
    const ownerName = useRef();
    const ingredient = useRef();
    const recipe = useRef();
    const description = useRef();
    const secret = useRef();

    const Input = styled('input')({
        display: 'none',
      });
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
    const handleImage = (e) => {
        const blah = document.getElementById('img');
        const imgup = document.getElementById('preview-img-box');
        let [img] = e.target.files;
        let Read = new FileReader();
        Read.onload = (e) =>{
            blah.src = e.target.result;
            imgup.style.display="block";
        }
        Read.readAsDataURL(img);
    };

    const handleInsert = () =>{
        let Read = new FileReader();
        Read.onload = async (e) =>{
            let data = {
                'owner': ownerName.current.value,
                'title': mockName.current.value,
                'ingredient': ingredient.current.value,
                'recipe': recipe.current.value,
                'desc':description.current.value,
                'secret': secret.current.value,
                'image': e.target.result,
            }
            await axios.post("http://localhost:8000/api/mocktail", data)
            .then(function (response) {
                props.history.push("/")
              })
            .catch(function (error) {
                console.warn(error);
              });
        }
        Read.readAsDataURL(image.current.files[0]);
    }

    return (
        <Box sx={{ width: "100vh", mx: 'auto', mt: 5, p:2, mb: 17, bgcolor: '#ffffffE5', boxShadow: 2 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 12">
                    <Item>
                        <Typography variant="h4" component="div" gutterBottom>
                            เพิ่มสูตรม็อกเทลของคุณ
                        </Typography>
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <TextField 
                            id="standard-basic"
                            inputRef={mockName}
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
                            multiline
                            rows={2}
                            label="อธิยบายความรู้สึกจากแก้วนี้"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 12">
                    <Item>
                        <TextField 
                            error
                            id="standard-basic"
                            inputRef={secret} 
                            type='password'
                            label="รหัสแสดงความเป็นเจ้าของ (โปรดจำรหัสเพื่อใช้ในการแก้ไขข้อมูลของคุณ)"
                            sx={{ width:'100%'}}  
                            variant="outlined" />
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImage} ref={image}/>
                                <Button 
                                    variant="outlined"
                                    color='secondary' 
                                    size="large" 
                                    sx={{width:'100%'}}
                                    startIcon={<ImageSearch/>}
                                    component="span">
                                    เลือกรูปภาพ
                                </Button>
                        </label>
                    </Item>
                </Box>
                <Box gridColumn="span 6">
                    <Item>
                        <Button 
                            color="info"
                            size="large"
                            variant="outlined"
                            startIcon={<FileUpload/>}
                            onClick={handleInsert}
                            sx={{ width:'100%'}}>
                            อัพโหลด
                        </Button>
                    </Item>
                </Box>
                <Box gridColumn="span 12" id="preview-img-box">
                    <Item>{/* eslint-disable-next-line*/}
                        <img src="#" id="img" className="preview-img"/>
                    </Item>
                </Box>
            </Box>
        </Box>
    )
}

export default UploadMock;
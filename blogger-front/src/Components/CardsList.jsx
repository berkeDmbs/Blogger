import { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Button, CardActionArea, Modal, Zoom } from "@mui/material";

function CardsList(props) {
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)
    const [selectedPost, setSelectedPost] = useState({})

    function truncateText(text, type) {
        let splitText = text.split(' ')
        let maxLength = 0
        if(type === "title") {
            maxLength = 10
        } else {
            maxLength = 50
        }
        if(splitText.length > maxLength) {
            let joinedText = splitText.slice(0,maxLength).join(' ').concat('...')
            return joinedText
        } else {
            return text
        }
    }
    
    return(
        <Box sx={{textAlign: "left", marginTop: 7}}>
        <Grid container spacing={3} columns={4} >
        {props.posts.map((post)=>{
            return(
                <Grid key={post.pk} size={{xs: 2, md: 1}}> 
                <Card sx={{ margin: 'auto', 
                    border: '1px solid transparent', borderRadius: 5, transition: 'border-color 0.2s', '&:hover': {
                        borderColor: '#4b6780', filter: 'drop-shadow(0 0 0.15em #4b6780)'}
                }}>
                    <CardActionArea onClick={()=> { setSelectedPost(post); handleOpenModal()}}>
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: "bold", color: 'black'}} gutterBottom>
                            {truncateText(post.fields.title, "title")}
                            </Typography>
                        <Typography variant="body1" sx={{color: 'black'}}>
                        {truncateText(post.fields.post, "post")}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
                </Grid>
                
                )
            })}
            </Grid>
            <Modal
            open={openModal}
            onClose={handleCloseModal}>
            <Zoom in={openModal}>
            <Box sx={{
                margin: 'auto',
                marginTop: 10,
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                borderRadius: 10,
                boxShadow: 24,
                p: 4,
                maxWidth: '70%',
                maxHeight: '70%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box display={'flex'}>
                    <Typography variant="h6" sx={{fontWeight: "bold", color: 'black'}} gutterBottom>
                        {selectedPost.fields?.title}
                    </Typography>
                    <Button sx={{marginLeft: 'auto'}} onClick={()=> {
                        window.open(window.location.origin + '/search/' + selectedPost.pk)}}>
                        Open in New Tab
                    </Button>
                </Box>
                <Typography variant="body1" sx={{overflowY: "auto", color: 'black'}}>
                    {selectedPost.fields?.post}
                </Typography>
            </Box>
            </Zoom>
            </Modal>
            </Box>
        )
    }
    
export default CardsList
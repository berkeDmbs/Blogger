import { useState, useEffect } from 'react'
import '../App.css'
import Navbar from '../Components/Navbar';
import CardsList from '../Components/CardsList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Zoom, TextField, Button } from '@mui/material';

function Home() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [csrftoken, setCsrftoken] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

    const theme = createTheme({
        palette: {
          alice: {
            main: '#b0d6f7',
            light: '#ecf6ff',
            dark: '#4b6780',
            contrastText: '#242105',
          },
        },
      });

    useEffect(()=>{
        fetch('http://localhost:8000/api/authenticated/', {method: "GET", credentials: "include"})
        .then(response => {if (response.ok) {setLoggedIn(true); return response.json()}})
        .then(data => {
            if (data) {
                const userObj = JSON.parse(data.slice(1,-1)).fields
                setUser(userObj)
            }
        })
        .catch(e => console.log(e))

        fetch('http://localhost:8000/api/blog_post/', {method: "GET", credentials: "include"})
        .then(response => {
            setCsrftoken(response.headers.get('X-CSRFTOKEN'))
            return response.json()
        })
        .then(data => {
            const postsObj = JSON.parse(data)
            setPosts(postsObj)
            
        })
        .catch(e => console.log(e))
    }, [openModal])

    function handleCreatePost(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        fetch('http://localhost:8000/api/blog_post/', { method: form.method, headers: {
            "X-CSRFTOKEN": csrftoken
        },
            credentials: "include",
            body: formData})
        .then(response => {
            handleCloseModal()
          return response.json()
        })
        .catch(e => console.log(e))
    }

    if(loggedIn) {
        return(
            <>
            <ThemeProvider theme={theme}>
            <Box>
                <Navbar user={user} />
                <Typography variant='h3' sx={{fontWeight: 'bold', marginTop: 7}}>
                    Hello {user.first_name} {user.last_name}</Typography>
                <CardsList posts={posts}/>
                <Fab variant='extended' aria-label="add" sx={{position: 'fixed', bottom: 10, right: 10,
                     color:'alice.dark', bgcolor:'alice.light'}} onClick={handleOpenModal}>
                    <AddIcon />
                    Create New
                </Fab>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                >
                    <Zoom in={openModal}  style={{ transformOrigin: 'bottom right' }}>
                    <Box sx={{
                        position: 'absolute',
                        right: 0,
                        bottom:0,
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: 10,
                        borderBottomRightRadius: 0,
                        boxShadow: 24,
                        p: 4,
                        maxWidth: '70%',
                        maxHeight: '70%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <form method='POST' onSubmit={handleCreatePost}>
                    <TextField sx={{marginBottom: 2}}
                    id='newPostTitle'
                        label="Title"
                        name="title"
                    />
                    <TextField fullWidth multiline maxRows={10}
                    id='newPostBody'
                        label="Body"
                        name="post"
                    />
                    <Button type='submit'>
                        Submit
                    </Button>
                    </form>
                    </Box>
                    </Zoom>
                </Modal>
            </Box>
            </ThemeProvider>
            </>
            
        )
    } else {
        return(
            <>
            <Navbar user={user}/>
            <CardsList posts={posts}/>
            </>
        )
    }
}

export default Home
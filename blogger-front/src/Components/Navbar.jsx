import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ButtonBase from '@mui/material/ButtonBase';
import { Popover } from '@mui/material';

function Navbar(props)  {
    const navigate = useNavigate()
    const user = props.user
    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
    const [searchResults, setSearchResults] = useState([])
    
    const handleOpenSearchPopover = (event) => {
        setPopoverAnchorEl(document.getElementById('anchorForPopover'));
    };
    const handleCloseSeachPopover = () => {
        setPopoverAnchorEl(null);   
    };
    const openSearchPopover = Boolean(popoverAnchorEl);
    
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
    
    const pages = [];
    const settings = ['Profile', 'Logout'];
    
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    function handleSearch(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        let resultObj;
        
        fetch('http://localhost:8000/api/search/', { method: form.method, body: formData})
        .then(response => {
            return response.json()
        })
        .then(data=>{ 
            resultObj = JSON.parse(data)
            setSearchResults(resultObj)
         })
         .then(()=>{handleOpenSearchPopover()})
        .catch(e => console.log(e))
    }
    
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: 10,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 3,
        marginRight: 10,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'white',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }))
    
    let userButton;
    if(user.first_name){
        userButton = <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={user.first_name}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={user.first_name} id='anchorForPopover' />
        </IconButton>
        </Tooltip>
        
        <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        >
        {settings.map((setting) => (
            <MenuItem key={setting} onClick={()=>{
                if(setting === 'Logout') {
                    fetch('http://localhost:8000/api/logout/', {method: "GET", credentials: "include"})
                    .then(response => {if (response.ok) {navigate('/login')}})
                        .catch(e => console.log(e))
                } else {
                    navigate('/profile')
                }
            }}>
            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
            </MenuItem>
        ))}
        </Menu>
        </Box>
    } else {
        userButton = <Button variant="contained" sx={{ color: '#4b6780', backgroundColor: 'aliceblue', 
            borderRadius: 2, border: '1px solid transparent',
            '&:hover': { borderColor: '#4b6780', color: '#4b6780'}}} onClick={()=>navigate('/login')}  id='anchorForPopover'>
            Login</Button>
        }
        
        return(
            <>
            <ThemeProvider theme={theme}>
            <AppBar color='alice'  sx={{position: "fixed"}}>
            <Container maxWidth="xl">
            <Toolbar disableGutters>
            <ButtonBase onClick={()=>navigate('/')}>
            <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'white',
                '&:hover': {
                    color: 'alice.dark',
                },
                textDecoration: 'none',
            }}
            >
            Blogger
            </Typography>
            </ButtonBase>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            >
            <MenuIcon />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
            >
            {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
            ))}
            </Menu>
            </Box>
            <Typography 
            variant="h5"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                paddingRight: 10,
                color: 'white',
                textDecoration: 'none',
            }}
            >
            Blogger
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
            {pages.map((page) => (
                <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                {page}
                </Button>
            ))}
            </Box>
            <Search >
            <SearchIconWrapper>
            <SearchIcon />
            </SearchIconWrapper>
            <form method='POST' onSubmit={handleSearch}>
            <StyledInputBase
            name='search_query'
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            />
            </form>
            </Search>
                <Popover
                open={openSearchPopover}
                anchorEl={popoverAnchorEl}
                onClose={handleCloseSeachPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                >
                <Box width={500} maxHeight={500}>
                   { searchResults.map((searchResult)=> { return(
                    <Button key={searchResult.pk} sx={{width: 500}} onClick={()=> {navigate('search/'+searchResult.pk)}}>
                    <Typography key={searchResult.pk} sx={{ p: 2, width: 500}}> {searchResult.fields.title} </Typography>
                    </Button>
                    )}) 
                    }
                </Box>
                </Popover>
            {userButton}
            
            </Toolbar>
            </Container>
            </AppBar>
            </ThemeProvider>
            </>
        )
        
    }
    
export default Navbar
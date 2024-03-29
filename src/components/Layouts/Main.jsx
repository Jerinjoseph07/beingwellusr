import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import Heveview from './heve/Heveview';



// interface Props{
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }


const drawerWidth = 240;
const navItems = ['Home', 'Raises', 'Contact'];

export default function Main(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);







  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Beingwell
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}  component={RouterLink} to={`/${item.toLowerCase()}`}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  var [heve,setHeve]=React.useState(
    {
      "Leve":'',
      "Response":'Not Responded'
    }
  ) 
  const inputHandler = (e) =>{
    const {name,value}=e.target
    setHeve((heve) => ({...heve,[name]:value}))
    console.log(heve)
  }
  
  const addHandler = () =>{
    console.log("clicked")
  
    axios.post("http://localhost:3005/newheve",heve)
    .then((response)=>{
      alert("Record Saved")
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <Router>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
        <DragHandleIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Beingwell
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} component={RouterLink} to={`/${item.toLowerCase()}`} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar /> 
        <Routes>
            <Route path="/home" element={<Home/>} method='post' />
            <Route path="/" element={<Home />} method='post' />
            <Route path="/raises" element={<Heveview/>} method='get'/>
            <Route path="/contact"/>
            </Routes>
                {/* Fixed TextField and Submit Button at the bottom of the page */}
                <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'row' }}>
                <TextField
      fullWidth
      label="Type a message..."
      variant="outlined"
      name="Leve"
      value={heve.Leve}
      onChange={inputHandler}
      multiline
      rows={4}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="contained" color="primary" onClick={addHandler} >
              Send
            </Button>
          </InputAdornment>
        ),
      }}
    /> 
          </Box>
      </Box>
    </Box>
    </Router>
  );
}
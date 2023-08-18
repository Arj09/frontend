import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, styled} from '@mui/material';
import WebhookIcon from '@mui/icons-material/Webhook';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom'

const StyleToolbar = styled(Toolbar)({
  display:"flex",
  justifyContent: 'space-between',
  
 
})




export default function Navbar(){
    

   const [open, setOpen] = useState(false)

    const navigate = useNavigate() 

    const handleLogout =()=>{
      localStorage.removeItem("Edit_id")
      localStorage.removeItem("Token")
      navigate("/")
    }

    const handleProfile = ()=>{
      navigate("/profile")
    }
  return(
    <>
    <AppBar sx={{marginBottom:'50px'}}>
      <StyleToolbar>
        <Typography variant='h6' sx={{display:{xs:'none', md:'block'}}}>MernStack</Typography>
        <WebhookIcon sx={{display:{xs:'block', md:'none'}}}/>
        
        <IconButton
        onClick={e=>setOpen(true)}
       
        
        
        
        >
          <AccountCircleIcon style={{color:"white"}}/>
         
        </IconButton>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        
        open={open}
        onClose={e=>setOpen(false)}
       
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
       
      >
       
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      </StyleToolbar>


    </AppBar>
    
    
    </>
  )
}


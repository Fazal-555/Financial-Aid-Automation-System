import { Drawer, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { NavLink } from 'react-router-dom';
const DrawerComp = ({ links, view }) => {
  const [open, setOpen] = useState(false);
  let value = sessionStorage.getItem("value");
  let show = sessionStorage.getItem("display");
  return (
    <>
      {show === '9' ? <>
        <Drawer open={open} onClose={() => setOpen(false)} anchor='top' >
          <Stack direction={'column'} textAlign={'center'} onClick={() => setOpen(false)}  >
            {links.map((link, index) => {
                    if(link==='Students_Data')
                    {
                      return <NavLink to='/Students_Data' key={index}>Home</NavLink>
                    }
                    else
                    return <NavLink to={link} key={index}>{link}</NavLink>})}
            {value === '1' ? <NavLink to='/Admin' onClick={() => {
              view();
              sessionStorage.clear()
            }}>Logout</NavLink> : <NavLink to='/Student' onClick={() => {
              view();
              sessionStorage.clear()
            }}>Logout</NavLink>}
          </Stack>
        </Drawer>
        <IconButton onClick={() => setOpen(!open)} sx={{ color: '#4070f4', marginLeft: "auto" }}>
          <MenuRoundedIcon />
        </IconButton></>
        : <></>}
    </>
  )
}

export default DrawerComp

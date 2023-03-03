import React, { useState } from 'react'
import { Grid, AppBar, Toolbar, Typography, useTheme, useMediaQuery, Stack } from '@mui/material'
import DrawerComp from './DrawerComp';
import { NavLink } from 'react-router-dom';
const Navbar = ({ links,view,nav }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  // const [value, setValue] = useState(0);

  return (
    <>
      <AppBar position="sticky" className='navbar'>
        <Toolbar>
          {isMatch ? <>
          <Typography variant="h5" >FA Insights</Typography><DrawerComp links={links} view={view}/></> : 
          <Grid sx={{ placeItems: 'center' }} container>
            <Grid item xs={3}>
              <Stack direction={'row'}>
              <img src="../../logo.png" alt='null' width={'auto'} height={'60px'}/>
              <Typography variant="h5" mr={1} sx={{alignSelf:'center'}}>FA Insights</Typography>
              </Stack>
            </Grid>
            <Grid item xs={9} >  

                            {nav === '1' ?
                 <>        {
                  links.map((link,index) => {
                    if(link==='Students_Data')
                    {
                      return <NavLink to='/Students_Data' key={index}>Home</NavLink>
                    }
                    else
                    return <NavLink to={link} key={index}>{link}</NavLink>})}
                  <NavLink to='/Admin' onClick={() => {
                    view();
                    sessionStorage.clear()
                  }}>Logout</NavLink>
                </> :
                 <>      {
                  links.map((link,index) => {
                    return <NavLink to={link} key={index}>{link}</NavLink>})}
                  <NavLink to='/Student' onClick={() => {
                    view();
                    sessionStorage.clear()
                  }}>Logout</NavLink>
                </>}      

            </Grid>
          </Grid>}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

import React from 'react'
import { Box, Typography, Grid, TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from '@mui/material'
import { useLocation } from 'react-router-dom';
const AdminProfile = () => {
  const location = useLocation();
  const Student = location.state.tabledata;
  return (
    <>
      <Box p={{ xs: 3 }} className="page align">
        <Typography variant='h4' className='title' sx={{ padding: '20px', paddingLeft: '10px' }}>Student Profile<span className='dot'>.</span></Typography>
        <Box className='Card' pt={5}>
          <Grid container justifyContent='center' >
            <Grid item sm={4} lg={3} >
              <img src="../author-image-1-646x680.jpg" alt='null' width={'230px'} height={'300px'} />
            </Grid>
            <Grid item sm={8} lg={9} sx={{ display: 'flex', height: '300px' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body'>
              <Grid container rowSpacing={2} m={1} textAlign={{ md: 'start', xs: 'center',sm:'end' }} justifyContent={{xs:"center",md:'start',sm:'end'}}>
                <Grid item xs={12} sm={10} md={6}>
                  Name : {Student.Name}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Father/Guardian : {Student['Father/Guardian']}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Roll No. : {Student['Roll No.']}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Batch : {Student.Batch}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Gender : {Student['Gender']}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  CNIC : {Student.CNIC}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Email : {Student.Email}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Phone No. : {Student['Phone No.']}
                </Grid>
                {/* <Grid item xs={12} md={8} lg={6}>
                  Total Installments : 10
                </Grid>
                <Grid item xs={12} md={8} lg={6}>
                  Paid Installments : 4
                </Grid>
                <Grid item xs={12} md={8} lg={6}>
                  Remaining Installments : 6
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} className='card_body' mt={2}>
              <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                <Table stickyHeader={true} >
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' className='table_modify_2'>S#</TableCell>
                      <TableCell align='center' className='table_modify_2'>Semester</TableCell>
                      <TableCell align='center' className='table_modify_2'>Installment</TableCell>
                      <TableCell align='center' className='table_modify_2'>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow >
                      <TableCell align='center' className='table_modify'>1</TableCell>
                      <TableCell align='center' className='table_modify'>
                        Fall 2019
                      </TableCell>
                      <TableCell align='center' className='table_modify'>
                        173000
                      </TableCell>
                      <TableCell align='center' className='table_modify'>Paid</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='center' className='table_modify'>2</TableCell>
                      <TableCell align='center' className='table_modify'>
                        Spring 2020
                      </TableCell>
                      <TableCell align='center' className='table_modify'>
                        153000
                      </TableCell>
                      <TableCell align='center' className='table_modify'>Paid</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell align='center' className='table_modify'>3</TableCell>
                      <TableCell align='center' className='table_modify'>
                        Fall 2020
                      </TableCell>
                      <TableCell align='center' className='table_modify'>
                        121000
                      </TableCell>
                      <TableCell align='center' className='table_modify'>Unpaid</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default AdminProfile

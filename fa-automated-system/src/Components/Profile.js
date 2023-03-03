import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from '@mui/material'
import { useLocation } from 'react-router-dom';
const Profile = () => {
  // const location = useLocation();
  // const Student = location.state.tabledata;
  // let Apidata = {};

  const [data1, setData1] = useState('[]');

  const Apicall = async () => {
    await fetch('/std_profile', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({ arn_num: sessionStorage.getItem('ARN') })
      }
    }).then((res) => res.json()).then((data) => {
      setData1((prevData1) => prevData1 = data);
    })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    Apicall();
  }, [])


  return (
    <>
      <Box p={{ xs: 3 }} className="page align">
        <Typography variant='h4' className='title' sx={{ padding: '20px', paddingLeft: '10px' }}>Student Profile<span className='dot'>.</span></Typography>
        <Box className='Card' pt={5}>
          <Grid container justifyContent='center'  >
            <Grid item sm={4} lg={3} >
              <img src="../author-image-1-646x680.jpg" alt='null' width={'230px'} height={'300px'} />
            </Grid>
            <Grid item sm={8} lg={9} sx={{ display: 'flex', height: '300px' }} overflow={{ xs: "scroll" }} className='card_body'>
              <Grid container rowSpacing={2} m={1} textAlign={{ md: 'start', xs: 'center', sm: 'end' }} justifyContent={{ xs: "center", md: 'start', sm: 'end' }}>
                <Grid item xs={12} sm={10} md={6}>
                  Name : {JSON.stringify(data1) != '[]' ? data1[0]['stu_name'] : 'Null'}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Father/Guardian : {JSON.stringify(data1) != '[]' ? data1[0]['fath_name'] : 'Null'}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Postal Address : {JSON.stringify(data1) != '[]' ? data1[0]['stu_postal_address'] : 'Null'}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Degree : {JSON.stringify(data1) != '[]' ? data1[0]['stu_degree'] : 'Null'}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  CNIC : {JSON.stringify(data1) != '[]' ? data1[0]['stu_cnic'] : 'Null'}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Email : {JSON.stringify(data1) != '[]' ? data1[0]['stu_email'] : 'Null'}
                </Grid>
                <Grid item xs={12} sm={10} md={6}>
                  Cell No. :{JSON.stringify(data1) != '[]' ? data1[0]['stu_cell_number'] : 'Null'}
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
            {1 ? <Grid item xs={12} className='card_body' mt={2}>
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
            </Grid> : <></>}

          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Profile

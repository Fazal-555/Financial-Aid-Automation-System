import React, { useState, useEffect, useCallback } from 'react'
import Profile from './Profile';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, LinearProgress, ButtonGroup, FormControl, InputLabel, Select, MenuItem, } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { stu_info } from './Functions/Admin_Functions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Disclaimer from './Registration_Form/Disclaimer';
import { TriggerSubmit } from './Validation/InputCheck';

const UpdateProfile = () => {
  const usercheck = sessionStorage.getItem('value');
  const progress = 70;
  const [check, setCheck] = useState(1);
  const [reg_end_check, setReg_end_check] = useState(1);
  const [fa_check, setFa_check] = useState(0);
  const [fa, setFa] = useState(0);
  const [load, setLoad] = useState(1);
  const [stu_data, setStu_data] = useState({});
  const [parsecheck, Setparsecheck] = useState(0);
  const location = useLocation();
  const Student = location.state;
  const navigate = useNavigate();

  const datacatch = useCallback(async () => {
    if (sessionStorage.getItem('value') === '1') {
      setStu_data(Student['tabledata']);
      // console.log(Student['tabledata']['fa_per_check'])
      setFa(Student['tabledata']['fa_per_check']);
      Setparsecheck(1);
      setCheck(0);
      setLoad(0);
    }
    else {
      const res = await fetch('/Profile_show',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ arn_num: sessionStorage.getItem('ARN') })
          }
        }
      )
      await res.json().then((data) => {
        setCheck(data[0]['check1'])
        setReg_end_check(data[0]['reg_end_check'])
        setFa_check(data[0]['fa_check'])
        setFa(data[0]['fa_per_check']);
        setLoad(0);
      });
    }
  }, [])

  const updatedata = async () => {
    const res = await fetch('/Profile_update',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({ arn_num: sessionStorage.getItem('ARN') })
        }
      }
    )
    await res.json().then((data) => {
      if (data[0]['success'] === 'true')
        navigate('/Registration_Form')
    }).catch((err) => {
      if (err[0]['success'] === 'false')
        toast('Sorry Updation period is Over!', {
          type: "error"
        });
    });
  }


  const deletedata = async () => {
    console.log("hello")
    const res = await fetch('/Profile_delete',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({ arn_num: Student['tabledata']['arn'] })
        }
      }
    )
    await res.json().then((data) => {
      if (data[0]['success'] === 'true') {
        toast('Data Deleted successfully!', {
          type: "success"
        });
        navigate('/Applications');
      }
    }).catch((err) => {
      if (err[0]['success'] === 'false')
        toast('Data Delete Operation failed!', {
          type: "error"
        });
    });
  }


  const handleFA = async () => {
    const res = await fetch('/Fa_update',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({ fa_per_check: fa, arn_num: Student['tabledata']['arn'] })
        }
      }
    )
    await res.json().then((data) => {
      if (data[0]['success'] === 'true')
        toast('Query Update successfully!', {
          type: "success"
        });
    }).catch((err) => {
      if (err[0]['success'] === 'false')
        toast('Sorry Updation period is Over!', {
          type: "error"
        });
    });
    setFa(fa);
    navigate('/Applications');
  }


  useEffect(() => {

    datacatch();
    if (sessionStorage.getItem('value') !== '1')
      stu_info(setStu_data, Setparsecheck);
  }, [])


  // console.log(stu_data)
  return (
    load ? <Box p={{ xs: 3 }} className="page form-fill">
      <div className='center'>
        <Typography variant='h3' className='title'>Loading<span className='dot'>.....!</span></Typography>
      </div></Box> :
      check ? reg_end_check ?
        <Box p={{ xs: 3 }} className="page form-fill">
          <div className='center'>
            <Typography variant='h3' className='title'>No Detail Availble!</Typography>
          </div></Box> : <Profile /> : <>
        <Box p={{ xs: 3 }} className="page form-fill">
          <Box className='Registration_page'>
            <Typography variant='h4' mb={2} className='title' sx={{ padding: '20px', paddingLeft: '10px' }}>Personal Details<span className='dot'>.</span></Typography>
            <Box ml={{ sm: 10, xs: 3 }} mr={{ sm: 10, xs: 3 }} mt={2} mb={4} textAlign="center">
              <Typography variant='h6' mb={2}>Application Progress</Typography>
              <LinearProgress variant="determinate" value={progress} sx={{ height: '20px' }} color='info' />
            </Box>
            <Box textAlign={'center'}>
              <ButtonGroup variant="contained">
                {usercheck === '0' ? <Button onClick={() => updatedata()} className='btn'>Update Info</Button> :
                  <>

                    <Button color="primary" onClick={() => handleFA()}>Save Info</Button>
                    <Disclaimer Submitdata={TriggerSubmit} delete={1} />

                  </>}
              </ButtonGroup>
              <Button color="error" id='submit' onClick={() => deletedata()} sx={{display:'none'}}>Delete Info</Button>
            </Box>
            <Box>
              {usercheck === '0' ? <></> :
                <>
                  <Grid container justifyContent='center' mt={2}>
                    <Grid item xs={9} md={5}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">FA Percentage</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={fa}
                          label="Department"
                          onChange={(event) => setFa(event.target.value)}
                        >
                          <MenuItem value={0} >No FA</MenuItem>
                          <MenuItem value={25}>25%</MenuItem>
                          <MenuItem value={50}>50%</MenuItem>
                          <MenuItem value={75}>75%</MenuItem>
                          <MenuItem value={100}>100%</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </>
              }</Box>
            <Box className='Card' mt={3}>
              {sessionStorage.getItem('value') === '1' ? <Typography variant='h4' p={1} textAlign={'center'}>Financial Aid  <span className='dot'>{fa}%</span></Typography> : fa_check ? <Typography variant='h4' p={1} textAlign={'center'}>Financial Aid  <span className='dot'>{fa}%</span></Typography> : <></>}
              <Typography variant='h5' p={1} className='card_title'><span className='underline'>Student Information<span className='dot'>.</span></span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ sm: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} md={6}>
                  Name : {stu_data['stu_name']}
                </Grid>
                <Grid item xs={12} md={6}>
                  CNIC# : {stu_data['stu_cnic']}
                </Grid>
                <Grid item xs={12} md={6}>
                  FAST-NU Roll# : 19F-0219
                </Grid>
                <Grid item xs={12} md={6}>
                  Degree : {stu_data['stu_degree']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Postal Address : {stu_data['stu_postal_address']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Email Address : {stu_data['stu_email']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Cell Number : {stu_data['stu_cell_number']}
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} className='card_title'><span className='underline'>Father / Guardian Information<span className='dot'>.</span></span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ sm: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} md={6}>
                  Relation : {stu_data['fath_relation']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Name : {stu_data['fath_name']}
                </Grid>
                <Grid item xs={12} md={6}>
                  CNIC# : {stu_data['fath_cnic']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Profession : {stu_data['fath_profession']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Telephone Number : {stu_data['fath_telephone']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Postal Address : {stu_data['fath_postal_address']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Email Address : {stu_data['fath_email']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Cell Number : {stu_data['fath_cell_number']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Employment Status : {stu_data['fath_employment']}
                </Grid>
                <Grid item xs={12} >
                  <Typography variant='h6' pb={1}>Employment History<span className='dot'>.</span></Typography>
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>From</TableCell>
                          <TableCell align='center' className='table_modify_2'>To</TableCell>
                          <TableCell align='center' className='table_modify_2'>Designation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Organization</TableCell>
                          <TableCell align='center' className='table_modify_2'>Monthly Salary</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['fath_employment_data'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{tabledata['fath_From']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['fath_to']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['fath_Design']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['fath_Organize']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['fath_Salary']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} className='card_title'><span className='underline'>Mother Information<span className='dot'>.</span></span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ sm: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} md={6}>
                  Name : {stu_data['moth_name']}
                </Grid>
                <Grid item xs={12} md={6}>
                  CNIC# : {stu_data['moth_cnic']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Profession : {stu_data['moth_profession']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Telephone Number (Land line) : {stu_data['moth_telephone']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Postal Address : {stu_data['moth_postal_address']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Email Address : {stu_data['moth_email']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Telephone Number (Mobile) : {stu_data['moth_cell_number']}
                </Grid>
                <Grid item xs={12} md={6}>
                  Employment Status : {stu_data['moth_employment']}
                </Grid>
                <Grid item xs={12} >
                  <Typography variant='h6' pb={1}>Employment History<span className='dot'>.</span></Typography>
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>From</TableCell>
                          <TableCell align='center' className='table_modify_2'>To</TableCell>
                          <TableCell align='center' className='table_modify_2'>Designation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Organization</TableCell>
                          <TableCell align='center' className='table_modify_2'>Monthly Salary</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['moth_employment_data'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{tabledata['moth_From']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['moth_to']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['moth_Design']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['moth_Organize']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['moth_Salary']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Brother / Sister Information<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0} >(In School / Not Working)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Name</TableCell>
                          <TableCell align='center' className='table_modify_2'>Date of Birth</TableCell>
                          <TableCell align='center' className='table_modify_2'>Relation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Educational Institution & Grade / Class</TableCell>
                          <TableCell align='center' className='table_modify_2'>Annual Tuition Fee</TableCell>
                          <TableCell align='center' className='table_modify_2'>Annual Financial Aid / Loan / Scholarship</TableCell>
                          <TableCell align='center' className='table_modify_2'>GrantingAgency</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['sibling_not_working'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{tabledata['Name']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['DOB']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Relation']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['studydetail']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['fee']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['help']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['agency']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Brother / Sister Information<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0}>(Employed)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Name</TableCell>
                          <TableCell align='center' className='table_modify_2'>Date of Birth</TableCell>
                          <TableCell align='center' className='table_modify_2'>Relation (Brother / Sister)</TableCell>
                          <TableCell align='center' className='table_modify_2'>Profession (Service / Business)</TableCell>
                          <TableCell align='center' className='table_modify_2'>Designation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Company</TableCell>
                          <TableCell align='center' className='table_modify_2'>Monthly Income</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['sibling_working'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{tabledata['Name']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['DOB']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Relation']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['profession']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['desg']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['company']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['income']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className='Registration_page'>
            <Typography variant='h4' mb={2} className='title' sx={{ padding: '20px', paddingLeft: '7px' }}>Family Monthly Income<span className='dot'>.</span> (Current)</Typography>
            <Box className='Card' mt={3}>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Salary / Pension Income<span className='dot'>.</span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Relation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Average Monthly Income</TableCell>
                          <TableCell align='center' className='table_modify_2'>Employer(s)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Father / Guardian</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_1_1']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_1_1']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Mother</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_2_1']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_2_1']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Brothers / Sisters (Combined Monthly Income)</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_3_1']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_3_1']}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Income From Business<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0}  >(Including Agricultural Income)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Relation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Average Monthly Income</TableCell>
                          <TableCell align='center' className='table_modify_2'>Name and Type of Business</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Father / Guardian</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_1_2']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_1_2']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Mother</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_2_2']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_2_2']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Brothers / Sisters (Combined Monthly Income)</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_3_2']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_3_2']}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Income From Investments<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0} >(Dividends, Interest On Shares, Bonds, Fixed Deposits)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Relation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Average Monthly Income</TableCell>
                          <TableCell align='center' className='table_modify_2'>Name of Investment</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Father / Guardian</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_1_3']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_1_3']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Mother</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_2_3']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_2_3']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Brothers / Sisters (Combined Monthly Income)</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_3_3']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_3_3']}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Income From Rental / Other Sources<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0} >(Income From All Sources Not Listed Above)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Relation</TableCell>
                          <TableCell align='center' className='table_modify_2'>Average Monthly Income</TableCell>
                          <TableCell align='center' className='table_modify_2'>Source</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Father / Guardian</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_1_4']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_1_4']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Mother</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_2_4']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_2_4']}</TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell align='center' className='table_modify'>Brothers / Sisters (Combined Monthly Income)</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Income_3_4']}</TableCell>
                          <TableCell align='center' className='table_modify'>{stu_data['Title_3_4']}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className='Registration_page'>
            <Typography variant='h4' mb={2} className='title' sx={{ padding: '20px', paddingLeft: '7px' }}>Wealth Assessment<span className='dot'>.</span></Typography>
            <Box className='Card' mt={3}>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Properties Owned By Family<span className='dot'>.</span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>S#</TableCell>
                          <TableCell align='center' className='table_modify_2'>Address</TableCell>
                          <TableCell align='center' className='table_modify_2'>Property Type: Commercial / Residential Plot / Constructed</TableCell>
                          <TableCell align='center' className='table_modify_2'>Area (Square Feet)</TableCell>
                          <TableCell align='center' className='table_modify_2'>Approximate Market Value</TableCell>
                          <TableCell align='center' className='table_modify_2'>Status (Self Occupied / Rented Out / Vacant)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['properties'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{index + 1}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Address']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Property_Type']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Area']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['market_value']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['status']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Vechiles Owned By Family<span className='dot'>.</span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>S#</TableCell>
                          <TableCell align='center' className='table_modify_2'>Make and Model (Year)</TableCell>
                          <TableCell align='center' className='table_modify_2'>Registration #</TableCell>
                          <TableCell align='center' className='table_modify_2'>Approximate Market Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['vechiles'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{index + 1}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['car_status']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Register']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['market_value']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Investments And Valuables<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0} >(Shares, Bonds, Fixed Deposits, Gold etc.)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>S#</TableCell>
                          <TableCell align='center' className='table_modify_2'>Investment Type</TableCell>
                          <TableCell align='center' className='table_modify_2'>Face Value</TableCell>
                          <TableCell align='center' className='table_modify_2'>Approximate Market Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['investments'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{index + 1}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['invest_type']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Face_value']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['market_value']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Assets<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0} >(All Family Assets Not Listed Above.)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>S#</TableCell>
                          <TableCell align='center' className='table_modify_2'>Investment Type</TableCell>
                          <TableCell align='center' className='table_modify_2'>Face Value</TableCell>
                          <TableCell align='center' className='table_modify_2'>Approximate Market Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['assets'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{index + 1}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['invest_type']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Face_value']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['market_value']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className='Registration_page'>
            <Typography variant='h4' mb={2} className='title' sx={{ padding: '20px', paddingLeft: '7px' }}>Utility Expenses<span className='dot'>.</span></Typography>
            <Box className='Card' mt={3}>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Telephone Expenses<span className='dot'>.</span></Typography>
              <Typography variant='h7' p={1} pt={0} >(Both Land And Mobile)</Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Telephone #</TableCell>
                          <TableCell align='center' className='table_modify_2'>Average Monthly Bill</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['telephone_expenses'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{tabledata['Telephone']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['avg_bill']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Electricity Expenses<span className='dot'>.</span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Consumer Number</TableCell>
                          <TableCell align='center' className='table_modify_2'>Address</TableCell>
                          <TableCell align='center' className='table_modify_2'>Average Monthly Bill</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['electricity_expenses'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{tabledata['Cn']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Address']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['avg_bill']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Typography variant='h5' p={1} pb={0} className='card_title'>Gas Expenses<span className='dot'>.</span></Typography>
              <Grid container rowSpacing={2} justifyContent={{ md: "flex-start", xs: 'center' }} sx={{ display: 'flex' }} textAlign={{ md: 'start', xs: 'center' }} overflow={{ xs: "scroll" }} className='card_body' p={1}>
                <Grid item xs={12} >
                  <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                    <Table stickyHeader={true}>
                      <TableHead >
                        <TableRow>
                          <TableCell align='center' className='table_modify_2'>Consumer Number</TableCell>
                          <TableCell align='center' className='table_modify_2'>Address</TableCell>
                          <TableCell align='center' className='table_modify_2'>Average Monthly Bill</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsecheck ? (JSON.parse(stu_data['gas_expenses'])).map((tabledata, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center' className='table_modify'>{tabledata['Cn']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['Address']}</TableCell>
                              <TableCell align='center' className='table_modify'>{tabledata['avg_bill']}</TableCell>
                            </TableRow>
                          )
                        }) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </>
  )
}

export default UpdateProfile

import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { admin_info, search, Stu_app_status, Stu_batch, Stu_department } from './Functions/Admin_Functions';
import { IsInputNumber } from './Validation/InputCheck';

const ApplicationData = () => {
    const navigate = useNavigate();
    const [parsecheck, Setparsecheck] = useState(0);
    const [load, setLoad] = useState(1);
    const [data, setData] = useState({});
    const [fa_show, setFa_show] = useState(0);

    const [department, setDepartment] = useState('all');

    const handleDepartment = (event) => {
        Stu_department(event.target.value, setDepartment, setData);
    };

    const [batch, setBatch] = useState([5]);
    const [batch1, setBatch1] = useState(5);

    const handleBatch = (event) => {
        Stu_batch(event.target.value, setBatch1, setData);
    };

    const [stat, setStat] = useState(5);

    const handleStatus = (event) => {
        Stu_app_status(event.target.value, setStat, setData)
    };

    const DisplayFA = async () => {
        const res3 = await fetch('/admindata', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ dynamic: 0, fa_show: fa_show ? 0 : 1 })
            }
        });
        await res3.json().then((res3) => {
            // console.log(res3)
            setFa_show(res3['fa_check'])
            setLoad(0);
        }
        )
    }
    useEffect(() => {
        admin_info(setData, '/Appsdata', Setparsecheck, setBatch, setFa_show, setLoad);
    }, []);
    // console.log(data);
    return (
        load ? <Box p={{ xs: 3 }} className="page form-fill">
            <div className='center'>
                <Typography variant='h3' className='title'>Loading<span className='dot'>.....!</span></Typography>
            </div></Box> :
            <Box p={{ xs: 3 }} className="page align form-fill">
                <Typography variant='h4' className='title' sx={{ padding: '20px', paddingLeft: '10px' }}>Applications Record<span className='dot'>.</span></Typography>
                <Grid container justifyContent='center' rowSpacing={3} mt={2}>
                    <Grid container item columnSpacing={{ sm: 6, xs: 1 }} justifyContent='center' rowSpacing={3}>
                        <Grid item xs={9} md={5}><TextField fullWidth label="Enter ARN" inputProps={{ maxLength: 7 }} autoComplete='off' variant='filled' id='Search' onKeyDown={(event) => IsInputNumber(event)} /></Grid>
                        <Grid item xs={3} md={2} mt={1}><Button fullWidth variant="contained" className='btn' size='large' onClick={() => { search(document.getElementById('Search').value, setData) }}>Search</Button></Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={department}
                                    label="Department"
                                    onChange={handleDepartment}
                                >
                                    <MenuItem value={'all'}>All Departments</MenuItem>
                                    <MenuItem value={'CS'}>Computer Science</MenuItem>
                                    <MenuItem value={'BA'}>Managment</MenuItem>
                                    <MenuItem value={'SE'}>Software Engineering</MenuItem>
                                    <MenuItem value={'EE'}>Electrical Engineering</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={batch1}
                                    label="Batch"
                                    onChange={handleBatch}
                                >
                                    {batch.map((batchdata, batchindex) => {
                                        if (batchdata === 5)
                                            return (<MenuItem value={batchdata} key={batchindex}>All Batches</MenuItem>)
                                        else
                                            return (<MenuItem value={batchdata} key={batchindex}>{"20" + batchdata}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Application Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={stat}
                                    label="Application Status"
                                    onChange={handleStatus}
                                >
                                    <MenuItem value={5}>All Students</MenuItem>
                                    <MenuItem value={1}>Approved</MenuItem>
                                    <MenuItem value={0}>Pending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={5}><Button fullWidth variant="contained" color="error" size='large' >Transfer</Button></Grid>
                        <Grid item xs={6} md={5}><Button fullWidth variant="contained" color={fa_show ? "success" : "error"} size='large' onClick={DisplayFA}>FA Show : {fa_show ? "Active" : "Non-Active"}</Button></Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                            <Table stickyHeader={true}>
                                <TableHead >
                                    <TableRow>
                                        <TableCell align='center' className='table_modify_2'>ARN</TableCell>
                                        <TableCell align='center' className='table_modify_2'>Name</TableCell>
                                        <TableCell align='center' className='table_modify_2'>CNIC</TableCell>
                                        <TableCell align='center' className='table_modify_2'>Father/Guardian</TableCell>
                                        <TableCell align='center' className='table_modify_2'>Email</TableCell>
                                        <TableCell align='center' className='table_modify_2'>Phone No.</TableCell>
                                        <TableCell align='center' className='table_modify_2'>Degree</TableCell>
                                        <TableCell align='center' className='table_modify_2'>FA %</TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {parsecheck ? data.map((tabledata) => {
                                        if (tabledata.length !== 3)
                                            return (
                                                <TableRow key={tabledata['arn']} onClick={() => navigate('Home', { state: { tabledata } })} >
                                                    <TableCell align='center' className='table_modify'>{tabledata['arn']}</TableCell>
                                                    <TableCell align='center' className='table_modify'>{tabledata['stu_name']}</TableCell>
                                                    <TableCell align='center' className='table_modify'>{tabledata['stu_cnic']}</TableCell>
                                                    <TableCell align='center' className='table_modify'>{tabledata['fath_name']}</TableCell>
                                                    <TableCell align='center' className='table_modify'>{tabledata['stu_email']}</TableCell>
                                                    <TableCell align='center' className='table_modify'>{tabledata['stu_cell_number']}</TableCell>
                                                    <TableCell align='center' className='table_modify'>{tabledata['stu_degree']}</TableCell>
                                                    <TableCell align='center' className='table_modify'>{tabledata['fa_per_check']}</TableCell>
                                                </TableRow>
                                            )
                                    }) : <></>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
    )
}

export default ApplicationData

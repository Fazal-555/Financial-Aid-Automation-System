import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const StudentsData = () => {
    const navigate = useNavigate();
    const data = [{
        'Roll No.': "19F-0219",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0218",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0217",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0216",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0215",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0214",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0213",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0212",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }, {
        'Roll No.': "19F-0211",
        'Name': "Umar Draz",
        'CNIC': '33100-9876544-0',
        'Father/Guardian': 'Tariq Jamil',
        'Email': 'umardraz12340@gmail.com',
        'Phone No.': '0306-7679583',
        'Batch': '2019',
        'Gender': 'Male'
    }];

    const [department, setDepartment] = useState(5);

    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    const [batch, setBatch] = useState(5);

    const handleBatch = (event) => {
        setBatch(event.target.value);
    };

    return (
        <Box p={{ xs: 3 }} className="page align form-fill">
            <Typography variant='h4' className='title' sx={{ padding: '20px', paddingLeft: '10px' }}>Students Record<span className='dot'>.</span></Typography>
            <Grid container justifyContent='center' rowSpacing={3} mt={2}>
                <Grid container item columnSpacing={{ sm: 6, xs: 1 }} justifyContent='center' rowSpacing={3}>
                    <Grid item xs={7} md={5}><TextField fullWidth label="Search" variant='filled' /></Grid>
                    <Grid item xs={3} md={2} mt={1}><Button fullWidth variant="contained" className='btn' size='large'>Search</Button></Grid>
                    <Grid item xs={10} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Department"
                                onChange={handleChange}
                            >
                                <MenuItem value={5}>All Departments</MenuItem>
                                <MenuItem value={10}>Computer Science</MenuItem>
                                <MenuItem value={20}>Managment</MenuItem>
                                <MenuItem value={30}>Software Engineering</MenuItem>
                                <MenuItem value={40}>Electrical Engineering</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} md={5}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={batch}
                                label="Batch"
                                onChange={handleBatch}
                            >
                                <MenuItem disabled value={5}>Select Batch</MenuItem>
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
                        <Table stickyHeader={true}>
                            <TableHead >
                                <TableRow>
                                    <TableCell align='center' className='table_modify_2'>Roll No.</TableCell>
                                    <TableCell align='center' className='table_modify_2'>Name</TableCell>
                                    <TableCell align='center' className='table_modify_2'>CNIC</TableCell>
                                    <TableCell align='center' className='table_modify_2'>Father/Guardian</TableCell>
                                    <TableCell align='center' className='table_modify_2'>Email</TableCell>
                                    <TableCell align='center' className='table_modify_2'>Phone No.</TableCell>
                                    <TableCell align='center' className='table_modify_2'>Batch</TableCell>
                                    <TableCell align='center' className='table_modify_2'>Gender</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((tabledata) => {
                                    return (
                                        <TableRow key={tabledata['Roll No.']} onClick={() => navigate('Adminprofile', { state: { tabledata } })}>
                                            <TableCell align='center' className='table_modify'>{tabledata['Roll No.']}</TableCell>
                                            <TableCell align='center' className='table_modify'>{tabledata['Name']}</TableCell>
                                            <TableCell align='center' className='table_modify'>{tabledata['CNIC']}</TableCell>
                                            <TableCell align='center' className='table_modify'>{tabledata['Father/Guardian']}</TableCell>
                                            <TableCell align='center' className='table_modify'>{tabledata['Email']}</TableCell>
                                            <TableCell align='center' className='table_modify'>{tabledata['Phone No.']}</TableCell>
                                            <TableCell align='center' className='table_modify'>{tabledata['Batch']}</TableCell>
                                            <TableCell align='center' className='table_modify'>{tabledata['Gender']}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StudentsData

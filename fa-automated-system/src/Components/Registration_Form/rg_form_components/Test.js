import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Formik, Form, FastField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';

const Test = (props) => {
    console.log(props.mtft_data)
    const [open, setOpen] = React.useState(false);
    const [total, setTotal] = React.useState(props.mtft_data.length);
    const [data, setData] = React.useState(props.mtft_data);
    let initialValues = {};
    let yupobject = {};
    let propdata = [];

    for (let i = 0; i < Object.keys(props).length - 4; i++) {
        propdata.push(props[Object.keys(props)[i]]);
        if (i !== 0 && i !== 1 && i !== 2) {
            initialValues = { ...initialValues, [Object.keys(props)[i]]: '' }
            if (Object.keys(props)[i] == 'Telephone')
                yupobject = { ...yupobject, [Object.keys(props)[i]]: Yup.string().matches('[0-9]{10}', 'Phone number is not valid').required('Required *') }
            else
                yupobject = { ...yupobject, [Object.keys(props)[i]]: Yup.string().required('Required *') }
        }
    }
    // console.log(Object.keys(props))
    // console.log(initialValues)
    // console.log(propdata)
    const choice = propdata[0];


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        let dataobject = {};
        for (let i = 3; i < Object.keys(props).length - 4; i++) {
            dataobject = { ...dataobject, [Object.keys(props)[i]]: values[Object.keys(props)[i]] };
        }
        // console.log(dataobject);
        // console.log(values)
        setData(prevData => [...prevData, dataobject]);
        setTotal(prevTotal => prevTotal + 1);
        setOpen(false);
        props.data_store(values);
    };
    function deleteEmp(index) {
        setData(prevData => {
            prevData.splice(index, 1)
            return prevData
        })
        setTotal(prevTotal => prevTotal - 1);
        props.delete_data(index);
    }

    //validationSchema={validationSchema}
    const validationSchema = Yup.object(yupobject);

    return (
        <div className='wealth_section'>
            {total < propdata[1] ? <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: 'white !important', borderColor: '#4070f4', color: '#4070f4' }} startIcon={<AddSharpIcon sx={{ stroke: '#4070f4', strokeWidth: 2 }} />}>
                {props.btn}
            </Button> : <></>}
            <Dialog open={open} onClose={handleClose}>
                <Box bgcolor={'white'}>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} >
                        <Form>
                            <DialogTitle textAlign='center' color={'#4070f4'} mt={1}>{propdata[2]}</DialogTitle>
                            <DialogContent>
                                <Grid container rowSpacing={2} justifyContent='center'>
                                    {choice === '0' ? <Grid item xs={12}>
                                        <FastField component={(prop) => (<>  <label>{Object.keys(props)[4]} :</label>
                                            <select className='select' {...prop.field}>
                                                <option value="" disabled>Select Category</option>
                                                <option value="Commercial">Commercial</option>
                                                <option value="Residential">Residential</option>
                                                <option value='Constructed'>Constructed</option>
                                                <option value='Plot'>Plot</option>
                                            </select></>)} id={Object.keys(props)[4]} name={Object.keys(props)[4]} />
                                        <div className='error_msg'><ErrorMessage name={Object.keys(props)[4]} /></div>
                                    </Grid> : <></>}
                                    {
                                        propdata.map((data, index) => {
                                            if (index !== 0 && index !== 1 && index !== 2) {
                                                if (data !== 'Property Type' && data !== 'Status') {
                                                    if (data[0] == 'Telephone Number') {
                                                        return (<Grid item xs={12} key={index}>
                                                            <FastField component={(props) => (<div><label>{data[0]} :</label> <input type='text' autoComplete="off" onKeyDown={(event) => data[1](event)} minLength='10' maxLength='10'  {...props.field} /></div>)} id={Object.keys(props)[index]} name={Object.keys(props)[index]} />
                                                            <div className='error_msg'><ErrorMessage name={Object.keys(props)[index]} /></div>
                                                        </Grid>)
                                                    }
                                                    else {
                                                        return (<Grid item xs={12} key={index}>
                                                            <FastField component={(props) => (<div><label>{data[0]} :</label> <input type='text' autoComplete="off" onKeyDown={(event) => data[1](event)} {...props.field} /></div>)} id={Object.keys(props)[index]} name={Object.keys(props)[index]} />
                                                            <div className='error_msg'><ErrorMessage name={Object.keys(props)[index]} /></div>
                                                        </Grid>)
                                                    }
                                                }
                                            }

                                        })
                                    }
                                    {choice === '0' ? <Grid item xs={12}>
                                        <FastField component={(prop) => (<>  <label>{Object.keys(props)[7]} :</label>
                                            <select className='select' {...prop.field}>
                                                <option value="" disabled>Select Category</option>
                                                <option value="Self Occupied">Self Occupied</option>
                                                <option value="Rented Out">Rented Out</option>
                                                <option value='Vacant'>Vacant</option>
                                            </select></>)} id={Object.keys(props)[7]} name={Object.keys(props)[7]} />
                                        <div className='error_msg'><ErrorMessage name={Object.keys(props)[7]} /></div>
                                    </Grid> : <></>}
                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'space-between', paddingX: '40px', paddingBottom: '20px' }}>
                                <Button onClick={handleClose} sx={{ backgroundColor: 'white !important', color: '#4070f4' }} fullWidth>Cancel</Button>
                                <Button type='submit' variant="contained" fullWidth>Save</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Box>
            </Dialog>
            {total ? <Grid mt={2}>
                <TableContainer className='whole_table_border' sx={{ maxHeight: '80vh', maxWidth: '100vw' }}>
                    <Table stickyHeader={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' className='table_modify_2'>S#</TableCell>
                                {
                                    propdata.map((data, index) => {
                                        if (index !== 0 && index !== 1 && index !== 2) {
                                            if (data !== 'Property Type' && data !== 'Status')
                                                return (<TableCell align='center' key={index} className='table_modify_2'>{data[0]}</TableCell>)
                                            else
                                                return (<TableCell align='center' key={index} className='table_modify_2'>{data}</TableCell>)
                                        }

                                    })
                                }
                                <TableCell align='center' className='table_modify_2'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((tabledata, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' className='table_modify'>{index + 1}</TableCell>
                                        {
                                            Object.keys(tabledata).map((data1, indexvalue) => {
                                                return (<TableCell align='center' key={indexvalue} className='table_modify'>{tabledata[data1]}</TableCell>)
                                            })
                                        }
                                        <TableCell align='center' className='table_modify'><Button variant='contained' onClick={() => deleteEmp(index)}>Delete</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid> : <></>}
        </div>
    );
}

export default Test

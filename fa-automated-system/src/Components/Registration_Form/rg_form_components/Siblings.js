import * as React from 'react';
import Button from '@mui/material/Button';
import { IsInputText } from '../../Validation/InputCheck';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Formik, Form, FastField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

const Siblings = (props) => {
    const input_type = props[Object.keys(props)[4]];
    const choice = props.choice;
    const [open, setOpen] = React.useState(false);
    const [total, setTotal] = React.useState(props.mtft_data.length);
    const [data, setData] = React.useState(props.mtft_data);
    const propdata = ['Name', 'DOB', 'Relation', Object.keys(props)[0], Object.keys(props)[1], Object.keys(props)[2], Object.keys(props)[3]];
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        setData(prevData => [...prevData, {
            [propdata[0]]: values[propdata[0]],
            [propdata[1]]: values[propdata[1]],
            [propdata[2]]: values[propdata[2]],
            [propdata[3]]: values[propdata[3]],
            [propdata[4]]: values[propdata[4]],
            [propdata[5]]: values[propdata[5]],
            [propdata[6]]: values[propdata[6]]
        }]);
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

    const initialValues = {
        [propdata[0]]: '',
        [propdata[1]]: '',
        [propdata[2]]: '',
        [propdata[3]]: '',
        [propdata[4]]: '',
        [propdata[5]]: '',
        [propdata[6]]: ''
    };

    const validationSchema = Yup.object({
        [propdata[0]]: Yup.string().required('Required'),
        [propdata[1]]: Yup.string().required('Required'),
        [propdata[2]]: Yup.string().required('Required'),
        [propdata[3]]: Yup.string().required('Required'),
        [propdata[4]]: Yup.string().required('Required'),
        [propdata[5]]: Yup.string().required('Required'),
        [propdata[6]]: Yup.string().required('Required'),
    })

    //validationSchema={validationSchema}
    return (
        <>
            {total < 4 ? <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: 'white !important', borderColor: '#4070f4', marginLeft: '16px', color: '#4070f4' }} startIcon={<AddSharpIcon sx={{ stroke: '#4070f4', strokeWidth: 2 }} />}>
                Add Siblings Info
            </Button> : <></>}

            <Dialog open={open} onClose={handleClose}>
                <Box bgcolor={'white'}>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <DialogTitle textAlign='center' color={'#4070f4'} mt={1}>Add Siblings Info (Not Working)</DialogTitle>
                            <DialogContent >

                                <Grid container rowSpacing={2} justifyContent='center'  >
                                    <Grid item xs={12} >
                                        <FastField component={(props) => (<div><label>Name(Eldest First) :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} /></div>)} id={propdata[0]} name={propdata[0]} />
                                        <div className='error_msg'><ErrorMessage name={propdata[0]} /></div>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <FastField component={(props) => (<div><label>Date of Birth :</label> <input type='date' {...props.field} /></div>)} id={propdata[1]} name={propdata[1]} />
                                        <div className='error_msg'><ErrorMessage name={propdata[1]} /></div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField component={(props) => (<>  <label>Relation :</label>
                                            <select className='select' {...props.field}>
                                                <option value="" disabled>Select Category</option>
                                                <option value="Brother">Brother</option>
                                                <option value="Sister">Sister</option>
                                            </select></>)} id={propdata[2]} name={propdata[2]} />
                                        <div className='error_msg'><ErrorMessage name={propdata[2]} /></div>
                                    </Grid>
                                    {choice == 0 ?
                                        <Grid item xs={12}>
                                            <FastField component={(props) => (<div><label>Educational institution and grade/class :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} /></div>)} id={propdata[3]} name={propdata[3]} />
                                            <div className='error_msg'><ErrorMessage name={propdata[3]} /></div>
                                        </Grid> :
                                        <Grid item xs={12}>
                                            <FastField component={(props) => (<>  <label>Profession :</label>
                                                <select className='select' {...props.field}>
                                                    <option value="" disabled>Select Category</option>
                                                    <option value="Service">Service</option>
                                                    <option value="Business">Business</option>
                                                </select></>)} id={propdata[3]} name={propdata[3]} type='text' />
                                            <div className='error_msg'><ErrorMessage name={propdata[3]} /></div>
                                        </Grid>}

                                    <Grid item xs={12}>
                                        <FastField component={(prop) => (<div><label>{props[Object.keys(props)[1]]} :</label> <input type='text' autoComplete="off" onKeyDown={(event) => input_type[0](event)} {...prop.field} /></div>)} id={propdata[4]} name={propdata[4]} />
                                        <div className='error_msg'><ErrorMessage name={propdata[4]} /></div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField component={(prop) => (<div><label>{props[Object.keys(props)[2]]} :</label> <input type='text' autoComplete="off" onKeyDown={(event) => input_type[1](event)} {...prop.field} /></div>)} id={propdata[5]} name={propdata[5]} />
                                        <div className='error_msg'><ErrorMessage name={propdata[5]} /></div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField component={(prop) => (<div><label>{props[Object.keys(props)[3]]} :</label> <input type='text' autoComplete="off" onKeyDown={(event) => input_type[2](event)} {...prop.field} /></div>)} id={propdata[6]} name={propdata[6]} />
                                        <div className='error_msg'><ErrorMessage name={propdata[6]} /></div>
                                    </Grid>
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

            {total ? <Grid p={2} >
                <TableContainer className='whole_table_border' sx={{ maxHeight: '80vh', maxWidth: '100vw' }}>
                    <Table stickyHeader={true}>
                        <TableHead >
                            <TableRow>
                                <TableCell align='center' className='table_modify_2'>Name</TableCell>
                                <TableCell align='center' className='table_modify_2'>Date of Birth</TableCell>
                                <TableCell align='center' className='table_modify_2'>Relation</TableCell>
                                <TableCell align='center' className='table_modify_2'>{propdata[3]}</TableCell>
                                <TableCell align='center' className='table_modify_2'>{props[Object.keys(props)[1]]}</TableCell>
                                <TableCell align='center' className='table_modify_2'>{props[Object.keys(props)[2]]}</TableCell>
                                <TableCell align='center' className='table_modify_2'>{props[Object.keys(props)[3]]}</TableCell>
                                <TableCell align='center' className='table_modify_2'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((tabledata, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' className='table_modify'>{tabledata[propdata[0]]}</TableCell>
                                        <TableCell align='center' className='table_modify'>{tabledata[propdata[1]]}</TableCell>
                                        <TableCell align='center' className='table_modify'>{tabledata[propdata[2]]}</TableCell>
                                        <TableCell align='center' className='table_modify'>{tabledata[propdata[3]]}</TableCell>
                                        <TableCell align='center' className='table_modify'>{tabledata[propdata[4]]}</TableCell>
                                        <TableCell align='center' className='table_modify'>{tabledata[propdata[5]]}</TableCell>
                                        <TableCell align='center' className='table_modify'>{tabledata[propdata[6]]}</TableCell>
                                        <TableCell align='center' className='table_modify'><Button variant='contained' onClick={() => deleteEmp(index)}>Delete</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid> : <></>}
        </>
    );
}

export default Siblings

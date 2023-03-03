import React from 'react';
import { Typography, Grid, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import { IsInputTextNum } from './Validation/InputCheck';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Adminlogin = ({ check, changeview }) => {

    const navigate = useNavigate();

    const initialValues = {
        usr_name: '',
        password: ''
    };



    const onSubmit = async (values) => {
        let Entry = [];
        if (values['usr_name'] == '' || values['password'] == '')
        toast('Please provide complete information!', {
            type:"info"
        });
        else {
            const response = await fetch('/admin')
                .then((res) => res.json())
                .then((data) => {
                    Entry = data;
                })
                .catch((err) => {
                    console.log(err.message);
                });

            if (Entry[0]['usr_name'] == values['usr_name'] && Entry[0]['password'] == values['password']) {
                toast('Login Successful', {
                    type:"success",
                });
                console.log("hello")
                sessionStorage.setItem("value", 1);
                sessionStorage.setItem("display", 9);
                check(sessionStorage.getItem("value"))
                changeview(sessionStorage.getItem("display"))
                navigate('/Students_Data')
            }
            else {
                toast('Wrong Data provided Please Try Again!', {
                    type:"error"
                });
            }
        }
    }


    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
                <Form>
                    <Stack direction={{ xs: 'column-reverse', md: 'row' }} id='main_page'>
                        <Grid container md={4} item justifyContent='center' rowSpacing={{ xs: 4, xl: 5 }} >
                            <Grid item xs={5} md={6} ><img src="../2.png" alt='null' width='100%' /></Grid>
                            <Grid item xs={11}><Typography variant='h4' className='title' pb={1} textAlign='start'>Sign In<span className='dot'>.</span></Typography></Grid>
                            <Grid item xs={11} ><FastField component={(props) => (<div><label>Username :</label> <input type='text' onKeyDown={(event) => IsInputTextNum(event)} autoComplete="off" {...props.field} /></div>)} id='usr_name' name='usr_name' />
                                <div className='error_msg'><ErrorMessage name='usr_name' /></div></Grid>
                            <Grid item xs={11} ><FastField component={(props) => (<div><label>Password :</label> <input type='password' autoComplete="off" onKeyDown={(event) => IsInputTextNum(event)} {...props.field} /></div>)} id='password' name='password' />
                                <div className='error_msg'><ErrorMessage name='password' /></div></Grid>
                            <Grid item xs={4} lg={3} pb={2}><Button fullWidth variant="contained" type='submit' className='btn'>Sign In</Button></Grid>
                        </Grid>
                        <Grid container md={8} item id='bg_back' justifyContent='center' p={0}>
                            <img src="../IMG_5750_1-min-760x400.jpg" alt='null' width='100%' />
                        </Grid>
                    </Stack>
                </Form>
            </Formik>
            
        </>
    )
}

export default Adminlogin

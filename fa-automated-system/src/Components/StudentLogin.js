import React from 'react'
import { IsInputNumber, IsInputTextNum } from './Validation/InputCheck';
import { Typography, Grid, Stack, Button } from '@mui/material';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Studentlogin = ({ check, changeview }) => {
    const navigate = useNavigate();
    const initialValues = {
        arn_num: '',
        password: ''
    };

    const onSubmit = async (values) => {
        if(values['arn_num']==''|| values['password']=='' )
        toast('Please provide complete information!', {
            type:"info"
        });
        else
        {
        const res = await fetch('/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify(values)
            }
        })
        const ans = await res.json();
        if (ans[0]['arn_num'] === values['arn_num'] && ans[0]['password'] === values['password']) {
            toast('Login Successful!', {
                type:"success",
            });
            sessionStorage.setItem("value", 0);
            sessionStorage.setItem("display", 9);
            sessionStorage.setItem("ARN",ans[0]['arn_num']);
            check(sessionStorage.getItem("value"));
            changeview(sessionStorage.getItem("display"));
            navigate('/Home')
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
                        <Grid container md={4} item justifyContent='center' rowSpacing={{ xs: 4, xl: 5 }} columnSpacing={2} >
                            <Grid item xs={5} md={6} textAlign='center'><img src="../2.png" alt='null' width='100%' /></Grid>
                            <Grid item xs={11}  ><Typography variant='h4' className='title' pb={1} textAlign='start'>Sign In<span className='dot'>.</span></Typography></Grid>
                            <Grid item xs={11} ><FastField component={(props) => (<div><label>ARN Number :</label> <input type='text' minLength='7' maxLength='7' onKeyDown={(event) => IsInputNumber(event)} autoComplete="off" {...props.field} /></div>)} id='arn_num' name='arn_num' />
                                <div className='error_msg'><ErrorMessage name='arn_num' /></div></Grid>
                            <Grid item xs={11} ><FastField component={(props) => (<div><label>Password :</label> <input type='password' onKeyDown={(event) => IsInputTextNum(event)} autoComplete="off" {...props.field} /></div>)} id='password' name='password' />
                                <div className='error_msg'><ErrorMessage name='password' /></div></Grid>
                            <Grid item lg={4} pb={2}><Button fullWidth variant="contained" type='submit' className='btn'>Sign In</Button></Grid>
                            <Grid item lg={4} ><Button fullWidth variant="contained" onClick={() => {
                                navigate('/SignUp')
                            }} className='btn'>Sign Up</Button></Grid>
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

export default Studentlogin

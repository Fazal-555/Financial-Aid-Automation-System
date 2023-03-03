import React, { useEffect } from 'react'
import { Button, Box, Typography, LinearProgress } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { TriggerSubmit } from '../Validation/InputCheck';
import Disclaimer from './Disclaimer';
import { Formik, Form } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { reg_path_check } from '../Functions/Admin_Functions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Upload_documents = () => {

    const progress = 95;
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log(values);
        const res = await fetch('/reg_data', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ arn: sessionStorage.getItem('ARN'), path: '"false"' })
            }
        })
        const ans = await res.json();
        console.log(ans)
        if (ans[0]['success'] == 'false') {
            toast('There is something error in the provided data!', {
                type:"error"
            });
        }
        else {
            toast('Data Submitted Successfully!', {
                type:"success",
            });
            navigate('/Home');
        }

    };
    const check = window.location.pathname;

    useEffect(()=>
    {
        reg_path_check(check ,navigate);
    },[])


    function fileValidation(data) {
        var fileInput =
            document.getElementById('file');

        var filePath = fileInput.value;

        // Allowing file type
        var allowedExtensions =
            /(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd|\.jpg)$/i;

        if (!allowedExtensions.exec(filePath)) {
            alert('Invalid file type');
            fileInput.value = '';
            return false;
        }
        else {
            console.log(data.target.files);
        }
    }

    return (
        <>
            <form className="page align form-fill">
                <Box p={{ xs: 3 }} >
                    <Typography variant='h4' className='title' sx={{ padding: '20px' }}>Registration Form<span className='dot'>.</span></Typography>
                    <Box ml={{ sm: 10, xs: 3 }} mr={{ sm: 10, xs: 3 }} mt={2} mb={4} textAlign="center">
                        <Typography variant='h6' mb={2}>Registration Progress</Typography>
                        <LinearProgress variant="determinate" value={progress} sx={{ height: '20px' }} color='info' />
                    </Box>
                    <Box p={{ sm: 1 }} className='Registration_page'>
                        <Box className='Card' p={{ xs: 2 }} m={{ sm: 3 }} mt={{ sm: 0, xs: 2 }} textAlign='center'>
                            <Typography variant='h5' sx={{ textAlign: 'center' }} pt={1} className='card_title'>Salary / Pension Certificates<span className='dot'>.</span></Typography>
                            <Typography variant='h7' sx={{ textAlign: 'center', display: 'block' }} pb={1}>( Father/Guardian, Mother, Brothers & Sisters )</Typography>
                            <div className='card_body'>

                                <Button variant="contained" component="label" endIcon={<PhotoCamera />} className='btndis'>
                                    Upload
                                    <input hidden type="file" onChange={(e) => fileValidation(e)} />
                                </Button>

                            </div>
                            <div id="imagePreview"></div>
                        </Box>
                        <Box className='Card' p={{ xs: 2 }} m={{ sm: 3 }} mt={{ sm: 0, xs: 2 }} textAlign='center'>
                            <Typography variant='h5' sx={{ textAlign: 'center' }} pt={1} className='card_title'>Income Tax Return Details<span className='dot'>.</span></Typography>
                            <Typography variant='h7' sx={{ textAlign: 'center', display: 'block' }} pb={1}>( Father/Guardian, Mother, Brothers & Sisters )</Typography>
                            <div className='card_body'>

                                <Button variant="contained" component="label" endIcon={<PhotoCamera />} className='btndis'>
                                    Upload
                                    <input hidden type="file" onChange={(e) => fileValidation(e)} />
                                </Button>

                            </div>
                            <div id="imagePreview"></div>
                        </Box>
                        <Box className='Card' p={{ xs: 2 }} m={{ sm: 3 }} mt={{ sm: 0, xs: 2 }} textAlign='center'>
                            <Typography variant='h5' sx={{ textAlign: 'center' }} pt={1} className='card_title'>Telephone Expenses Details<span className='dot'>.</span></Typography>
                            <Typography variant='h7' sx={{ textAlign: 'center', display: 'block' }} pb={1}>( Both Landline & Mobile )</Typography>
                            <div className='card_body'>

                                <Button variant="contained" component="label" endIcon={<PhotoCamera />} className='btndis'>
                                    Upload
                                    <input hidden type="file" onChange={(e) => fileValidation(e)} />
                                </Button>

                            </div>
                            <div id="imagePreview"></div>
                        </Box>
                        <Box className='Card' p={{ xs: 2 }} m={{ sm: 3 }} mt={{ sm: 0, xs: 2 }} textAlign='center'>
                            <Typography variant='h5' sx={{ textAlign: 'center' }} pt={1} className='card_title'>Electricity Expenses Details<span className='dot'>.</span></Typography>
                            <Typography variant='h7' sx={{ textAlign: 'center', display: 'block' }} pb={1}>( Monthly Average Bill )</Typography>
                            <div className='card_body'>
                                <Button variant="contained" component="label" endIcon={<PhotoCamera />} className='btndis'>
                                    Upload
                                    <input hidden type="file" onChange={(e) => fileValidation(e)} />
                                </Button>
                            </div>
                        </Box>
                        <Box className='Card' p={{ xs: 2 }} m={{ sm: 3 }} mt={{ sm: 0, xs: 2 }} mb={{ xs: 2 }} textAlign='center'>
                            <Typography variant='h5' sx={{ textAlign: 'center' }} pt={1} className='card_title'>Gas Expenses Details<span className='dot'>.</span></Typography>
                            <Typography variant='h7' sx={{ textAlign: 'center', display: 'block' }} pb={1}>( Monthly Average Bill )</Typography>
                            <div className='card_body'>
                                <Button variant="contained" component="label" endIcon={<PhotoCamera />} className='btndis'>
                                    Upload
                                    <input hidden type="file" onChange={(e) => fileValidation(e)} />
                                </Button>
                            </div>
                        </Box>
                        <Box textAlign={'center'} mt={2}>
                            <Disclaimer Submitdata={TriggerSubmit} />
                            <Button variant="contained" size='large' id='submit' onClick={() => onSubmit()} sx={{ width: '40vw', display: 'none' }}>Submit</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default Upload_documents


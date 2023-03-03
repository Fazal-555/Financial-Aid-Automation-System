import React, { useState, useEffect } from 'react'
import { Button, Box, Typography, LinearProgress } from '@mui/material'
import { Formik, Form } from 'formik'
import { IsInputNumber, IsInputText, IsInputTextNum, TriggerSubmit } from '../Validation/InputCheck';
import Disclaimer from './Disclaimer';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import Test from './rg_form_components/Test'
import { reg_path_check, stu_info } from '../Functions/Admin_Functions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration_form3 = () => {

    const progress = 70;
    const navigate = useNavigate();
    // const location = useLocation();
    // const registerdata2 = location.state.values;
    const check = window.location.pathname;
    const [stu_data, setStu_data] = useState({});
    const [parsecheck, Setparsecheck] = useState(0);

    useEffect(() => {
        // console.log("wao");
        reg_path_check(check ,navigate);
        stu_info(setStu_data,Setparsecheck);
    }, []);

    
    let initialValues = {
        telephone_expenses: [],
        electricity_expenses: [],
        gas_expenses: []
    };

    if (parsecheck) {
        initialValues = {
            telephone_expenses: JSON.parse(stu_data['telephone_expenses']),
            electricity_expenses: JSON.parse(stu_data['electricity_expenses']),
            gas_expenses: JSON.parse(stu_data['gas_expenses'])
        };
    }

    const onSubmit = async () => {
        let arn_num = sessionStorage.getItem('ARN');
        let expense = initialValues;
        expense['telephone_expenses'] = JSON.stringify(expense['telephone_expenses']);
        expense['electricity_expenses'] = JSON.stringify(expense['electricity_expenses']);
        expense['gas_expenses'] = JSON.stringify(expense['gas_expenses']);
        let values = { arn: arn_num, check1: 0, path: '"Registration_Form/RegForm/Registration_Form2/Registration_Form3/Upload_Doc"', ...expense }
        // console.log(initialValues);
        const res = await fetch('/reg_data', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify(values)
            }
        })
        const ans = await res.json();
        if (ans[0]['success'] == 'false') {
            toast('There is something error in the provided data!', {
                type:"error"
            });
        }
        else {
            toast('Data Submitted Successfully!', {
                type:"success",
            });
            navigate('Upload_Doc');
        }


    };

    // validationSchema={validationSchema}

    return (
        parsecheck ?
            <>
                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                    <Form className='form-fill align'>

                        <Box p={{ xs: 3 }} className="page" >
                            <Typography variant='h4' className='title' sx={{ padding: '20px' }}>Registration Form<span className='dot'>.</span></Typography>
                            <Box ml={{ sm: 10, xs: 3 }} mr={{ sm: 10, xs: 3 }} mt={2} mb={4} textAlign="center">
                                <Typography variant='h6' mb={2}>Registration Progress</Typography>
                                <LinearProgress variant="determinate" value={progress} sx={{ height: '20px' }} color='info' />
                            </Box>
                            <Box className='Registration_page'>
                                <Box className='Card' >
                                    <div className='card_body'>
                                        <Typography variant='h5' pt={1} className='card_title'>Telephone Expenses Details<span className='dot'>.</span></Typography>
                                        <Typography variant='h7' pb={1}>( Both Landline & Mobile )</Typography>
                                        <Test choice='1' total='4' msg='Add Telephone Expenses' Telephone={{ 0: 'Telephone Number', 1: (e) => IsInputNumber(e) }} avg_bill={{ 0: 'Average Monthly Bill', 1: (e) => IsInputNumber(e) }} btn='Add Telephone Expenses' data_store={(newValue) => initialValues.telephone_expenses = [...initialValues.telephone_expenses, newValue]} delete_data={(index) => {
                                            initialValues.telephone_expenses.splice(index, 1)
                                            return initialValues.telephone_expenses
                                        }} mtft_data={initialValues.telephone_expenses} />
                                    </div>
                                </Box>
                                <Box className='Card'>
                                    <div className='card_body'>
                                        <Typography variant='h5' pt={1} className='card_title'>Electricity Expenses Details<span className='dot'>.</span></Typography>
                                        <Typography variant='h7' pb={1}>( Monthly Average Bill )</Typography>
                                        <Test choice='1' total='2' msg='Add Electricity Expenses' Cn={{ 0: 'Consumer Number', 1: (e) => IsInputNumber(e) }} Address={{ 0: 'Address', 1: (e) => IsInputTextNum(e) }} avg_bill={{ 0: 'Average Monthly Bill', 1: (e) => IsInputNumber(e) }} btn='Add Electricity Expenses' data_store={(newValue) => initialValues.electricity_expenses = [...initialValues.electricity_expenses, newValue]} delete_data={(index) => {
                                            initialValues.electricity_expenses.splice(index, 1)
                                            return initialValues.electricity_expenses
                                        }} mtft_data={initialValues.electricity_expenses} />
                                    </div>
                                </Box>
                                <Box className='Card' >
                                    <div className='card_body'>
                                        <Typography variant='h5' pt={1} className='card_title'>Gas Expenses Details<span className='dot'>.</span></Typography>
                                        <Typography variant='h7' pb={1}>( Monthly Average Bill )</Typography>
                                        <Test choice='1' total='2' msg='Add Gas Expenses' Cn={{ 0: 'Consumer Number', 1: (e) => IsInputNumber(e) }} Address={{ 0: 'Address', 1: (e) => IsInputTextNum(e) }} avg_bill={{ 0: 'Average Monthly Bill', 1: (e) => IsInputNumber(e) }} btn='Add Gas Expenses' data_store={(newValue) => initialValues.gas_expenses = [...initialValues.gas_expenses, newValue]} delete_data={(index) => {
                                            initialValues.gas_expenses.splice(index, 1)
                                            return initialValues.gas_expenses
                                        }} mtft_data={initialValues.gas_expenses} />
                                    </div>
                                </Box>
                            </Box>
                            <Box textAlign={'center'} mt={2}>
                                <Disclaimer Submitdata={TriggerSubmit} />
                                <Button variant="contained" size='large' id='submit' type='submit' sx={{ width: '40vw', display: 'none' }}>Submit</Button>
                            </Box>
                        </Box>
                    </Form>
                </Formik></> : <Box p={{ xs: 3 }} className="page form-fill">
                <div className='center'>
                    <Typography variant='h3' className='title'>Loading<span className='dot'>.....!</span></Typography>
                </div>
            </Box>
    )
}

export default Registration_form3


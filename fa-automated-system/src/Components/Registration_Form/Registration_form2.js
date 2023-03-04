import React, { useState, useEffect } from 'react'
import { Button, Box, Typography, LinearProgress } from '@mui/material'
import { IsInputNumber, IsInputText, IsInputTextNum, TriggerSubmit } from '../Validation/InputCheck';
import Disclaimer from './Disclaimer';
import Tables from './rg_form_components/Tables'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Test from './rg_form_components/Test'
import { useLocation, useNavigate } from 'react-router-dom';
import { reg_path_check, stu_info } from '../Functions/Admin_Functions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration_form2 = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const registerdata = location.state.values;
    const progress = 30;

    const [stu_data, setStu_data] = useState({});
    const [parsecheck, Setparsecheck] = useState(0);
    const check = window.location.pathname;

    useEffect(() => {
        reg_path_check(check, navigate);
        stu_info(setStu_data, Setparsecheck);
    }, []);

    const initialValues1 = {
        Title_1_1: stu_data['Title_1_1'],
        Income_1_1: stu_data['Income_1_1'],
        Title_2_1: stu_data['Title_2_1'],
        Income_2_1: stu_data['Income_2_1'],
        Title_3_1: stu_data['Title_3_1'],
        Income_3_1: stu_data['Income_3_1']
    };

    const initialValues2 = {
        Title_1_2: stu_data['Title_1_2'],
        Income_1_2: stu_data['Income_1_2'],
        Title_2_2: stu_data['Title_2_2'],
        Income_2_2: stu_data['Income_2_2'],
        Title_3_2: stu_data['Title_3_2'],
        Income_3_2: stu_data['Income_3_2']
    };

    const initialValues3 = {
        Title_1_3: stu_data['Title_1_3'],
        Income_1_3: stu_data['Income_1_3'],
        Title_2_3: stu_data['Title_2_3'],
        Income_2_3: stu_data['Income_2_3'],
        Title_3_3: stu_data['Title_3_3'],
        Income_3_3: stu_data['Income_3_3']
    };

    const initialValues4 = {
        Title_1_4: stu_data['Title_1_4'],
        Income_1_4: stu_data['Income_1_4'],
        Title_2_4: stu_data['Title_2_4'],
        Income_2_4: stu_data['Income_2_4'],
        Title_3_4: stu_data['Title_3_4'],
        Income_3_4: stu_data['Income_3_4']
    };

    let stuff = { properties: [], investments: [], assets: [], vechiles: [] };

    if (parsecheck) {
        stuff = { properties: JSON.parse(stu_data['properties']), investments: JSON.parse(stu_data['investments']), assets: JSON.parse(stu_data['assets']), vechiles: JSON.parse(stu_data['vechiles']) };
    }

    const initialValues = { ...initialValues1, ...initialValues2, ...initialValues3, ...initialValues4 };
    const onSubmit = async (values) => {
        let arn_num = sessionStorage.getItem('ARN');
        let assetdetail = stuff;
        assetdetail['properties'] = JSON.stringify(assetdetail['properties']);
        assetdetail['investments'] = JSON.stringify(assetdetail['investments']);
        assetdetail['assets'] = JSON.stringify(assetdetail['assets']);
        assetdetail['vechiles'] = JSON.stringify(assetdetail['vechiles']);

        values = { arn: arn_num, path: '"Registration_Form/RegForm/Registration_Form2/Registration_Form3"', ...values, ...assetdetail };
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
                type: "error"
            });
        }
        else {
            toast('Data Submitted Successfully!', {
                type: "success",
            });
            navigate('Registration_Form3');
        }

        // console.log(values)
    };

    const validationSchema = Yup.object({
        Title_1_1: Yup.string(),
        Income_1_1: Yup.string(),
        Title_2_1: Yup.string(),
        Income_2_1: Yup.string(),
        Title_3_1: Yup.string(),
        Income_3_1: Yup.string(),
        Title_1_2: Yup.string(),
        Income_1_2: Yup.string(),
        Title_2_2: Yup.string(),
        Income_2_2: Yup.string(),
        Title_3_2: Yup.string(),
        Income_3_2: Yup.string(),
        Title_1_3: Yup.string(),
        Income_1_3: Yup.string(),
        Title_2_3: Yup.string(),
        Income_2_3: Yup.string(),
        Title_3_3: Yup.string(),
        Income_3_3: Yup.string(),
        Title_1_4: Yup.string(),
        Income_1_4: Yup.string(),
        Title_2_4: Yup.string(),
        Income_2_4: Yup.string(),
        Title_3_4: Yup.string(),
        Income_3_4: Yup.string(),
    })



    //validationSchema={validationSchema}
    return (parsecheck ?
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='form-fill'>

                    <Box p={{ xs: 3 }} className="page">
                        <Typography variant='h4' className='title' sx={{ padding: '20px' }}>Registration Form<span className='dot'>.</span></Typography>
                        <Box ml={{ sm: 10, xs: 3 }} mr={{ sm: 10, xs: 3 }} mt={2} mb={4} textAlign="center">
                            <Typography variant='h6' mb={2}>Registration Progress</Typography>
                            <LinearProgress variant="determinate" value={progress} sx={{ height: '20px' }} color='info' />
                        </Box>
                        <Box className='Registration_page'>
                            <Box className='Card' >
                                <Tables end_col='Employer(s)' title='Family Income From Family / Pension Income' IV={initialValues1} totalcheck={['first1', 'second1', 'third1', 'total1']} />
                            </Box>
                            <Box className='Card' >
                                <Tables end_col='Name and Type of Business' title='Family Income From Business' IV={initialValues2} totalcheck={['first2', 'second2', 'third2', 'total2']} />
                            </Box>
                            <Box className='Card' >
                                <Tables end_col='Name of Investment' title='Family Income From Investments' IV={initialValues3} totalcheck={['first3', 'second3', 'third3', 'total3']} />
                            </Box>
                            <Box className='Card' >
                                <Tables end_col='Source' title='Family Income From Rental / Other Income' IV={initialValues4} totalcheck={['first4', 'second4', 'third4', 'total4']} />
                            </Box>
                            <Box className='Card' px={2} >
                                <div className='card_body'>
                                    <Typography variant='h5' pt={1} className='card_title'>Property Details<span className='dot'>.</span></Typography>
                                    <Typography variant='h7' pb={1}>( Residential, Commercial, Agricultural )</Typography>
                                    <Test choice='0' total='3' msg='Add Properties Owned By Family' Address={{ 0: 'Address', 1: (e) => IsInputTextNum(e) }} Property_Type='Property Type' Area={{ 0: 'Area(Square Feet)', 1: (e) => IsInputNumber(e) }} market_value={{ 0: 'Approximate Market Value', 1: (e) => IsInputNumber(e) }} status='Status' btn='Add Properties' data_store={(newValue) => stuff.properties = [...stuff.properties, newValue]} delete_data={(index) => {
                                        stuff.properties.splice(index, 1)
                                        return stuff.properties
                                    }} mtft_data={stuff.properties} />
                                </div>
                            </Box>
                            <Box className='Card' px={2} >
                                <div className='card_body'>
                                    <Typography variant='h5' pt={1} className='card_title' >Vechile Details<span className='dot'>.</span></Typography>
                                    <Test choice='1' total='4' msg='Add Vehicles Owned By Family' car_status={{ 0: 'Make and Model(year)', 1: (e) => IsInputNumber(e) }} Register={{ 0: 'Registration #', 1: (e) => IsInputTextNum(e) }} market_value={{ 0: 'Approximate Market Value', 1: (e) => IsInputNumber(e) }} btn='Add Vechiles' data_store={(newValue) => stuff.vechiles = [...stuff.vechiles, newValue]} delete_data={(index) => {
                                        stuff.vechiles.splice(index, 1)
                                        return stuff.vechiles
                                    }} mtft_data={stuff.vechiles} />
                                </div>
                            </Box>
                            <Box className='Card' px={2} >
                                <div className='card_body'>
                                    <Typography variant='h5' pt={1} className='card_title'>Investments & Valuables Details<span className='dot'>.</span></Typography>
                                    <Typography variant='h7' pb={1}>( Shares, Bonds, Fixed Deposits, Gold )</Typography>
                                    <Test choice='1' total='2' msg='Add Investments & Valuables Owned By Family' invest_type={{ 0: 'Investment Type', 1: (e) => IsInputText(e) }} Face_value={{ 0: 'Face Value', 1: (e) => IsInputNumber(e) }} market_value={{ 0: 'Approximate Market Value', 1: (e) => IsInputNumber(e) }} btn='Add Investments' data_store={(newValue) => stuff.investments = [...stuff.investments, newValue]} delete_data={(index) => {
                                        stuff.investments.splice(index, 1)
                                        return stuff.investments
                                    }} mtft_data={stuff.investments} />
                                </div>
                            </Box>
                            <Box className='Card' px={2} >
                                <div className='card_body'>
                                    <Typography variant='h5' pt={1} className='card_title'>Assets Details<span className='dot'>.</span></Typography>
                                    <Typography variant='h7' pb={1}>( All Family Assets Not Listed Above. )</Typography>
                                    <Test choice='1' total='3' msg='Add All Other Assets Owned By Family' invest_type={{ 0: 'Investment Type', 1: (e) => IsInputText(e) }} Face_value={{ 0: 'Face Value', 1: (e) => IsInputNumber(e) }} market_value={{ 0: 'Approximate Market Value', 1: (e) => IsInputNumber(e) }} btn='Add Asstes' data_store={(newValue) => stuff.assets = [...stuff.assets, newValue]} delete_data={(index) => {
                                        stuff.assets.splice(index, 1)
                                        return stuff.assets
                                    }} mtft_data={stuff.assets} />
                                </div>
                            </Box>
                        </Box>
                        <Box textAlign={'center'} mt={2}>
                            <Disclaimer Submitdata={TriggerSubmit} />
                            <Button variant="contained" size='large' id='submit' type='submit' sx={{ width: '40vw', display: 'none' }}>Submit</Button>
                        </Box>
                    </Box>
                </Form>
            </Formik>
        </> : <Box p={{ xs: 3 }} className="page form-fill">
            <div className='center'>
                <Typography variant='h3' className='title'>Loading<span className='dot'>.....!</span></Typography>
            </div>
        </Box>
    )
}

export default Registration_form2


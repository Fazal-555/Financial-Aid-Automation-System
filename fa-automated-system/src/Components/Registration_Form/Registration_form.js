import React, { useState, useEffect } from 'react'
import { IsInputNumber, IsInputText, TriggerSubmit } from '../Validation/InputCheck';
import { Button, Box, Typography, Grid, LinearProgress } from '@mui/material'
import { Formik, Form, FastField, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import Popup from './rg_form_components/Popup'
import Siblings from './rg_form_components/Siblings'
import Disclaimer from './Disclaimer';
import { reg_path_check, stu_info } from '../Functions/Admin_Functions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration_form = () => {

  const navigate = useNavigate();
  const progress = 0;

  const [stu_data, setStu_data] = useState({});
  const [parsecheck, Setparsecheck] = useState(0);
  const check = window.location.pathname;

  useEffect(() => {
    // console.log(check)
    reg_path_check(check ,navigate);
    stu_info(setStu_data, Setparsecheck);
  }, []);



  const initialValues = {
    stu_name: stu_data['stu_name'],
    stu_cnic: stu_data['stu_cnic'],
    stu_degree: stu_data['stu_degree'],
    stu_postal_address: stu_data['stu_postal_address'],
    stu_cell_number: stu_data['stu_cell_number'],
    stu_email: stu_data['stu_email'],
    moth_profession: stu_data['moth_profession'],
    fath_employment: stu_data['fath_employment'],
    fath_relation: stu_data['fath_relation'],
    moth_employment: stu_data['moth_employment'], fath_profession: stu_data['fath_profession'],
    fath_name: stu_data['fath_name'], fath_cnic: stu_data['fath_cnic'], fath_telephone: stu_data['fath_telephone'], fath_postal_address: stu_data['fath_postal_address'], fath_cell_number: stu_data['fath_cell_number'], fath_email: stu_data['fath_email'],
    moth_name: stu_data['moth_name'], moth_cnic: stu_data['moth_cnic'], moth_telephone: stu_data['moth_telephone'], moth_postal_address: stu_data['moth_postal_address'], moth_cell_number: stu_data['moth_cell_number'], moth_email: stu_data['moth_email'],
  };

  let employment_data = { fath_employment_data: [], moth_employment_data: [] };
  let siblings_info = { sibling_not_working: [], sibling_working: [] };

  if (parsecheck) {
    employment_data = { fath_employment_data: JSON.parse(stu_data['fath_employment_data']), moth_employment_data: JSON.parse(stu_data['moth_employment_data']) };
    siblings_info = { sibling_not_working: JSON.parse(stu_data['sibling_not_working']), sibling_working: JSON.parse(stu_data['sibling_working']) };
  }





  const onSubmit = async (values) => {
    let emp_data = employment_data;
    let sib_info = siblings_info;
    let arn_num = sessionStorage.getItem('ARN');
    emp_data['fath_employment_data'] = JSON.stringify(emp_data['fath_employment_data']);
    emp_data['moth_employment_data'] = JSON.stringify(emp_data['moth_employment_data']);
    sib_info['sibling_not_working'] = JSON.stringify(sib_info['sibling_not_working']);
    sib_info['sibling_working'] = JSON.stringify(sib_info['sibling_working']);
    values = { arn: arn_num, path: '"Registration_Form/RegForm/Registration_Form2"', ...values, ...emp_data, ...sib_info };

    const res = await fetch('/reg_data', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(values)
      }
    })
    const ans = await res.json();
    // console.log(ans)
    if (ans[0]['success'] == 'false') {
      toast('There is something error in the provided data!', {
        type:"error"
    });
    }
    else {
      toast('Data Submitted Successfully!', {
        type:"success",
    });
    console.log("hello")
    navigate('Registration_Form2');
    }
    console.log(ans);
    console.log(values)

  };



  const validationSchema = Yup.object({
    stu_name: Yup.string().required('Required *'),
    stu_email: Yup.string().email('Invalid Email').required('Required *'),
    stu_postal_address: Yup.string().length(5, 'Enter correct 5 digit code !').required('Required *'),
    moth_profession: Yup.string().required('Required *'),
    fath_employment: Yup.string().required('Required *'),
    fath_relation: Yup.string().required('Required *'),
    moth_employment: Yup.string().required('Required *'),
    stu_cnic: Yup.string().matches('[0-9]{13}', 'CNIC is not valid').required('Required *'),
    stu_degree: Yup.string().required('Required *'),
    stu_cell_number: Yup.string().matches('[0-9]{11}', 'Phone number is not valid').required('Required *'),
    fath_profession: Yup.string().required('Required *'),
    fath_name: Yup.string().required('Required *'),
    fath_cnic: Yup.string().required('Required *'),
    fath_telephone: Yup.string().matches('[0-9]{10}', 'Phone number is not valid'),
    fath_postal_address: Yup.string().length(5, 'Enter correct 5 digit code !'),
    fath_cell_number: Yup.string().matches('[0-9]{11}', 'Phone number is not valid').required('Required *'),
    fath_email: Yup.string().email('Invalid Email'),
    moth_name: Yup.string().required('Required *'),
    moth_cnic: Yup.string().required('Required *'),
    moth_telephone: Yup.string().matches('[0-9]{10}', 'Phone number is not valid'),
    moth_postal_address: Yup.string().length(5, 'Enter correct 5 digit code !'),
    moth_cell_number: Yup.string().matches('[0-9]{11}', 'Phone number is not valid'),
    moth_email: Yup.string().email('Invalid Email'),
  })
  // validationSchema={validationSchema}

  return (
    parsecheck ? <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Box p={{ xs: 3 }} className="page">
            <Typography variant='h4' className='title' sx={{ padding: '20px' }}>Registration Form<span className='dot'>.</span></Typography>
            <Box ml={{ sm: 10, xs: 3 }} mr={{ sm: 10, xs: 3 }} mt={2} mb={4} textAlign="center">
              <Typography variant='h6' mb={2}>Registration Progress</Typography>
              <LinearProgress variant="determinate" value={progress} sx={{ height: '20px' }} color='info' />
            </Box>
            <Box className='Registration_page'>
              <Box className='Card' >
                <div className='card_body'>
                  <Typography variant='h5' p={2} pb={0} pt={3} className='card_title'>Personal Details<span className='dot'>.</span></Typography>
                  <Grid container rowSpacing={2} columnSpacing={{ md: 3 }} p={2} pt={1} textAlign='start'>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Name :</label> <input type='text' onKeyDown={(event) => IsInputText(event)} autoComplete="off" {...props.field} /></div>)} id='stu_name' name='stu_name' />
                      <div className='error_msg'><ErrorMessage name='stu_name' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>CNIC# :</label> <input type='text' onKeyDown={(event) => IsInputNumber(event)} autoComplete="off" minLength='13' maxLength='13' {...props.field} /></div>)} id='stu_cnic' name='stu_cnic' />
                      <div className='error_msg'><ErrorMessage name='stu_cnic' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Degree :</label> <input type='text' onKeyDown={(event) => IsInputText(event)} autoComplete="off" minLength='4' maxLength='4' {...props.field} /></div>)} id='stu_degree' name='stu_degree' />
                      <div className='error_msg'><ErrorMessage name='stu_degree' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Postal Address :</label><input type='text' onKeyDown={(event) => IsInputNumber(event)} autoComplete="off" minLength='5' maxLength='5' {...props.field} /></div>)} id='stu_postal_address' name='stu_postal_address' />
                      <div className='error_msg'><ErrorMessage name='stu_postal_address' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Cell Number :</label><input type='text' onKeyDown={(event) => IsInputNumber(event)} autoComplete="off" minLength='11' maxLength='11'  {...props.field} /></div>)} id='stu_cell_number' name='stu_cell_number' />
                      <div className='error_msg'><ErrorMessage name='stu_cell_number' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Email Address :</label><input type='email' placeholder='abc@gmail.com' autoComplete="off" {...props.field} /></div>)} id='stu_email' name='stu_email' />
                      <div className='error_msg'><ErrorMessage name='stu_email' /></div>
                    </Grid>
                  </Grid>
                </div>
              </Box>
              <Box className='Card' >
                <div className='card_body'>
                  <Typography variant='h5' p={2} pb={0} className='card_title'>Father / Guardian Details<span className='dot'>.</span></Typography>
                  <Grid container rowSpacing={2} columnSpacing={{ md: 3 }} p={2} pt={1} textAlign='start'>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<>  <label>Relation :</label>
                        <select {...props.field}>
                          <option value="" disabled>Select Category</option>
                          <option value="Father">Father</option>
                          <option value="Guardian">Guardian</option>
                        </select></>)} id='fath_relation' name='fath_relation' />
                      <div className='error_msg'><ErrorMessage name='fath_relation' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Name :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} /></div>)} id='fath_name' name='fath_name' />
                      <div className='error_msg'><ErrorMessage name='fath_name' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>CNIC# :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='13' maxLength='13' {...props.field} /></div>)} id='fath_cnic' name='fath_cnic' />
                      <div className='error_msg'><ErrorMessage name='fath_cnic' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Telephone Number :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='10' maxLength='10' {...props.field} /></div>)} id='fath_telephone' name='fath_telephone' />
                      <div className='error_msg'> <ErrorMessage name='fath_telephone' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Postal Address :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='5' maxLength='5' {...props.field} /></div>)} id='fath_postal_address' name='fath_postal_address' />
                      <div className='error_msg'><ErrorMessage name='fath_postal_address' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Cell Number :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='11' maxLength='11' {...props.field} /></div>)} id='fath_cell_number' name='fath_cell_number' />
                      <div className='error_msg'><ErrorMessage name='fath_cell_number' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Email Address :</label> <input type='email' autoComplete="off" placeholder='abc@gmail.com' {...props.field} /></div>)} id='fath_email' name='fath_email' />
                      <div className='error_msg'><ErrorMessage name='fath_email' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Profession :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} /></div>)} id='fath_profession' name='fath_profession' />
                      <div className='error_msg'><ErrorMessage name='fath_profession' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (
                        <>  <label>Employment Status :</label>
                          <select {...props.field}>
                            <option value="" disabled>Select Category</option>
                            <option value="Working">Working</option>
                            <option value="Retired">Retired</option>
                          </select></>)} id='fath_employment' name='fath_employment' />
                      <div className='error_msg'><ErrorMessage name='fath_employment' /></div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h5' className='component_title' pt={1}>Employment History<span className='dot'>.</span></Typography>
                      <Typography variant='h7' className='component_title' pb={1}> (Latest employment first. List last 4. If currently retired, please
                        include pension.)</Typography>
                    </Grid>
                    {parsecheck ? <Grid className='table component_body' item xs={12} pb={2}>
                      <Popup msg='Add Father/Guardian Employment' name='fath' emp_data={(newValue) => employment_data.fath_employment_data = [...employment_data.fath_employment_data, newValue]} delete_data={(index) => {
                        employment_data.fath_employment_data.splice(index, 1)
                        return employment_data.fath_employment_data
                      }} mtft_data={employment_data.fath_employment_data} />
                    </Grid> : <></>}
                  </Grid>
                </div>
              </Box>
              <Box className='Card' >
                <div className='card_body'>
                  <Typography variant='h5' p={2} pb={0} className='card_title'>Mother Details<span className='dot'>.</span></Typography>
                  <Grid container rowSpacing={2} columnSpacing={{ md: 3 }} p={2} pt={1} textAlign='start'>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Name :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} /></div>)} id='moth_name' name='moth_name' />
                      <div className='error_msg'><ErrorMessage name='moth_name' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>CNIC# :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='13' maxLength='13' {...props.field} /></div>)} id='moth_cnic' name='moth_cnic' />
                      <div className='error_msg'><ErrorMessage name='moth_cnic' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Telephone Number :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='10' maxLength='10' {...props.field} /></div>)} id='moth_telephone' name='moth_telephone' />
                      <div className='error_msg'><ErrorMessage name='moth_telephone' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Postal Address :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='5' maxLength='5' {...props.field} /></div>)} id='moth_postal_address' name='moth_postal_address' />
                      <div className='error_msg'><ErrorMessage name='moth_postal_address' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Cell Number :</label> <input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} minLength='11' maxLength='11' {...props.field} /></div>)} id='moth_cell_number' name='moth_cell_number' />
                      <div className='error_msg'><ErrorMessage name='moth_cell_number' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<div><label>Email Address :</label> <input type='email' autoComplete="off" placeholder='abc@gmail.com' {...props.field} /></div>)} id='moth_email' name='moth_email' />
                      <div className='error_msg'><ErrorMessage name='moth_email' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<>  <label>Profession :</label>
                        <select {...props.field}>
                          <option value="" disabled>Select Category</option>
                          <option value="Service">Service</option>
                          <option value="Business">Business</option>
                          <option value='House Wife'>House Wife</option>
                        </select></>)} id='moth_profession' name='moth_profession' />
                      <div className='error_msg'><ErrorMessage name='moth_profession' /></div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <FastField component={(props) => (<>  <label>Employment Status :</label>
                        <select {...props.field}>
                          <option value="" disabled>Select Category</option>
                          <option value="Working">Working</option>
                          <option value="Retired">Retired</option>
                          <option value='House Wife'>House Wife</option>
                        </select></>)} id='moth_employment' name='moth_employment' />
                      <div className='error_msg'><ErrorMessage name='moth_employment' /></div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h5' className='component_title' pt={1}>Employment History<span className='dot'>.</span></Typography>
                      <Typography variant='h7' className='component_title' pb={1} > (Latest employment first. List last 4. (only if applicable))</Typography>
                    </Grid>
                    {parsecheck ? <Grid className='table component_body' item xs={12} pb={2}>
                      <Popup msg='Add Mother Employment' name='moth' emp_data={(newValue) => employment_data.moth_employment_data = [...employment_data.moth_employment_data, newValue]} delete_data={(index) => {
                        employment_data.moth_employment_data.splice(index, 1)
                        return employment_data.moth_employment_data
                      }} mtft_data={employment_data.moth_employment_data} />
                    </Grid> : <></>}
                  </Grid>
                </div>
              </Box>
              <Box className='Card' >
                <div className='card_body'>
                  <Typography variant='h5' p={2} pt={1} pb={0} className='card_title'>Brothers/Sisters Details<span className='dot'>.</span></Typography>
                  <Typography variant='h7' p={2} pt={0} pb={1}>(In School/Not Working)</Typography>
                  <Grid container rowSpacing={2} justifyContent='center' pt={2}>
                    {parsecheck ? <Grid className='table' item xs={12} pb={2}>
                      <Siblings studydetail='Sibling_study' fee='Annual Tuition Fee' help='Annual Financial Aid / Loan / Scholarship' agency='Granting Agency' input_type={{ 0: (e) => IsInputNumber(e), 1: (e) => IsInputNumber(e), 2: (e) => IsInputText(e) }} choice='0' data_store={(newValue) => siblings_info.sibling_not_working = [...siblings_info.sibling_not_working, newValue]} delete_data={(index) => {
                        siblings_info.sibling_not_working.splice(index, 1)
                        return siblings_info.sibling_not_working
                      }} mtft_data={siblings_info.sibling_not_working} />
                    </Grid> : <></>}
                  </Grid>
                </div>
              </Box>
              <Box className='Card'>
                <div className='card_body'>
                  <Typography variant='h5' p={2} pt={1} pb={0} className='card_title'>Brothers/Sisters Details<span className='dot'>.</span></Typography>
                  <Typography variant='h7' p={2} pt={0} pb={1}>(Employed)</Typography>
                  <Grid container rowSpacing={2} justifyContent='center' pt={2}>
                    {parsecheck ? <Grid className='table' item xs={12} pb={2}>
                      <Siblings profession='Profession' desg='Designation' company='Company' income='Monthly Income' input_type={{ 0: (e) => IsInputText(e), 1: (e) => IsInputText(e), 2: (e) => IsInputNumber(e) }} choice='1' data_store={(newValue) => siblings_info.sibling_working = [...siblings_info.sibling_working, newValue]} delete_data={(index) => {
                        siblings_info.sibling_working.splice(index, 1)
                        return siblings_info.sibling_working
                      }} mtft_data={siblings_info.sibling_working} />
                    </Grid> : <></>}
                  </Grid>
                </div>
              </Box>
            </Box>
            <Box textAlign={'center'} mt={2} >
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

export default Registration_form


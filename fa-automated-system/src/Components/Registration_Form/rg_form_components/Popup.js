import * as React from 'react';
import Button from '@mui/material/Button';
import { IsInputNumber, IsInputText } from '../../Validation/InputCheck';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Formik, Form, FastField, ErrorMessage } from 'formik'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Popup = (props) => {

  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = React.useState(props.mtft_data.length);
  const [data, setData] = React.useState(props.mtft_data);
  const propdata = [`${props.name}_From`, `${props.name}_to`, `${props.name}_Design`, `${props.name}_Organize`, `${props.name}_Salary`];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const onSubmit = (values) => {
    const Month = new Date().getMonth();
    const Year = new Date().getFullYear();
    const Dates = values[propdata[0]].split("-");
    const Dates1 = values[propdata[1]].split("-");
    if (Month+1 >= Number(Dates[1]) && Year >= Number(Dates[0]) && Month+1 >= Number(Dates1[1]) && Year >= Number(Dates1[0])) {
      if (values[propdata[0]] <= values[propdata[1]]) {
        setData(prevData => [...prevData, {
          [propdata[0]]: values[propdata[0]],
          [propdata[1]]: values[propdata[1]],
          [propdata[2]]: values[propdata[2]],
          [propdata[3]]: values[propdata[3]],
          [propdata[4]]: values[propdata[4]]
        }]);
        setTotal(prevTotal => prevTotal + 1);
        setOpen(false);
        props.emp_data(values)
      }
      else {
        toast('Please provide correct date!', {
          type: "error"
        });
      }
    }
    else {
      toast('Please provide correct date!', {
        type: "error"
      });
    }
  };

  function deleteEmp(index) {
    setData(prevData => {
      prevData.splice(index, 1)
      return prevData
    })
    setTotal(prevTotal => prevTotal - 1);
    props.delete_data(index)
  }

  const initialValues = {
    [propdata[0]]: '',
    [propdata[1]]: '',
    [propdata[2]]: '',
    [propdata[3]]: '',
    [propdata[4]]: ''
  };

  const validationSchema = Yup.object({
    [propdata[0]]: Yup.string().required('Required'),
    [propdata[1]]: Yup.string().required('Required'),
    [propdata[2]]: Yup.string().required('Required'),
    [propdata[3]]: Yup.string().required('Required'),
    [propdata[4]]: Yup.string().required('Required')
  })


  // validationSchema={validationSchema}


  return (
    <>
      {total < 4 ? <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: 'white !important', borderColor: '#4070f4', color: '#4070f4' }} startIcon={<AddSharpIcon sx={{ stroke: '#4070f4', strokeWidth: 2 }} />}> Add Employment
      </Button> : <></>}
      <Dialog open={open} onClose={handleClose}>
        <Box bgcolor={'white'}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              <DialogTitle textAlign='center' color={'#4070f4'} mt={1}>{props.msg}</DialogTitle>
              <DialogContent>

                <Grid container rowSpacing={2} justifyContent='center' >
                  <Grid item xs={12} >
                    <FastField component={(props) => (<div><label>From :</label> <input type='month' {...props.field} /></div>)} id={propdata[0]} name={propdata[0]} />
                    <div className='error_msg'><ErrorMessage name={propdata[0]} /></div>
                  </Grid>
                  <Grid item xs={12} >
                    <FastField component={(props) => (<div><label>To :</label> <input type='month' {...props.field} /></div>)} id={propdata[1]} name={propdata[1]} />
                    <div className='error_msg'><ErrorMessage name={propdata[1]} /></div>
                  </Grid>
                  <Grid item xs={12}>
                    <FastField component={(props) => (<div><label>Designation :</label> <input type='text' maxLength='30' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} /></div>)} id={propdata[2]} name={propdata[2]} />
                    <div className='error_msg'><ErrorMessage name={propdata[2]} /></div>
                  </Grid>
                  <Grid item xs={12}>
                    <FastField component={(props) => (<div><label>Organization :</label> <input type='text' maxLength='25' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} /></div>)} id={propdata[3]} name={propdata[3]} />
                    <div className='error_msg'><ErrorMessage name={propdata[3]} /></div>
                  </Grid>
                  <Grid item xs={12}>
                    <FastField component={(props) => (<div><label>Monthly Salary :</label> <input type='text' maxLength='20' autoComplete="off" onKeyDown={(event) => IsInputNumber(event)} {...props.field} /></div>)} id={propdata[4]} name={propdata[4]} />
                    <div className='error_msg'><ErrorMessage name={propdata[4]} /></div>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'space-between', paddingX: '40px', paddingBottom: '20px' }}>
                <Button size='large' onClick={handleClose} sx={{ backgroundColor: 'white !important', color: '#4070f4' }} fullWidth>Cancel</Button>
                <Button size='large' type='submit' variant="contained" fullWidth>Save</Button>
              </DialogActions>
            </Form>
          </Formik>
        </Box>
      </Dialog>
      {total ? <Grid mt={2} >
        <TableContainer className='whole_table_border' sx={{ maxHeight: '80vh', maxWidth: '100vw' }}>
          <Table stickyHeader={true}>
            <TableHead >
              <TableRow>
                <TableCell align='center' className='table_modify_2'>From</TableCell>
                <TableCell align='center' className='table_modify_2'>To</TableCell>
                <TableCell align='center' className='table_modify_2'>Designation</TableCell>
                <TableCell align='center' className='table_modify_2'>Organization</TableCell>
                <TableCell align='center' className='table_modify_2'>Monthly Salary</TableCell>
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

export default Popup

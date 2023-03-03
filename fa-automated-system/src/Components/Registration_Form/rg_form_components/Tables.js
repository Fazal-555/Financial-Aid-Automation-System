import React, { useState,useEffect } from 'react'
import { IsInputText } from '../../Validation/InputCheck';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FastField, ErrorMessage } from 'formik'

const Tables = (prop) => {

  const argv = prop;

  function IsInputNumber(evt, param, numkey) {

    let inputvalue = Number(document.getElementsByName(param)[0].value);
    console.log(evt.which)
    switch (evt.which) {
      case 8:
        inputvalue = Number(document.getElementsByName(param)[0].value.slice(0,-1));
        break;
      // case 46:
      //   inputvalue = Number(document.getElementsByName(param)[0].value);
      //   break;
      // case 37:
      //   inputvalue = Number(document.getElementsByName(param)[0].value);
      //   break;
      // case 39:
      //   inputvalue = Number(document.getElementsByName(param)[0].value);
      //   break;
      default:
        if (!(((Number(evt.key) >= 0) && (Number(evt.key) <= 9)))) {
          evt.preventDefault();
        }
        else if (evt.key == " ") {
          evt.preventDefault();
        }
        else {
          inputvalue = Number((document.getElementsByName(param)[0].value) + evt.key);
        }
        break;
    }
    document.getElementById(numkey).innerHTML = inputvalue;
    const num1 = document.getElementById(argv.totalcheck[0]).innerHTML;
    const num2 = document.getElementById(argv.totalcheck[1]).innerHTML;
    const num3 = document.getElementById(argv.totalcheck[2]).innerHTML;
    document.getElementById(argv.totalcheck[3]).innerHTML = Number(num1) + Number(num2) + Number(num3);
  }

  useEffect(() => {
    const num1=argv.IV[Object.keys(argv.IV)[1]]
    const num2=argv.IV[Object.keys(argv.IV)[3]]
    const num3=argv.IV[Object.keys(argv.IV)[5]]
    document.getElementById(argv.totalcheck[0]).innerHTML = num1;
    document.getElementById(argv.totalcheck[1]).innerHTML = num2;
    document.getElementById(argv.totalcheck[2]).innerHTML = num3;
    document.getElementById(argv.totalcheck[3]).innerHTML = Number(num1) + Number(num2) + Number(num3);
  }, [])

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item xs={12} className='card_title' p={2} pb={0} pt={3}>
          <Typography variant='h5'>{argv.title}<span className='dot'>.</span></Typography>
        </Grid>
        <Grid item xs={12} className='card_body' p={2}>
          <TableContainer sx={{ maxHeight: '80vh', maxWidth: '100vw' }} className='whole_table_border'>
            <Table stickyHeader={true} >
              <TableHead>
                <TableRow>
                  <TableCell align='center' className='table_modify_2'>Relation</TableCell>
                  <TableCell align='center' className='table_modify_2'>Average Monthly Income</TableCell>
                  <TableCell align='center' className='table_modify_2'>{argv.end_col}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell className='table_modify'>Father / Guardian</TableCell>
                  <TableCell className='table_modify'>
                    <FastField component={(props) => (<input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event, Object.keys(argv.IV)[1], argv.totalcheck[0])} {...props.field} />)} id={Object.keys(argv.IV)[1]} name={Object.keys(argv.IV)[1]} />
                    <div className='error_msg'><ErrorMessage name={Object.keys(argv.IV)[1]} /></div>
                  </TableCell>
                  <TableCell className='table_modify'>
                    <FastField component={(props) => (<input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} />)} id={Object.keys(argv.IV)[0]} name={Object.keys(argv.IV)[0]} />
                    <div className='error_msg'><ErrorMessage name={Object.keys(argv.IV)[0]} /></div></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='table_modify'>Mother</TableCell>
                  <TableCell className='table_modify'>
                    <FastField component={(props) => (<input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event, Object.keys(argv.IV)[3], argv.totalcheck[1])} {...props.field} />)} id={Object.keys(argv.IV)[3]} name={Object.keys(argv.IV)[3]} />
                    <div className='error_msg'><ErrorMessage name={Object.keys(argv.IV)[3]} /></div></TableCell>
                  <TableCell className='table_modify'>
                    <FastField component={(props) => (<input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} />)} id={Object.keys(argv.IV)[2]} name={Object.keys(argv.IV)[2]} />
                    <div className='error_msg'><ErrorMessage name={Object.keys(argv.IV)[2]} /></div></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className='table_modify'>Brothers / Sisters (Combined Income)</TableCell>
                  <TableCell className='table_modify'>
                    <FastField component={(props) => (<input type='text' autoComplete="off" onKeyDown={(event) => IsInputNumber(event, Object.keys(argv.IV)[5], argv.totalcheck[2])} {...props.field} />)} id={Object.keys(argv.IV)[5]} name={Object.keys(argv.IV)[5]} />
                    <div className='error_msg'><ErrorMessage name={Object.keys(argv.IV)[5]} /></div></TableCell>
                  <TableCell className='table_modify'>
                    <FastField component={(props) => (<input type='text' autoComplete="off" onKeyDown={(event) => IsInputText(event)} {...props.field} />)} id={Object.keys(argv.IV)[4]} name={Object.keys(argv.IV)[4]} />
                    <div className='error_msg'><ErrorMessage name={Object.keys(argv.IV)[4]} /></div></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className='table_modify' sx={{ textAlign: 'end' }}>Total Monthly Income =</TableCell>
                  <TableCell className='table_modify'>
                    <span id={argv.totalcheck[0]} hidden>0</span><span id={argv.totalcheck[1]} hidden>0</span><span id={argv.totalcheck[2]} hidden>0</span><span id={argv.totalcheck[3]}>0</span>
                  </TableCell>
                  <TableCell className='table_modify'>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

    </>
  )
}

export default Tables

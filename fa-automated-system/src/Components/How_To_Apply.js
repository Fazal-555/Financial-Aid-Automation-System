import { Box, Typography } from '@mui/material'
const ApplyGuide = () => {

  return (
    <Box minHeight='100vh'>
      <Box p={{ xs: 3 }} className="page" >
        <Typography variant='h4' sx={{ padding: '20px', paddingLeft: '10px' }} className='title'>Application Guidelines<span className='dot'>.</span></Typography>
        <Box className='Card' pt={6}>
          <Typography >
            <b>Information needed for a student to Apply for FA?</b><br></br>
            Fast demands a student to provide information about following to apply for Financial Assistance:
            1.Personal Information (Includes Personal Data)
            2.Academic Information (Fsc/Olevels education and Matric info)
            3.Guardians Information Inc. Sources of Income Single/Multiple
            4.Information about any kind of Investments (Land/Plots,Stocks etc)
            5.Tax withholding information
            6.Home Expenses (Utility expenses,Bills etc)
            <br></br><br></br>
            <b>Limitations on Financial Assistance?</b><br></br>
            If Student fails to meet a certain GPA criteria, if (student has less then 2GPA). The FA is stopped.
            If student improves its Gpa <b>(Greater then 2GPA)</b>, the financial support is continued.
            If a student gets <b>WARNING </b>in a certain semester, the FA is stopped until the warning is improved
            If a certain course if Failed, the next time when the student will be repeating that course(University will not Pay for that course), the student will pay for that course.
            <br></br><br></br>
            <b>Amount of period FA is VALID?</b><br></br>
            The Financial Assistance is VALID for <b>4 Years of University Education</b>. After that the FA will be Removed.
            <br></br><br></br>
            <b>Repayment of FA by student?</b><br></br>
            The FA must be <b>repaid by the student in a duration of 4 YEARS </b>by the student.<br></br><br></br>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ApplyGuide

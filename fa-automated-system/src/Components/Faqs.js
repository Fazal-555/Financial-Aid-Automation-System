import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useState } from 'react'
const Faqs = () => {
  const [expand,setExpand]=useState(false);
  const handleChange = (isExpanded, panel) => {
    setExpand(isExpanded ? panel : false);
  };
  return (
    <Box minHeight={'100vh'}>
    <Box p={{ xs: 3}} className="page" >
    <Typography variant='h4' sx={{  padding: '20px', paddingLeft:'10px' }} className='title'>Frequently Asked Questions<span className='dot'>.</span></Typography>
     <Box className='Card' pt={6}>
     <Accordion expanded={expand === 'panel1'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            What is Fast's Fee Structure?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The fee is charged on Semester basis, and it becomes due two weeks earlier than the start of a semester at the time of course registration.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expand === 'panel2'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
          What are Modes of Payment?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Fees are paid in the bank through bank challan available in Accounts Office/Flex.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expand === 'panel3'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
          Are fees Refundable?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          All fees are non-Refundable. All fees are non-refundable (except security deposit) and also the University reserves the right to review the fee structure from time to time. Any revision of fees would be uniformly applicable to all students of the University.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expand === 'panel4'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
          Repaying of Student Loan?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The repayment of loan starts three months after graduation or getting a job, whichever is earlier. The total amount has to be repaid within a period of four years after graduation. Students are required to sign to this effect.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expand === 'panel5'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel5')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
          Limitation on Student Loan?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The financial assistance is limited to tuition fees only and is discontinued if the student's CGPA falls below 2.00 for undergraduate degree and 2.5 for graduate degree.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expand === 'panel6'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel6')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
          Repayment of Student Loan?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The repayment of loan starts three months after graduation or getting a job, whichever is earlier. The total amount has to be repaid within a period of four years after graduation. Students are required to sign to this effect.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expand === 'panel7'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel7')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
          What Student Services are offered?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The University may utilize the services of its senior students in different activities of the University. Such students are paid for rendering their services. Preference is normally given to indigent students.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expand === 'panel8'} onChange={(e,isExpanded)=>handleChange(isExpanded,'panel8')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
          Are there any Scholarships offered?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          (1.) Merit scholarship is awarded to the Top THREE position holders of each Board. This scholarship is available for four years of un-interrupted studies with full course load and is equal to the full tuition fee. Continuation of merit scholarship is subject to maintaining semester GPA of 3.0 or higher.
          <br></br>
          (2.)  Top Three position holders in each semester The university awards certificates and cash prizes to those undergraduate students, who are the top three in their department. Students are selected from each of the four years of every degree program. Only those students are eligible who have undertaken the prescribed course load and have SGPA of 3.00 or higher.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    </Box>
    </Box>
  )
}

export default Faqs

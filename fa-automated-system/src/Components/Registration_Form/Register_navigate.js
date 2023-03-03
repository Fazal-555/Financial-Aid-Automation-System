import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';




const Register_navigate = () => {


    const navigate = useNavigate();

    const [check, setCheck] = useState(1);

    const Apicall = async () => {
        const res = await fetch('/regform_check', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ arn_num: sessionStorage.getItem('ARN') })
            }
        })
        const ans = await res.json();
        console.log(ans[0]['regform_check']);
        if (ans[0]['regform_check'] != 'false') {
            navigate(`/${ans[0]['regform_check']}`);
        }
        else {
            setCheck(0);
        }

    }

    useEffect(() => {
        Apicall();
    }, []);

    return (
        check ?
            <Box p={{ xs: 3 }} className="page form-fill">
                <div className='center'>
                    <Typography variant='h3' className='title'>Loading<span className='dot'>.....!</span></Typography>
                </div>
            </Box> :
            <Box p={{ xs: 3 }} className="page form-fill">
            <div className='center'>
                <Typography variant='h3' className='title'>Sorry! Registration Form Is Not Availble<span className='dot'>.</span></Typography>
            </div>
        </Box>
    )
}

export default Register_navigate


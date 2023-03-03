import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

const Disclaimer = (props) => {
    const [open, setOpen] = React.useState(false);
    const [del, setDel] = React.useState(props['delete'])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            {del ? <Button color="error" onClick={handleClickOpen}>Delete Info</Button> : <Button variant="contained" className='btndis' size='large' onClick={handleClickOpen} sx={{ backgroundColor: '#4070f4', width: '40vw' }}>Submit</Button>}
            <Dialog open={open} onClose={handleClose}>
                <Box bgcolor={'white'}>
                    <DialogTitle textAlign='center' color={'#4070f4'} mt={1}>Disclaimer</DialogTitle>
                    <DialogContent>
                        {del?
                        <div>
You are about to delete the student's data. Are you sure?
                    </div>
                        :<>                        <div>
                            You are obligated to provide the information necessary for deciding whether you are eligible for a Study
                            Loan. Failure to provide the correct and complete information will result in refusal. University reserves the
                            right to pursue disciplinary and/or legal action in case of inaccurate information.
                        </div>
                        <div>
                            <b>
                                By clicking on save button, I confirm that I have read, understood and accepted the terms laid out Study Loan
                                Handout, issued by FAST, and that all the information submitted within this phase is true.
                            </b>
                        </div></>}

                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between', paddingX: '40px', paddingBottom: '20px' }}>
                        <Button size='large' variant='text' onClick={handleClose} sx={{ backgroundColor: 'white !important', color: '#4070f4' }} fullWidth>{del?"No":"Cancel"}</Button>
                        <Button size='large' variant="contained" className='btndis' onClick={() => props['Submitdata']()} fullWidth>{del?"Yes":"Save"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}

export default Disclaimer

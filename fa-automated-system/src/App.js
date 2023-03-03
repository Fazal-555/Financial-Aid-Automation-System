
import { Grid, Stack, Box } from '@mui/material';
import { useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import AdminProfile from './Components/AdminProfile';
import ApplicationData from './Components/ApplicationData';
import Faqs from './Components/Faqs';
import Studentlogin from './Components/StudentLogin';
import Navbar from './Components/Navbar/Navbar';
// import Profile from './Components/Profile';
import Registration_form from './Components/Registration_Form/Registration_form';
import Registration_form2 from './Components/Registration_Form/Registration_form2';
import Registration_form3 from './Components/Registration_Form/Registration_form3';
import StudentsData from './Components/StudentsData';
import UpdateProfile from './Components/UpdateProfile';
import Adminlogin from './Components/Adminlogin';
import Upload_documents from './Components/Registration_Form/Upload_documents';
import Studentsignup from './Components/Studentsignup';
import ApplyGuide from './Components/How_To_Apply';
import Installments from './Components/Installments';
import Register_navigate from './Components/Registration_Form/Register_navigate';
import { ToastContainer, Zoom } from 'react-toastify';
const StudentSide = ['Home', 'How_To_Apply', 'FAQs', 'Registration_Form']
const AdminSide = ['Students_Data', 'Applications', 'Installments'];
function App() {
  const [nav, setNav] = useState(sessionStorage.getItem("value"));
  const [view, setView] = useState(sessionStorage.getItem("display"));

  return (
    <>
      <Box width={sessionStorage.getItem("display") ? { xs: 'fit-content', lg: '1150px', md: '900px' } : { xs: '360px', lg: '1150px', md: 'fit-content' }} sx={{ margin: 'auto', paddingX: '20px', paddingBottom: '20px' }}>{view === '9' ? <>
        {nav === '1' ? <>
          <Navbar links={AdminSide} view={() => setView('12')} nav={nav} />
        </> : <Navbar links={StudentSide} view={() => setView('12')} nav={nav} />}</>
        : <></>}
        <Box id="side_body" >
          <Routes>
            <Route path='/How_To_Apply' element={<ApplyGuide />}></Route>
            <Route path='/SignUp' element={<Studentsignup />}></Route>
            <Route path='Registration_Form/RegForm/Registration_Form2/Registration_Form3/Upload_Doc' element={<Upload_documents />}></Route>
            <Route path='Admin' element={<Adminlogin check={(value) => setNav(value)} changeview={(value) => setView(value)} />}></Route>
            <Route path='Student' element={<Studentlogin check={(value) => { setNav(value) }} changeview={(value) => setView(value)} />}></Route>
            <Route path='Students_Data' element={<StudentsData />}></Route>
            <Route path='Registration_Form' element={<Register_navigate />}></Route>
            <Route path='Registration_Form/RegForm' element={<Registration_form />}></Route>
            <Route path='Registration_Form/RegForm/Registration_Form2' element={<Registration_form2 />}></Route>
            <Route path='Registration_Form/RegForm/Registration_Form2/Registration_Form3' element={<Registration_form3 />}></Route>
            <Route path='Students_Data/Adminprofile' element={<AdminProfile />}></Route>
            <Route path='FAQs' element={<Faqs />}></Route>
            <Route path='Home' element={<UpdateProfile />}></Route>
            <Route path='Applications' element={<ApplicationData />}></Route>
            <Route path='Applications/Home' element={<UpdateProfile />}></Route>
            <Route path='Installments' element={<Installments />}></Route>
            <Route path='Installments/Home' element={<UpdateProfile />}></Route>
          </Routes>
        </Box>
      </Box>
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={false}
        draggable={true}
        transition={Zoom}
        theme={'colored'}
        closeButton={false}
        style={{width:'fit-content'}}
        limit={1} />
    </>
  );
}

export default App;

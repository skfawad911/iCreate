import './App.css';
import { Route, Routes } from 'react-router-dom';
import Forward from './components/Forward.js';
import Template1 from './components/Template1.js';
import Template2 from './components/Template2.js';
import Template3 from './components/Template3.js';
import Template4 from './components/Template4.js';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login/Login.jsx';
// import Template7 from './components/Template7.js';
import Welcome from './components/Welcome/Welcome.jsx';
import VideoBack from './components/VideoBack.jsx';

function App() {
  return (
    <Routes>
     
      <Route path='/temp1/:videoname/:MRID/:name' element={<Template1 />} />
      <Route path='/temp2/:videoname/:MRID/:name' element={<Template2 />} />
      <Route path='/temp3/:videoname/:MRID/:name' element={<Template3 />} />
      <Route path='/temp4/:videoname' element={<Template4/>} />
      {/* <Route path='/temp5/:videoname' element={<Template7/>} /> */}
      <Route path='/team' element={<Forward />} />
      <Route path='/home/:MRID' element={<HomePage/>} />
      <Route path='/' element={<Login/>} />
      <Route path='/welcome/:MRID' element={<Welcome/>} />
      <Route path='/videoback' element={<VideoBack/>}/>
    </Routes>
  );
}

export default App;

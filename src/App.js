import './App.css';
import Contact from './components/Contact/Contact';
import Register from './components/Register/Register';
import { ContextProvider } from './components/context/Context';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Pages from './components/pages/Pages';
import Posts from './components/posts/Posts';
import Settings from './components/settings/Settings';
import Single from './components/single/Single';
import Topbar from './components/topbar/Topbar';
import Write from './components/writepage/Write';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <>
    
 
    {/* <Pages /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/setting' element={<Settings />} ></Route>
        <Route path='/' element={<Register />} ></Route>
    <Route path='/pages' element={<Pages />}></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/write' element={<Write />} ></Route>
        <Route path='/single/:id' element={<Single />} ></Route>
        <Route path='/contact' element={<Contact />} ></Route>

      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;

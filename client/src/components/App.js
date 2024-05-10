import React, { useEffect } from 'react'
import Navbar from "./Navbar/navbar.jsx";
import './app.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from './Register/RegisterForm.jsx';
import Login from './Login/LoginForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../action/user.js';
import Disk from './disk/Disk.jsx';
import Profile from './profile/Profile.jsx';
function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <div className="wrap">
          {!isAuth ?
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
            :
            <Routes>
              <Route path='/' element={<Disk />} />
              <Route path="*" element={<Navigate to="/" replace/>}/>
              <Route path='/profile' element={<Profile />} />
            </Routes>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App

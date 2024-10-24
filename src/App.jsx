import React, { createContext, useEffect, useState } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

export const context=createContext()

export default function App() {
  
const [user,setUser]=useState()
const userset=(value)=>{
  setUser(value)
}

useEffect(()=>{
  const verifyUser= async ()=>{
    try{
      const response=await axios.get('http://localhost:5000/api/auth/verify',{headers:{
        authorization:`Bearer ${localStorage.getItem("token")}`
      }})
      console.log(response)
      if(response.data.success){
        setUser(response.data.name)
      }
    }
    catch(e){
      console.log(e)
    }
  }
  verifyUser()
},[])
  return (
    <context.Provider value={{user,userset}}>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/forgetpassword' element={<ForgetPassword/>}> </Route>
      <Route path='/reset-password/:id/:token' element={<ResetPassword/>}></Route>
     </Routes>
     <ToastContainer/>
     </BrowserRouter>

    </context.Provider>
  );
}

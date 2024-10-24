import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { context } from '../App';
import { toast } from 'react-toastify';



export default function ResetPassword() {
    const navigate=useNavigate()
    const [signupDetails,setDetails]=useState({
        password:''
    })
    const {email,password}=signupDetails
    const {id,token}=useParams()
    const changeHandler=(e)=>{
        setDetails({...signupDetails,[e.target.name]:e.target.value})
        console.log(signupDetails)
  }
  const submitHandler= async (e)=>{
    e.preventDefault();
    console.log(signupDetails)
    const response =await axios.post(`http://localhost:5000/api/auth/reset-password/${id}/${token}`,{password},
      {headers:{
        authorization:`Bearer ${token}`
      }}
    )
    if(response.data.success){
        toast.success('Password Changed Successfully Please Login!!')
        navigate('/login')
    }
    console.log(response)
  }
  return (
    <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'antiquewhite'}}>
    <div className="form-styles">
      <h3>ResetPassword</h3>
      <form>
        <label className='col-sm-10 col-form-label'>Password:</label>
        <input placeholder='Enter Password' className='form-control' type="password" name="password" value={password}  onChange={(e)=>changeHandler(e)}/>
        <button className='btn mt-3 col-sm-12' style={{backgroundColor:'#4cb2b2',color:'white'}} type="submit" onClick={(e)=>submitHandler(e)}>Change</button>
      </form>
    </div>
    </div>
  );
}

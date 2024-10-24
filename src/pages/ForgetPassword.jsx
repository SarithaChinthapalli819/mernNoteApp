import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../App';
import { toast } from 'react-toastify';



export default function ForgetPassword() {
  const navigate = useNavigate()
  const { userset } = useContext(context)
  const [signupDetails, setDetails] = useState({
    email: ''
  })
  const { email, password } = signupDetails
  const changeHandler = (e) => {
    setDetails({ ...signupDetails, [e.target.name]: e.target.value })
    console.log(signupDetails)

  }
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(signupDetails)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email })
      if (response.data.success) {
        toast.success('Reset Password Link Sent To Email Chcek !!')
        localStorage.setItem('token', response.data.token)
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  }
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'antiquewhite' }}>
      <div className="form-styles">
        <h3>Forgot Password</h3>
        <form>
          <label className='col-sm-10 col-form-label'>Email:</label>
          <input placeholder='Enter Email' className='form-control' type="email" name="email" value={email} onChange={(e) => changeHandler(e)} />
          <button className='btn mt-3 col-sm-12' style={{ backgroundColor: '#4cb2b2', color: 'white' }} type="submit" onClick={(e) => submitHandler(e)}>Continue</button>
          <Link to='/login'><button className='btn mt-3 col-sm-12' style={{ backgroundColor: 'red', color: 'white' }} type="submit" >Back To Login</button></Link>
        </form>
      </div>
    </div>
  );
}

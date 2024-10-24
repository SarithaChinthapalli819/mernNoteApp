import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Signup() {
  const navigate = useNavigate()
  const [signupDetails, setDetails] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = signupDetails
  const changeHandler = (e) => {
    setDetails({ ...signupDetails, [e.target.name]: e.target.value })
    console.log(signupDetails)
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(signupDetails)
    if (name == '') {
      toast.error('Name Is Mandatory ..')
    }
    else if (email == '') {
      toast.error('Email Is Mandatory ..')
    }
    else if (password == '') {
      toast.error('Password Is Mandatory ..')
    }
    else {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password })
      if (response.data.success) {
        toast.success('Registered SuccessFully !!')
        navigate('/login')
      }
    }

  }
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'antiquewhite' }}>
      <div className="form-styles">
        <h3>Signup</h3>
        <form>
          <label className='col-sm-10 col-form-label'>Name:</label>
          <input placeholder='Enter Username' className='form-control col-sm-10' type="text" name="name" value={name} onChange={(e) => changeHandler(e)} />
          <label className='col-sm-10 col-form-label'>Email:</label>
          <input placeholder='Enter Email' className='form-control' type="email" name="email" value={email} onChange={(e) => changeHandler(e)} />
          <label className='col-sm-10 col-form-label'>Password:</label>
          <input placeholder='Enter Password' className='form-control' type="password" name="password" value={password} onChange={(e) => changeHandler(e)} />
          <button className='btn mt-3 col-sm-12' style={{ backgroundColor: '#4cb2b2', color: 'white' }} type="submit" onClick={(e) => submitHandler(e)}>Signup</button>
          <div className='mt-2' style={{ textAlign: 'center' }}>Already Have An Account? <Link to='/login'>Login</Link></div>
        </form>
      </div>
    </div>
  );
}

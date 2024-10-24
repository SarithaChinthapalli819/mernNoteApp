import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../App';
import { toast } from 'react-toastify';



export default function Login() {
  const navigate = useNavigate()
  const { userset } = useContext(context)
  const [signupDetails, setDetails] = useState({
    email: '',
    password: ''
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
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        toast.success('Login Success !!')
        userset(response.data.user.name)
        navigate('/')
      }
      else if (!response.data.success) {
        toast.error('Login Failed !!')
        toast.warning('failed')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  }
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'antiquewhite' }}>
      <div className="form-styles">
        <h3>Login</h3>
        <form>
          <label className='col-sm-10 col-form-label'>Email:</label>
          <input placeholder='Enter Email' className='form-control' type="email" name="email" value={email} onChange={(e) => changeHandler(e)} />
          <label className='col-sm-10 col-form-label'>Password:</label>
          <input placeholder='Enter Password' className='form-control' type="password" name="password" value={password} onChange={(e) => changeHandler(e)} />
          <div className="float-end mt-1"> <Link to='/forgetpassword' style={{ textDecoration: 'none', color: 'green' }}>Forgot Password</Link></div>
          <button className='btn mt-3 col-sm-12' style={{ backgroundColor: '#4cb2b2', color: 'white' }} type="submit" onClick={(e) => submitHandler(e)}>Login</button>
          <div className='mt-2' style={{ textAlign: 'center' }}>Don't Have An Account? <Link to='/register' style={{ textDecoration: 'none', color: 'green' }}>Register</Link></div>
        </form>
      </div>
    </div>
  );
}

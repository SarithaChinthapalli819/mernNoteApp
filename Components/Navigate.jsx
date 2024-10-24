import React, { useContext } from 'react';
import { context } from '../src/App';
import { Link } from 'react-router-dom';

export default function Navigate({setQuery}) {
  const { user } = useContext(context)
  const { userset } = useContext(context)
  console.log(user)
  const setUser =()=>{
    localStorage.setItem("token",null)
    userset('')
    console.log(user)
  }
  
  return (
    <>

      <div className="container-fluid d-flex justify-content-between align-items-center bg-dark p-2">
        <div className='navbar-brand text-light'>Note App</div>
        <input type="text" placeholder="search" className='form-control' style={{ width: '300px' }} onChange={(e)=>setQuery(e.target.value)}/>
        <div>
          {user ?
            <div className='d-flex align-items-center justify-content-between' style={{ width: '150px' }}>
              <div style={{ color: "white" }}>{user}</div>
              <Link to='/login'><button className='btn btn-danger' onClick={()=>setUser()}>Logout</button></Link>
            </div>
            :
            <div className='d-flex justify-content-between' style={{ width: '180px' }}>
              <Link to='/login'><button className='btn btn-success'>Login</button></Link>
              <Link to='/register'><button className='btn btn-primary'>Register</button></Link>
            </div>}
        </div>
      </div>

    </>
  );
}

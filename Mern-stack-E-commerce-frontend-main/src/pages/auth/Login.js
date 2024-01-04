import React, { useState } from 'react'
import Layout from '../../components/Layout' 
import './auth.css' 
import { toast } from 'react-toastify'
import axios from "axios";
import {API_BASE_URL} from '../../config'
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [auth,setAuth]= useAuth()

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(email, password)
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/auth/login`,{email, password});

      if(res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate('/')
      }else{
        toast.error(res.data.message)
      }

      
    } catch (error) {
      toast.error('something went wrong')
    }
  }
  return (
    <Layout>
        <div>
  <h2 className="login-head">Login Form</h2>
  {/* Login form */}
  <form onSubmit={handleSubmit}>
    <div className="row mx-0 d-flex align-items-center justify-content-center">
      <div className="col-lg-6 col-md-6 col-sm-12 ">
        <div className="frm">
          <label htmlFor="exampleInputEmail1 mb-3" className="form-label">Email Address</label>
          <input type="email" className="form-control "  value={email} onChange={(e)=> setEmail(e.target.value)} id="eml" required aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label" >Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)} id="pswd" required />
        </div>
        <div className="mb-3 form-check d-flex align-items-center justify-content-center">
          <div className="btns">
            <button type="submit" className="login-btn-dsign text-white">Login</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

    </Layout>
  )
}

export default Login
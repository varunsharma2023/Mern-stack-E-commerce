import React, { useState } from 'react'
import Layout from '../../components/Layout' 
import './auth.css' 
import { toast } from 'react-toastify'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import {API_BASE_URL} from '../../config'


const Register = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(name, email, password, address , phone)
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/auth/register`,{name,email, password, phone, address});

      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login')
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
  <h2 className="login-head">Register Form</h2>
  {/* Login form */}
  <form onSubmit={handleSubmit} id="login-frm">
    <div className="row mx-0 d-flex align-items-center justify-content-center mt-4">
      <div className="col-lg-4 col-md-4 col-sm-12 ">
      <div className="frm mb-3">
          
          <input type="text" value={name} onChange={(e)=> setName(e.target.value)}
           className="form-control shadow " id="emlr" required aria-describedby="emailHelp" placeholder='Enter Your Full Name' />
         
        </div>
        <div className="frm mb-3">
          
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control shadow " id="em" required aria-describedby="emailHelp" placeholder='Enter Your Email' />
        
        </div>
        <div className="mb-3">
          
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control shadow" id="pswd" required placeholder='Enter Your password' />
        </div>

        <div className="frm mb-3">
          
          <input type="number" value={phone} onChange={(e)=> setPhone(e.target.value)} className="form-control shadow " id="eml" required aria-describedby="emailHelp" placeholder='Enter Your Phone' />
         
        </div>

        <div className="frm mb-3">
          
          <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} className="form-control shadow " id="e" required aria-describedby="emailHelp" placeholder='Enter Your Address' />
         
        </div>


        <div className="mb-3 form-check d-flex align-items-center justify-content-center">
          <div className="btns">
            <button type="submit" className="login-btn-dsign text-white">Register</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

    </Layout>
  )
}

export default Register
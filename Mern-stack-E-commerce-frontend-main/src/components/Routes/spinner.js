import React from 'react'
import { Audio , RotatingLines } from 'react-loader-spinner'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Spinner = () => {
    const [count, setCount]= useState(3)
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((prevValue)=> --prevValue)
        }, 1000);

        count ===0 && navigate('/login')
        return () =>clearInterval(interval)

    },[count,navigate])

    
  return (
    <div>
  <div className='d-flex flex-column justify-content-center my-auto mx-auto' style={{ alignItems: 'center', height: '100vh' }}>
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
    <div className='text-center' style={{ padding: '20px' }}>
    <h4 className=''>redirecting in {count} seconds</h4>
  </div>
  </div>
  
  
</div>


  )
}

export default Spinner
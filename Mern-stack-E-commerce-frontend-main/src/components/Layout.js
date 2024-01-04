import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Homecover from './Homecover'
import Slider from './Slider'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = (props) => {
  return (
    <div>
      
        <Header/>
       <main style={{ minHeight: '80vh' }}>
       <ToastContainer/>
  {props.children}
  
      </main>
<Footer/>
        
    </div>
  )
}

export default Layout
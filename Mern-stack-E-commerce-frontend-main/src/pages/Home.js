import React from 'react'
import Homecover from '../components/Homecover'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Layout from '../components/Layout'
import { useAuth } from '../context/auth'
import Products from '../components/Slider'


const Home = () => {
  const [auth,setAuth]=useAuth()
  return (
    <div>
     
      <Layout>
        {/* <pre>{JSON.stringify(auth)}</pre> */}
      <Homecover/>
        <Products/>
      </Layout>
      
    </div>
  )
}

export default Home
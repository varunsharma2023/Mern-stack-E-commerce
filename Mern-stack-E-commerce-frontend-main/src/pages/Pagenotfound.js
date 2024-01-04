import React from 'react'
import Layout from '../components/Layout'
import './pagenotfound.css'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout>
        <div className='pnf'>
        <h1 >404</h1>
        <h3>Page Not Found</h3>
        </div>
    </Layout>
  )
}

export default Pagenotfound
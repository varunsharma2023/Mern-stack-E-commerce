import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashbord = () => {

  const [auth] = useAuth()
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>

          </div>
          <div className='col-md-9'>
            <div className='card w-80 p-4 mt-5'>
            <h4>Admin Name : {auth && auth.user.name}</h4>
            <h4>Admin email : {auth && auth.user.email}</h4>
            <h4>Admin Contact : {auth && auth.user.phone}</h4>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default AdminDashbord
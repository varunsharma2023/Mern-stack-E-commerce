import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/auth'


const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
        <div className=''>
            <div className='row'>
                <div className='col-md-3'>
                <UserMenu/>

                </div>
                
                <div className='col-md-9'>
                  <div className='card'></div>
                    <h4>{auth && auth.user.name}</h4>
                    <h4>{auth && auth.user.email}</h4>
                    <h4>{auth && auth.user.address}</h4>
                </div>

            </div>
        </div>
    </Layout>
  )
}

export default Dashboard
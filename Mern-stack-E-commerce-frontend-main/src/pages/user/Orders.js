import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

const Orders = () => {
  return (
    <Layout>
        <div className=''>
            <div className='row'>
                <div className='col-md-3'>
                <UserMenu/>

                </div>
                
                <div className='col-md-9'>
                    <h1 className=' text-center'> Your Orders</h1>
                </div>

            </div>
        </div>
    </Layout>
  )
}

export default Orders
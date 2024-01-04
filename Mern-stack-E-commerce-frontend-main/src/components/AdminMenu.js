import React from 'react'
import { NavLink } from 'react-router-dom'


const AdminMenu = () => {
  return (
    <div>
        <div className='text-center'>
            <h2>Admin Panel</h2>
        <div className="list-group">
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action" >
    Create Categories
  </NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Product</NavLink>
  
</div>


        </div>
        
    </div>
  )
}

export default AdminMenu
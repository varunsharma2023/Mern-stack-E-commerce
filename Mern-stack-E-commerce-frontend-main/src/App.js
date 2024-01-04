import './App.css';
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pagenotfound from './pages/Pagenotfound';
import Contactus from './pages/Contactus';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import Spinner from './components/Routes/spinner';
import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashbord from './pages/Admin/AdminDashbord';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';

import Orders from './pages/user/Orders';

import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import CartPage from './pages/CartPage';
import Profile from './pages/user/Profile';
import Allproducts from './pages/Allproducts';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';



function App() {
  return (
    <div className="App">

      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product/:slug' element={<ProductDetail />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/allproducts' element={<Allproducts />} />
          <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>} />
          <Route path="user/orders" element={<Orders/>} />
          <Route path="user/profile" element={<Profile/>} />
          </Route>

          <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashbord/>} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Products/>} />
          
          </Route>


          
          <Route path='/contact' element={<Contactus/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />

          

          <Route path='*' element={<Pagenotfound/>} />
          
        </Routes>
      
    </div>
  );
}

export default App;

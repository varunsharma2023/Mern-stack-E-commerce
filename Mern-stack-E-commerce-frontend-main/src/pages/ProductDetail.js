import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import { API_BASE_URL } from "../config";
import Layout from '../components/Layout'

const ProductDetail = () => {
    const params = useParams()
    const [product , setProduct] = useState({})
    const [cart, setCart] = useCart();
    const getproduct = async ()=>{
        try {
            const {data} = await axios.get(`${API_BASE_URL}/api/v1/product/get-product/${params.i}`);
            setProduct(data.product);
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect (()=>{
        if(params.slug) getproduct()
    },[params.slug])
  return (
    <Layout>
        <div className='row  mt-2 mb-2'>
            <div className='col-md-6'>
            <img
                  src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                  height={500}
                  width={180}
                />
            </div>
            <div className='col-md-5 border shadow ms-5'>
                <h1 className='text-center mt-5 mb-5'>Product Details</h1>

                <div className='text-center'>

                <h5>Name : {product.name}</h5>
                <br/>
                <h5>Description : {product.description}</h5>
                <br/>
                <h5>Price : {product.price}</h5>
                <br/>

                <button
                      className="btn-dsign"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success(`${product.name} added to cart`);
                      }}
                    >
                      <i
                        className=" cart-icon fa-solid fa-cart-shopping fa-sm mx-1"
                        style={{ color: "black" }}
                      />
                      Add to Cart
                    </button>

                    </div>
                
                
            </div>
        </div>

    </Layout>
  )
}

export default ProductDetail
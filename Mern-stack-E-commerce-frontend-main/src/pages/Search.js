import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/search'
import { API_BASE_URL } from "../config";
import { useCart } from "../context/cart";

import { toast } from "react-toastify";
const Search = () => {
    const [values , setValues] = useSearch()
    const [cart, setCart] = useCart();
  return (
    <Layout>
        <div className='container'>
            <div className='text-center'>
                <h1>Search results {values.results.length }</h1>

                <div className="row">
        {values.results.map((p) => (
          <div className="col-md-3 mb-3" key={p._id}>
            <div className="card mx-0 " style={{ width: "100%" }}>
              <div className="image-wrapper">
                <img
                  src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top img-fluid"
                  alt={p.name}
                />
              </div>
              <div>
                <div className="card-body">
                  <h3 className="card-title d-flex align-items-center justify-content-center">
                    {p.price}
                  </h3>
                  <p className="card-text text-center">{p.description}</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn-dsign"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success(`${p.name} added to cart`);
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
            </div>
          </div>
        ))}
      </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search
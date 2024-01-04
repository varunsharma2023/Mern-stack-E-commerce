import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Allproducts = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="text-center mb-2">
        <h1> All products</h1>
      </div>
      <div className="row">
        {products.map((p) => (
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
                  <div className="text-center mt-2">
                  <button
                      className="btn btn-primary " onClick={()=>navigate(`/product/${p.slug}`)} 
                    > 
                     More Details
                    </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Allproducts;

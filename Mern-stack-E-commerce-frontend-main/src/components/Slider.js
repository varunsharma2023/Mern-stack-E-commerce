import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const Products = () => {
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
    <div>
      <div className="text-center mb-2">
        <h1> Featured products</h1>
      </div>
      <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {products.map((p, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={p._id}
            >
              <div className="row">
                {products.slice(index, index + 4).map((product) => (
                  <div className="col-md-3  mb-3" key={product._id}>
                    <div className="card mx-0 " style={{ width: "100%" }}>
                      <div className="image-wrapper">
                        <img
                          src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top img-fluid"
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <div className="card-body">
                          <h3 className="card-title d-flex align-items-center justify-content-center">
                            {product.price}
                          </h3>
                          <p className="card-text text-center">{product.description}</p>
                          <div className="d-flex align-items-center justify-content-center">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Products;

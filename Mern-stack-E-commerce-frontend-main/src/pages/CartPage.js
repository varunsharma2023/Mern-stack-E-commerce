import React from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { API_BASE_URL } from "../config";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //total price

  const total = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //delete item

  const removeItem = (pid) => {
    try {
      let mycart = [...cart];
      let filter = mycart.findIndex((item) => item._id === pid);
      mycart.splice(filter, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Layout>
      <div className="container">
        <h3 className="mt-4 mb-4 text-center fw-bold">
          {`Hello ${auth.token && auth.user.name}`}
        </h3>

        <p className="text-center">
          {cart.length
            ? `You Have ${cart.length} items in your cart ${
                auth.token ? "" : "please login to checkout !"
              }`
            : " Your Cart Is Empty"}
        </p>

        <div className="row">
          <div className="col-sm-6 mb-3 mb-sm-0">
            {cart.map((p) => (
              <div className="card">
                <div className="card-body" key={p.id}>
                  <div className="row">
                    <div className="col">
                      <div className="imagc">
                        <img
                          src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top img-fluid "
                          alt={p.name}
                        />
                      </div>
                    </div>
                    <div className="col add-smry">
                      <h5>{p.name}</h5>
                      <p>{p.description}</p>
                      <p>{p.price}$</p>
                    </div>
                    <div className="col add-cart">
                      <button
                        className="btn-color"
                        onClick={() => removeItem(p._id)}
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Card for Summary of products */}
          <div className="col-md-6 col-sm-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">summary</h5>
              </div>
              <div className="card-body">
                <hr />
                <p>Cost = {total()}$</p>
                <hr />
              </div>
              <br />
              <br />
              <div className="d-flex mx-auto">
               
                <br />
                {auth.user ? (
                  <>
                  <p className=" col-md-4">Cash on Delivery</p>
                    <Link to="/dashboard/user/orders" className="btn-dsign">
                      Checkout
                    </Link>
                    
                  </>
                ) : (
                  <> <Link to='/login' className="btn btn-secondary mb-3">Please Login to checkout</Link></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

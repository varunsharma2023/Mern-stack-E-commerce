import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import { useCart } from "../../context/cart";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [values , setValues]= useSearch()
  const [cart , setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
  
    // Clear the cart and remove cart data from local storage
    setCart([]);
    localStorage.removeItem("cart");
  
    // Remove authentication data from local storage
    localStorage.removeItem("auth");
  
    toast.success("Logout successfully");
  };

  //search box

  const handlesubmit = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.get(`${API_BASE_URL}/api/v1/product/search/${values.keyword}`)
      setValues({...values , results:data});
      navigate("/search")
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div>
      <div className="navbar-container">
        <nav
          className="navbar navbar-expand-lg navbar-light nv bg-light sticky-top "
          id="head"
        >
          <div className="container-fluid">
            <a href="##">
              <img
                src={require("../../images/logo.png")}
                alt="E-shopping"
                className="logo"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <form className="serch" onSubmit={handlesubmit}>
                      <input
                        className="form-control me-2 serch_a"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={values.keyword}
                        onChange={(e)=> setValues({...values , keyword: e.target.value})}
                      />
                      <button className="serch_b" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="for">
                <ul
                  id="unordr"
                  className="d-flex justify-content-end align-items-center mt-1 mb-1 "
                >
                  {!auth.user ? (
                    <>
                      <li>
                        <NavLink to="/login">
                          <button className="btn login-btn-dsign text-white me-4">
                            Login
                          </button>
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <li>
                    <NavLink to="/cart">
                      <i
                        className="cart-icon fa-solid fa-cart-shopping fa-2xl me-4"
                        style={{ color: "#fb7e09" }}
                      ></i>
                    </NavLink>
                  </li>
                  {cart.length}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <ul className="nav container-fluid" id="product-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/allproducts" className="nav-link">
              All Products
            </NavLink>
          </li>
          

          {!auth.user ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link"
                  href="/pages/kidsproducts.html"
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textTransform: "uppercase" }}
                >
                  {auth && auth.user.name}
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth && auth.user.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                      href="#"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nav-link"
                      href="/pages/kidsproducts.html"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}

          <li className="nav-item">
            <NavLink to='/contact' className="nav-link" href="/pages/contactus.html">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

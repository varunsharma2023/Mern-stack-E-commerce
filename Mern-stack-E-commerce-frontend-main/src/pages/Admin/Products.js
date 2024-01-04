import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9 ">
            <div className="text-center mb-2">
          <h1> All products</h1>
          </div>
          <div className="row">

          {products.map((p) => (
            <div className=" d-flex col-lg-4 col-md-6 col-sm-12">
            <Link to = {`/dashboard/admin/product/${p.slug}`} className="product-link">
         
                
              <div className="card mx-0 " style={{ width: 280 }} key={p._id} >
                <div className="image-wrapper">
                  <img
                    src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img-fluid "
                    alt ={p.name}
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title d-flex align-items-center justify-content-center ">
                    {p.price}
                  </h3>
                  <p className="card-text text-center ">
                    {p.description}
                  </p>
                  <div className="d-flex align-items-center justify-content-center">
                    <button className="btn-dsign ">

                      Update Product
                    </button>
                  </div>
                </div>
              
            </div>
          
          </Link>
          </div>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

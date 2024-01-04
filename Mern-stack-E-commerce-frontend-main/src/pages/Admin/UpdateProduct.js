import { useEffect, useState } from "react";
import React from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";

import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { Select } from "antd";
import { useNavigate , useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {

  const navigate = useNavigate()
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");


//get single product 

const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  

  // getting all the categories

  const getallcategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/category/getcategory`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getallcategories();
  });


  //Update product function 

  const handleUpdate = async(e)=> {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const {data} = await axios.put(
        `${API_BASE_URL}/api/v1/product/update-product/${id}`, productData)

        if(data.success){
          toast.success('product Updated successfully')
          navigate('/dashboard/admin/products')
        }else{
          toast.error(data.message)
        }
      
    } catch (error) {
      
    }
  }

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/v1/product/del-product/${id}`
      );
      toast.success("Product Deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
          <div className="text-center my-2">
            <h2> Update Product</h2>
            </div>
            <div className="text-center w-75 mx-auto mt-4">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category.name}
              >
                {categories.map((cat) => (
                  <Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>




              <div className="mb-3 mt-3">
                <label  className="btn btn-outline-secondary col-md-12">
                  {photo?photo.name : "Upload Photo"}
                <input type="file" name="photo" id="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                </label>
              </div>

              <div className="mb-3">
                {
                  photo ? (
                    <div className="text-center">

                      <img src={URL.createObjectURL(photo)}
                      alt="Product"
                      height={"200px"}
                      className="img img-responsive"/>
                      </div>

                  ) :  ( <div className="text-center">

                  <img src={`${API_BASE_URL}/api/v1/product/product-photo/${id}`}
                  alt="Product"
                  height={"200px"}
                  className="img img-responsive"/>
                  </div>
                  )
                }
                
              </div>
              <div className="mb-3">
                <input type="text" value = {name} 
                placeholder="Write product name"
                className="form-control"
                onChange={(e)=> setName(e.target.value)}/>
              </div>
               <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update PRODUCT
                </button>

                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

import { useEffect, useState } from "react";
import React from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {

  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");


  

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


  //create product function 

  const handleCreate = async(e)=> {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const {data} = await axios.post(
        `${API_BASE_URL}/api/v1/product/create-product`, productData)

        if(data.success){
          toast.success('product created successfully')
          navigate('/dashboard/admin/products')
        }else{
          toast.error(data.message)
        }
      
    } catch (error) {
      
    }
  }
  return (
    <Layout>
      <div className="">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="text-center my-2">
            <h2> Create Product</h2>
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
                  photo&& (
                    <div className="text-center">

                      <img src={URL.createObjectURL(photo)}
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
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

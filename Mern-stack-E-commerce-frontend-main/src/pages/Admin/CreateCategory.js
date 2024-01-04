import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import axios from "axios";
import Form from "../../components/form/form";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState({ preview: '', data: '' });
  const [show, setShow] = useState(false);
  const [name,setName] = useState('')
  const [selected,setSelected]= useState(null)
  const [updatedName , setUpdatedName]= useState("")

  //modal

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handle form

  //image preview

  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = async(e) =>{
    try {
      const {data} = await axios.post(`${API_BASE_URL}/api/v1/category/create-cat`,{
        name,
      })

      if(data.success){
        toast.success(`New category created successfully`)
        getallcategories();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
      
    }

  }
  

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


  // update category

  
  
  const handleUpdate = async (e)=>{
    e.preventDefault();
    try {
       const {data}  = await axios.put(
        `${API_BASE_URL}/api/v1/category/update-category/${selected._id} ` , {name: updatedName}
      );

      if(data.success){
        toast.success('category is updated')
        setSelected(null)
        setUpdatedName("")
        setShow(false)

        getallcategories();

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      
      toast.error("something went wrong")
    }
  }

   // delete category

  
  
   const handleDelete = async (pId)=>{

    try {
       const {data}  = await axios.delete(
        `${API_BASE_URL}/api/v1/category/delete-category/${pId} `
      );

      if(data.success){
        toast.success('category is deleted')
        

        getallcategories();

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      
      toast.error("something went wrong")
    }
  }

  return (
    <Layout>
        <>
      <div className="">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9 mb-5">
            <h1>Manage Categories</h1>

            <div className="p-4">
              <Form handleSubmit ={handleSubmit} value ={name} setValue ={setName}/>
            </div>
            <div className="w-30">
            
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {categories.map((cat) => (
                      <>
                      <tr>
                      <td key={cat._id}> {cat.name}</td>
                    
                    
                    <td>
                      <button className="btn btn-primary ms-2" onClick={()=>{handleShow (true) ; setUpdatedName(cat.name);
                      setSelected(cat);
                      }}> Edit</button>
                    <button className="btn btn-danger ms-2 " onClick={()=>{handleDelete(cat._id)}}> Delete</button>
                    </td>
                    
                    </tr>
                    </>
                    ))}
                </tbody>
              </table>
             
            </div>

            <Modal
            
            show={show} onHide={handleClose}>
             
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
          </div>
        </div>
      </div>
      </>
    </Layout>
  );
};

export default CreateCategory;

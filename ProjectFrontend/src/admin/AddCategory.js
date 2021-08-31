import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("initialState");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/AdminDashBoard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("")
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    
    event.preventDefault()
    setError("")
  

    createCategory(user._id, token, { name }).then((data) => {
     
      if (data.error)
      {
        setError(true)
        setSuccess(false)

      }

      else
      {
        console.log("x")
        setSuccess(true)
        setError(false)
        setName("")
      }

    }).catch((err) => {
      setError(true)
      setSuccess(false)
    })

  }

  const sucessMessage = () => {
    if (success)
    {
        return (
      <h4>Succesfully Created</h4>
        )
    }
  
  }

  const errorMessage = () => {

    if (error)
    {
      
      return (
      <h4>Error in Creating</h4>
      )
      
    }
    
  }

  const myCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          onChange={handleChange}
          placeholder="For Ex. Summer"
        />
        <button className="btn btn-outline-info" >Create Category</button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
           {sucessMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
         
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;

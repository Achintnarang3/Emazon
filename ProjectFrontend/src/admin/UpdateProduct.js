import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getProduct, updateProduct,getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
    });

    const[categories,setCategories]=useState([])
    
    const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    stock,
     
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

    const preload = (productid) => {
      
        
    getProduct(productid).then(data => {
      
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {

        preloadCategory()
          setValues({
              ...values,
              name: data.name,
              category: data.category._id,
              description: data.description,
              price: data.price,
              stock:data.stock,
              formData: new FormData()
          });
         

         
        }
       
    });
    };
    
    const preloadCategory = () => {
         getCategories().then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories([...data]);
      }
    }).catch((err)=>console.log(err));
     }

  useEffect(() => {
      preload(match.params.productId);
      
  }, []);

  const onSubmit = event => {
    event.preventDefault();
     
      setValues({ ...values, error: "", loading: true });

      updateProduct(match.params.productId,user._id, token, formData).then(data => {
    
      if (data.error) {
       
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
      
     
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value)
   
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} updated successfully</h4>
    </div>
  );

    const errorMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct===null ? "" : "none" }}
    >
        <h4>{error}</h4>
    </div>
  );


  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
       onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update The Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update a product here!"
      description="Welcome to product update section"
      className="container bg-info p-4"
    >
      <Link to="/AdminDashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
         <div className="col-md-8 offset-md-2">
           {successMessage()}
          {errorMessage()} 
          {createProductForm()}
         </div>
      </div>
    </Base>
  );
};

export default  UpdateProduct;

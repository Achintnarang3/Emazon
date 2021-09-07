import React,{useState} from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart,removeitemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router";

const Card = ({ product,
  removeFromCart, addToCart,
  reload, setReload }) => {

  const [redirect, setRedirect] = useState(false)
  
  const addToCart1 = () => {
    
     addItemToCart(product,()=>setRedirect(true))
  }

  const reDirect = () => {
    if (redirect)
    {
      return (
        <Redirect to="/cart" /> 
      )  
    }
  }
    
    const name = product ? product.name : "A photo from pexels"
    const description = product ? product.description : " this photo looks great"
    const price = product ? product.price : "5"
    
  const addCart = (addToCart) => {
     
        return (addToCart && (
            <button
                onClick={ () => addToCart1() }
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add to Cart
            </button>
            
        )
    )
}

    const removeCart = (removeFromCart) => {
        return (
            removeFromCart && (
            <button
              onClick={() => {
                removeitemFromCart(product._id)
                console.log(product._id)
                setReload(!reload)
               }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
              Remove from cart
            </button>
            
        )
    )
}

  return (
    <div className="card text-white bg-dark border border-info ">
          <div className="card-header lead">
              {name}
          </div>
      {reDirect()}
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {description}
        </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {price}</p>
        <div className="row">
          <div className="col-12">
            {addCart(addToCart)}
          </div>
          <div className="col-12">
            {removeCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import { getAllProducts } from "./helper/coreapicalls";
import Base from "./Base";
import Card from "./Card";

export default function Home() {

  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  
  const loadAllProducts = () => {
    
    getAllProducts().then((data) => {
     // console.log(data)
      if (data.error)
      {
        console.log(data.error)
        setError(true)
      }

      else
      {
         setProducts(data)
      }

     

  })
    
  }

  useEffect(
    () => {
      loadAllProducts()
    },[]
  )
  
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        {
          products.map((product, index) => {
            return (
              <div key={index} className="col-4">
                <Card product={product} addToCart={true} removeFromCart={false} />
              </div>
            )
          })
        }
        
        
      </div>
    </Base>
  );
}

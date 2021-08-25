import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  
  const [value,setValue]=useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
  })



  var {name,email,password,error,success} = value


  const handleChange1=event=>{
    event.preventDefault()
    setValue({...value,name:event.target.value})
  }
  const handleChange2=event=>{
    event.preventDefault()
    setValue({...value,email:event.target.value})
  }
  const handleChange3=event=>{
    event.preventDefault()
    setValue({...value,password:event.target.value})
  }
  


  const onSubmit=(e)=>{
    
    e.preventDefault()
   
    setValue({...value,error:""})

    signup({name,email,password}).then((data)=>{
      
      
      
      if(data.error||data.status==400)
      {
        return setValue({...value,error:data.error?data:"Error in Creating Account",success:false})
      }
      
      setValue({...value,name:"",
                         email:"",
                         password:"",
                         error:"",
                         success:true
                  })

    }).catch(()=>{
      console.log("error in signup")
      setValue({...value, 
                         error:"Error in creating account",
                         success:false
                         
                  })
    })
  }

  const successMessage=()=>{
    return(
      
        <div className="col-md-6 offset-sm-3 text-center"> 
          
          < div className="alert alert-success"
             style={{ display:success?"block":"none"}}
            
          >
         You can login from here <Link to ="/SignIn">Click Here</Link>

        </div>
       </div> 
       
    )
  }

  const errorMessage=()=>{
    return(
      
      <div className="col-md-6 offset-sm-3 text-center"> 
        < div className="alert alert-danger"
           style={{ display:error?"":"none"}}
          
        >
         {error}

       </div>
       </div>  
    
    )
  }



  const signUpForm = () => {
    return (
      <div className="row">
       
        <div className="col-md-6 offset-sm-3 text-left">
      
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input className="form-control" 
               onChange={handleChange1}
               value={name}
               type="text" />
            </div>
            <div className="form-group">
              <label className="text-light" >Email</label>
              <input className="form-control" 
               onChange={handleChange2}
               value={email}
               type="email" />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" 
              onChange={handleChange3} 
              value={password}
              type="password"
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
    </Base>
  );
};

export default Signup;

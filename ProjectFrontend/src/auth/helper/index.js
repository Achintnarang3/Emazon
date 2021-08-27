 import {API} from "../../backend"

 export const signup=(user)=>{
    
     
     return fetch(`${API}/login/signup`,{
         method:"POST",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json"
         },
         body:JSON.stringify(user)
     }).then(res=>{
       
         return res;
     }).catch(error=>{
         return error
          
     })
 }

 export const signin=user=>{
    return fetch(`${API}/login/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then(res => {
       // var x = res.json()
        
        return res.json();
    }).catch(err => {
         console.log(err)
    })
}

export const authenticate = (data, next) => {
    

    if(typeof window!==null)
    {
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }


}

export const isAuthenticated=(next)=>{
    if(typeof window===null)
    {
         return false;
    }

    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else
    {
        return false;
    }




}


export const signout=(next)=>{
    if(typeof window!==null)
    {
        localStorage.removeItem("jwt")
        next()
    }

    return fetch(`${API}/login/signout`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        
    }).then(res=>{
        return res.json();
    }).catch(err=>{
        console.log("Error in signout route")
    })

}
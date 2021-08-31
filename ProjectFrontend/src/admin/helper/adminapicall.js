import { API } from "../../backend";

// Create category
export const createCategory = (userId, token, category) => {
    
    

    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(
        response => {
            return response.json()
        }

    ).catch(
      err=>console.log(err)
    )
}

// Get all categories
export const getCategories = () => {

    return fetch(`${API}/category/getAllCategory`, {
        method:"GET"
    }).then((res) => {
        return res.json()
    }).catch(err=>console.log(err))
    
}



// Create Product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/createProduct/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
            
        },
        body: product

    }).then((response) => {
       return response.json()
    }).catch((err) => {
      console.log(err)
    })
}

// Get all products.
export const getProducts = () => {

    return fetch(`${API}/product/getAllProducts`, {
        method:"GET"
    }).then((res) => {
        return res.json()
    }).catch(err=>console.log(err))
    
}

// Get Product
export const getProduct = (id) => {
    return fetch(`${API}/product/getProduct/${id}`, {
        method:"GET"
    }).then((res) => {
        return res.json()
    }).catch(err=>console.log(err))
}

// Update product
export const updateProduct = (productId,userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
            
        },
        body: product

    }).then((response) => {
       return response.json()
    }).catch((err) => {
      console.log(err)
    })
}

// Delete the product
export const deleteProduct = (productId,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
            
        },
       

    }).then((response) => {
       return response.json()
    }).catch((err) => {
      console.log(err)
    })
}



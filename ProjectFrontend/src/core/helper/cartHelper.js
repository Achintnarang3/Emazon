 let cart  =[]

export const addItemToCart = (item, next) => {
    if (typeof window != null)
    {
        if (localStorage.getItem("cart"))
        {
           cart=JSON.parse(localStorage.getItem("cart"))    
        }
        
        cart.push({
            ...item,
            count: 1
        })

        localStorage.setItem("cart", JSON.stringify(cart))
        next()

    }
}
 
export const loadCart = () => {
      
    if (typeof window != null) {
        if (localStorage.getItem("cart")) {
            return  JSON.parse(localStorage.getItem("cart"))
        }
    }
    
}

export const removeitemFromCart = (id) => {
    if (typeof window != null) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
            
            cart.map((product, index) => {
                if (product._id === id)
                {
                   cart.splice(index,1)    
                }
            })
        }

        localStorage.setItem("cart",JSON.stringify(cart))
    }
    
}

export const clearCart = (id) => {
    if (typeof window != null) {
        if (localStorage.getItem("cart")) {
            localStorage.removeItem("cart")
        }

        
    }
    
}


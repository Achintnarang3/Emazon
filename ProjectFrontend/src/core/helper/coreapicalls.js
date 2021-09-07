import { API } from "../../backend";

export const getAllProducts = () => {
    return fetch(
        `${API}/product/getAllProducts`, {
            method: "GET",
            headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res) => {
          return res.json()     
    }).catch((err) => {
        console.log(err)
    })
}
import {API} from "../config";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

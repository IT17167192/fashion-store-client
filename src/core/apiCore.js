import {API} from "../config";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getImage = (productId) => {
    return fetch(`${API}/product/image/${productId}`, {
        method: "GET",
    })
        .then(response => response)
        .catch(err => console.log(err))
};

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const updateUserCart = (userId, token, products) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(products)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const removeCartItem = (userId, token, products) => {
    return fetch(`${API}/cart/remove/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(products)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getProductByFilters = (skip, limitTo, filters = {}) => {
    const data = {
      limitTo,
      skip,
      filters
    };
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

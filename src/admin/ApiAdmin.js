import {API} from "../config";

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const addAdminUser = (userId, token, data) => {
    return fetch(`${API}/adminUser/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//Perform Create Read Update Delete for Products

//Get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//Get Single Product
export const getSingleProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};


// Update single product
export const updateSingleProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

// Delete single product
export const deleteSingleProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

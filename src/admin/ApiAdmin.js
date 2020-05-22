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

//Perform Update Delete for Products

//Get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//Get all users
export const getAllUsers = () => {
    return fetch(`${API}/users`, {
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
            Authorization : `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

// Update user state
export const updateUserState = (user, data, token) => {
    return fetch(`${API}/adminUser/modify/${user}`, {
        method: 'PUT',
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

//Perform Update Delete for Categories

//Get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//Get Single Category
export const getSingleCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};


// Update single Category
export const updateSingleCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
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

export const resetPassword = (userId, token, adminUserId) => {
    return fetch(`${API}/user/resetPassword/${userId}/${adminUserId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

// Delete single category
export const deleteSingleCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
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

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};
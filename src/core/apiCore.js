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

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

// export const updateUserCart = (userId, toekn, products) => {
//     return fetch(`${API}/user/${userId}`, {
//         method: "PUT",
//         headers: {
//
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${toekn}`
//         },
//         body: {"_id": products}
//     })
//         .then(response => response.json())
//         .catch(err => console.log(err))
// };

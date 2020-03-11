import {API} from "../config";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products`, {
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
};

import {API} from "../config";

//get user details with cart items
export const read = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const update = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const updateUser = (user, next) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('userToken')) {
            let auth = JSON.parse(localStorage.getItem('userToken'));
            auth.user = user;
            localStorage.setItem('userToken', JSON.stringify(auth))
            next();
        }
    }
};

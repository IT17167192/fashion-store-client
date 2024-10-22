import {API} from "../config";

export const signup = (data) => {
    return fetch(`${API}/signup`, {
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

export const signin = (data) => {
    return fetch(`${API}/signin`, {
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

export const newsletterSignUp = (data) => {
    console.log(data);
    return fetch(`${API}/newsletterSignUp`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email" : data})
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('userToken', JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('cart');
        localStorage.removeItem('wishlist');
        next();

        return fetch(`${API}/signout`, {
            method: 'GET',

        })
            .then(response => console.log('signout', response))
            .catch(err => console.log(err))
    }
};

export const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('userToken')) {
        return JSON.parse(localStorage.getItem('userToken'));
    } else {
        return false;
    }
};

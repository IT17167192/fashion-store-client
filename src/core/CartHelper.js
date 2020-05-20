//function to add cart items to local storage
export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')) //get items already exists
        }
        //set additional values
        cart.push({
            ...item,
            count: 1,   //no of selected items
            isChecked: false,   //checked for payment
            image: null,
            category: null
        });

        //check whether selected item is already in cart
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id) //if item exists, ignore item
        });

        if (cart.length !== 0) {
            localStorage.setItem('cart', JSON.stringify(cart)); //set items in local storage
        }
        next(); //callback function
    }
};

export const totalItems = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
};

//function to get cart items from local storage
export const showCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) { //if items exists
            return JSON.parse(localStorage.getItem('cart'));    //return items
        }
    }
    return [];  //if not return empty array
};

export const showSelectedCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (!product.isChecked) {
                cart.splice(i, 1);
            }
        });
        console.log(cart.length);
        return JSON.parse(JSON.stringify(cart));
    }
    return [];
};

export const getCartProductId = () => {
    let products = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            for (let i = 0; i < JSON.parse(localStorage.getItem('cart')).length; i++) {
                products.push(JSON.parse(localStorage.getItem('cart'))[i]);
            }
        }
        return JSON.parse(JSON.stringify(products));
    }
    return [];
};

//function to update cart items in local storage
export const updateItem = (productId, count, isChecked) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));    //get all cart items
        }

        cart.map((product, i) => {
            //find the item
            if (product._id === productId) {
                cart[i].count = count;  //set count
                cart[i].isChecked = isChecked;  //set checked state
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart))  //set updated item
    }
    return [];
};

//remove cart items from local storage
export const removeItem = (productId) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));    //get current items on local storage
        }

        //loop through items
        cart.map((product, i) => {
            //if item matches, remove item from array
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });
        //set new items to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = next => {
    let cart = [];
    if(typeof window !== 'undefined'){
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product.isChecked) {
                cart.splice(i, 1);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        next()
    }
    return cart;
};

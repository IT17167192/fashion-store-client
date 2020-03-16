export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        });

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id)
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
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

export const showCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

export const getCartProductId = () => {
    let products = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            //return JSON.parse(localStorage.getItem('cart'))[0];
            for (let i = 0; i < JSON.parse(localStorage.getItem('cart')).length; i++) {
                products.push(JSON.parse(localStorage.getItem('cart'))[i]);
            }
        }
        return JSON.parse(JSON.stringify(products));
    }
    return [];
};

export const updateItem = (productId, count) => {
    let cart =[];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return [];
};

export const removeItem = (productId) => {
    let cart =[];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart;
};



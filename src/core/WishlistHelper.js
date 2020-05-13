export const addItemtoWishlist = (wishlistItem, next) => {
    let wishlist = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'))
        }
        wishlist.push({
            ...wishlistItem,
            count: 1,
            isChecked: false,
            category: null
        });

        wishlist = Array.from(new Set(wishlist.map(p => p._id))).map(id => {
            return wishlist.find(p => p._id === id)
        });

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        next();
    }
};

export const totalWishlistItems = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            return JSON.parse(localStorage.getItem('wishlist')).length
        }
    }
    return 0;
};

export const showWishlist = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            return JSON.parse(localStorage.getItem('wishlist'));
        }
    }
    return [];
};

export const showSelectedWishlist = () => {
    let wishlist = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'));
        }

        wishlist.map((product, i) => {
            if (!product.isChecked) {
                wishlist.splice(i, 1);
            }
        });
        console.log(wishlist.length);
        return JSON.parse(JSON.stringify(wishlist));
    }
    return [];
};

export const getWishlistProductId = () => {
    let products = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            for (let i = 0; i < JSON.parse(localStorage.getItem('wishlist')).length; i++) {
                products.push(JSON.parse(localStorage.getItem('wishlist'))[i]);
            }
        }
        return JSON.parse(JSON.stringify(products));
    }
    return [];
};

export const updateWishlistItem = (productId, count, isChecked) => {
    let wishlist = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'));
        }

        wishlist.map((product, i) => {
            if (product._id === productId) {
                wishlist[i].count = count;
                wishlist[i].isChecked = isChecked;
            }
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
    return [];
};

export const removeItem = (productId) => {
    let wishlist = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'));
        }

        wishlist.map((product, i) => {
            if (product._id === productId) {
                wishlist.splice(i, 1);
            }
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    return wishlist;
};

export const emptyWishlist = next => {
    let wishlist = [];
    if(typeof window !== 'undefined'){
        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'));
        }

        wishlist.map((product, i) => {
            if (product.isChecked) {
                wishlist.splice(i, 1);
            }
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        next()
    }
    return wishlist;
};

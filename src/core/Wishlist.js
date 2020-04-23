import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import WishlistItems from "./WishlistItems";
import {showWishlist, removeWishlistItem} from "./WishlistHelper";
import {Link} from 'react-router-dom';
import Checkout from "./Checkout";
import {isAuthenticate} from "../auth";

const Wishlist = () => {
    const [wishlistitems, setWishlitItems] = useState([]);
    const [runWishlist, setRunWishlist] = useState(false);

    useEffect(() => {
        setWishlitItems(showWishlist());
    }, [runWishlist]);

    const showItems = wishlistitems => {
        return (
            <div>
                <h3>Your Wishlist has {`${wishlistitems.length}`} items</h3>
                <hr/>
                {wishlistitems.map((product, i) => (
                    <WishlistItems
                        key={i}
                        product={product}
                        wishlistUpdate={true}
                        removeProductWishlist={true}
                        setRunWishlist={setRunWishlist}
                        runWishlist={runWishlist}
                    />))}
            </div>
        )
    };

    const showNoItemsSign = () => {
        return (
            !isAuthenticate() ? (
                <div>
                    <h3>You don't have any items in your Wishlist</h3>
                    <h5>Have an account? Sign in to see your items.</h5>

                    <div className="row">
                        <div className="col-sm-6">
                            <button className="btn btn-lg btn-white text-primary w-100"><Link to="/">Start
                                Shopping</Link>
                            </button>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-lg btn-white w-100"><Link to="/signin"> Sign in </Link></button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>You don't have any items in your Wishlist. Let's get shopping!</h3>

                    <div className="col-sm-12">
                        <button className="btn btn-lg btn-white text-primary w-50"><Link to="/">Start
                            Shopping</Link>
                        </button>
                    </div>
                </div>
            )
        )
    };



    return (
        <Layout title="Wishlist" description="Manage Wishlist Items" className="container-fluid">

            <div className="container my-auto">
                <div className="row justify-content-center align-items-center text-center">
                    {wishlistitems.length > 0 ? '' : showNoItemsSign()}
                </div>
            </div>


            <div className="row">
                <div className="col-sm-7">
                    {wishlistitems.length > 0 ? showItems(wishlistitems) : ''}
                </div>

            </div>

        </Layout>
    );
};

export default Wishlist;

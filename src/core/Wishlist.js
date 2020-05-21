import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import WishlistItems from "./WishlistItems";
import {showWishlist, removeWishlistItem} from "./WishlistHelper";
import {Link} from 'react-router-dom';
import Checkout from "./Checkout";
import {isAuthenticate} from "../auth";
import CartItems from "./CartItems";
import FtrMin from "./FtrMin";

const Wishlist = () => {
    const [wishlistitems, setWishlitItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setWishlitItems(showWishlist());
    }, [run]);

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
                        setRun={setRun}
                        run={run}
                    />))}
            </div>
        )
    };

    const showNoItemsSign = () => {
        return (
            !isAuthenticate() ? (
                <div>
                    <h3 className="text-center">Have an account? Sign in to see your items.</h3>

                    <div className="row">
                        <div className="col-lg-6">
                            <button className="btn btn-lg btn-white text-primary w-100"><Link to="/shop">Start
                                Shopping</Link>
                            </button>
                        </div>
                        <div className="col-lg-6">
                            <button className="btn btn-lg btn-white w-100"><Link to="/signin"> Sign in </Link></button>
                        </div>
                    </div>
                </div>
            ) : (
                wishlistitems.length > 0 ? (
                    showItems(wishlistitems)
                ) : (
                    <div>
                        <h3 className="text-center">You don't have any items in your Wishlist. Let's get shopping!</h3>

                        <div className="col-lg-12 text-center">
                            <button className="btn btn-lg btn-white text-primary w-50"><Link to="/shop">Start
                                Shopping</Link>
                            </button>
                        </div>
                    </div>
                )
            )
        )
    };


    return (
        <div>
            <Layout title="Wishlist" description="Manage Wishlist Items" className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 ml-5">

                    </div>
                    <div className="col-lg-7 ml-5">
                        {showNoItemsSign()}
                    </div>
                </div>
            </Layout>
            <FtrMin/>
        </div>
    );
};

export default Wishlist;

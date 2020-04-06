import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import CartItems from "./CartItems";
import {showCart, removeItem} from "./CartHelper";
import {Link} from 'react-router-dom';
import Checkout from "./Checkout";
import {isAuthenticate} from "../auth";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(showCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h3>Your cart have {`${items.length}`} items</h3>
                <hr/>
                {items.map((product, i) => (
                    <CartItems
                        key={i}
                        product={product}
                        cartUpdate={true}
                        removeProductCart={true}
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
                    <h3>You don't have any items in your cart</h3>
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
                    <h3>You don't have any items in your cart. Let's get shopping!</h3>

                    <div className="col-sm-12">
                        <button className="btn btn-lg btn-white text-primary w-50"><Link to="/">Start
                            Shopping</Link>
                        </button>
                    </div>
                </div>
            )
        )
    };

    const showSummary = (items) => (
        <div className="card">
            <div className="card-body">
                <div>
                    <h3 className="mb-4">Your Cart Summary</h3>
                    <hr/>
                    <Checkout products={items}/>
                </div>
            </div>
        </div>
    );

    return (
        <Layout title="Shopping Cart" description="Manage Cart Items" className="container-fluid">

            <div className="container my-auto">
                <div className="row justify-content-center align-items-center text-center">
                    {items.length > 0 ? '' : showNoItemsSign()}
                </div>
            </div>


            <div className="row">
                <div className="col-sm-7">
                    {items.length > 0 ? showItems(items) : ''}
                </div>

                <div className="col-sm-4 ml-auto mr-auto my-5">
                    {items.length > 0 ? showSummary(items) : ''}
                </div>
            </div>

        </Layout>
    );
};

export default Cart;

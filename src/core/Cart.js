import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import {showCart, removeItem} from "./CartHelper";
import {Link} from 'react-router-dom';
import Checkout from "./Checkout";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(showCart())
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h3>Your cart have {`${items.length}`} items</h3>
                <hr/>
                {items.map((product, i) => (
                    <Card
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

    const showNoItems = () => (
        <h2>Your cart is empty. <br/><Link to="/">Continue Shopping</Link></h2>
    );

    return (
        <Layout title="Shopping Cart" description="Manage Cart Items" className="container-fluid">
            <div className="row">
                    <div className="col-5">
                        {items.length > 0 ? showItems(items) : showNoItems()}
                    </div>

                    <div className="col-4 ml-auto mr-5 my-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h3 className="mb-4">Your Cart Summary</h3>
                                    <hr/>
                                    <Checkout products={items}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
    );
};

export default Cart;

import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import {showCart, removeItem} from "./CartHelper";
import {Link} from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(showCart())
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart have {`${items.length}`} items</h2>
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

    console.log("Hi: " + items);

    return (
        <Layout title="Shopping Cart" description="Manage Cart Items" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : showNoItems()}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;

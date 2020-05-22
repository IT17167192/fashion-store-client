import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import {Link} from "react-router-dom";
import {listOrders, getStatusValues, updateOrderStatus} from "./ApiAdmin";
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const {user, token} = isAuthenticate();

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if(data.error){
        console.log(data.error);
      }
      else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if(data.error){
        console.log(data.error);
      }
      else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if(orders.length > 0){
      return(
          <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      )
    }
    else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const showInput = (key, value) => (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input type="text" value={value} className="form-control" readOnly/>
      </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
          if(data.error){
            console.log("Status update failed");
          }
          else {
            loadOrders();
          }
        })
  };

  const showStatus = ord => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {ord.status}</h3>
      <select className="form-control" onChange={(e) => handleStatusChange(e, ord._id)}>
        <option>Update Status</option>
        {statusValues.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
        ))}
      </select>
    </div>
  );

  return (
      <Layout title="Orders" description={`Welcome back ${user.name}, you may manage all the orders here!`}
              className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {showOrdersLength()}

            {orders.map((ord, ordIndex) => {
              return(
                  <div className="mt-5" key={ordIndex} style={{borderBottom: "5px solid indigo"}}>
                    <h2 className="mb-5">
                      <span className="bg-primary">Order ID: {ord._id}</span>
                    </h2>
                    <ul className="list-group mb-2">
                      <li className="list-group-item">Status: {showStatus(ord)}</li>
                      <li className="list-group-item">Transaction ID: {ord.transaction_id}</li>
                      <li className="list-group-item">Amount: ${ord.amount}</li>
                      <li className="list-group-item">Ordered By: {ord.user.name}</li>
                      <li className="list-group-item">Ordered On: {moment(ord.createdAt).fromNow()}</li>
                      <li className="list-group-item">Delivery Address: {ord.address}</li>
                    </ul>
                    <h3 className="mt-4 mb-4 font-italic">
                      Total Products of the Order: {ord.products.length}
                    </h3>
                    {ord.products.map((prod, prodIndex) => (
                        <div className="mb-4" key={prodIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                          {showInput('Product Name', prod.name)}
                          {showInput('Product Price', prod.price)}
                          {showInput('Product Total', prod.count)}
                          {showInput('Product ID', prod._id)}
                        </div>
                    ))}
                  </div>
              );
            })}
          </div>
        </div>
      </Layout>
  );

};

export default Orders;
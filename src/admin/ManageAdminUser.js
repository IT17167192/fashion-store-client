import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import {addAdminUser} from "./ApiAdmin";

const ManageAdminUser = () => {
    const {user, token} = isAuthenticate();
    const [roles] = useState([
        {roleName: "Admin", roleId: "1"}, {roleName: "Store Manager", roleId: "2"}
    ]);

    const manageUser = () => (
        <div className="col-md-8 col-sm-8 col-lg-8 container-fluid">

        </div>
    );

    return (
        <Layout title="Add new user" description={`Welcome back ${user.name}, Add a new user now!`}
                className="container-fluid">
            {manageUser()}
            <hr/>
        </Layout>
    );
};

export default ManageAdminUser;

import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import { Link } from "react-router-dom";
import {read, update, updateUser} from "./apiUser";

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const {token} = isAuthenticate();
    const {name, email, password, error, success} = values;

    const init = (userId) => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        });
    };

    useEffect(() => {
        init(match.params.userId)
    }, []);

    return (
        <Layout
            title="Profile"
            description="Update Profile"
            className="container-fluid"
            >

            {JSON.stringify(values)}

        </Layout>
    )
};

export default Profile;

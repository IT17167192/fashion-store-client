import React from "react";
import {API} from "../config";

const ShowCartImage = ({item, url}) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/image/${item._id}`}
            className="mb-3"
            style={{height: "150px", width: "150px"}}
        />
    </div>
);

export default ShowCartImage;

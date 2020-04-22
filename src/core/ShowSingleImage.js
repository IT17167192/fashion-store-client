import React from "react";
import {API} from "../config";

const ShowSingleImage = ({item, url}) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/image/${item._id}`}
            className="mb-3"
            style={{height: "500px", width: "500px"}}
        />
    </div>
);

export default ShowSingleImage;

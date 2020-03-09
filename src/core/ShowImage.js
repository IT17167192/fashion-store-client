import React from "react";
import {API} from "../config";

const ShowImage = ({item, url}) => (
    <div className="product-img col-md-2 col-sm-3">
        <img
            src={`${API}/${url}/image/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{height: "300px", width: "300px"}}
        />
    </div>
);

export default ShowImage;

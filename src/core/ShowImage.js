import React from "react";
import {API} from "../config";

const ShowImage = ({item, url}) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/image/${item._id}`}
            alt={item.name}
            className="mb-3 col-auto"
            style={{height: "300px", width: "300px"}}
        />
    </div>
);

export default ShowImage;

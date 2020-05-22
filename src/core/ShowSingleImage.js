import React from "react";
import {API} from "../config";
import Image from 'react-bootstrap/Image'

const ShowSingleImage = ({item, url}) => (
    <div className="product-img">
        <Image src={`${API}/${url}/image/${item._id}`} fluid />
    </div>
);

export default ShowSingleImage;

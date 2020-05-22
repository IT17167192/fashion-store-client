import React, {useState, useEffect} from "react";
import {getImage} from "./apiCore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from 'react-bootstrap/Image'
import {API} from "../config";

const ShopListImage = ({item, url}) => {

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(item._id);
    const [itemDetails, setItemDetails] = useState('');

    const loadImage = (id) => {
        getImage(id).then(data => {
            if (data) {
                setImage(data.url);
                setItemDetails(data);
                setLoading(false);
            }
        })
    };

    useEffect(() => {
        setId(item._id);
        setLoading(true);
        loadImage(id);
    }, []);

    if (loading) {
        return (
            <div style={{height: "182px", width: "360px", marginTop: "40%", marginLeft: "45%"}}>
                <CircularProgress size={30}/>
            </div>
        );
    } else {
        return (
            <a href="javascript : ;">
                <Image className="pic-1" src={image} fluid />
                <Image className="pic-2" src={image} fluid />
            </a>
        )
    }

};

export default ShopListImage;

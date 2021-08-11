import React from "react";

const Image = (props) => {

    let url;
    if(props.img && props.img.url){
        url = props.img.url
    }else if(props.img) {
        url = props.img
    } else {
        url = ""
    }

    return (

        <img className={props.className}
             src={url}
             alt={(props.img && props.img.alt) || "ERROR"}
             width="100%"
             height="100%"
        />

    )

}

export default Image;


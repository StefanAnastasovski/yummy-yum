import React from "react";

const Image = (props) => {

    let url;
    if(props.img.url){
        url = props.img.url
    }else{
        url = props.img
    }

    return (

        <img className={props.className}
             src={url}
             alt={props.img.alt}
             width="100%"
             height="100%"
        />

    )

}

export default Image;


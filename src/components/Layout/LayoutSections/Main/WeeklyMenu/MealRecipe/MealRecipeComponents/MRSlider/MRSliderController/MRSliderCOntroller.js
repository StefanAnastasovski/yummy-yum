import React from "react";


import img from '../../../../../../../../../images/MealRecipe/meal1.jpg'

import images from './MealImages/MealOneImages'

const MRSliderController = (props) => {

    return (

        <img className={""}
             src='https://i.ibb.co/6gZcZ6q/meal1.jpg'
             alt={props.alt}
             width="100%"
             height="100%"
        />

    )

}

export default MRSliderController;











// import images from './MealImages/MealOneImages'
// let img = images[0]
//     images.map(({id, src, title, description}) =>
//     <img key={id} src={src} title={title} alt={description}
//     />)
//     console.log(images)
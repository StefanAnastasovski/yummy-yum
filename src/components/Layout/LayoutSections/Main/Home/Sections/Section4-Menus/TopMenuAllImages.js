import React, {Component} from "react";

import AdvImg1 from '../../../../../../../images/MainSection/ms4-menu/adventurous/Burger/1.1.jpg'
import AdvImg2 from '../../../../../../../images/MainSection/ms4-menu/adventurous/HuliHuliChickenRice/2.1.jpg'
import AdvImg3 from '../../../../../../../images/MainSection/ms4-menu/adventurous/CrustedFiletMignon/3.1.jpg'
import AdvImg4 from '../../../../../../../images/MainSection/ms4-menu/adventurous/KoreanFriedChicken/4.1.jpg'

import QASImg1 from '../../../../../../../images/MainSection/ms4-menu/quickandsimple/CrispyCaesarChicken/1.1.jpg'
import QASImg2 from '../../../../../../../images/MainSection/ms4-menu/quickandsimple/CreamyTomato/2.1.jpg'
import QASImg3 from '../../../../../../../images/MainSection/ms4-menu/quickandsimple/Apple&ChickenSalad/3.1.jpg'
import QASImg4 from '../../../../../../../images/MainSection/ms4-menu/quickandsimple/BBQChickenFlatbreads/4.1.jpg'

import CCImg1 from '../../../../../../../images/MainSection/ms4-menu/carbconcious/PorkChop/1.1.jpg'
import CCImg2 from '../../../../../../../images/MainSection/ms4-menu/carbconcious/Ginger-GlazedSalmon/2.1.jpg'
import CCImg3 from '../../../../../../../images/MainSection/ms4-menu/carbconcious/ChiliPork-CrispyRice/3.1.jpg'
import CCImg4 from '../../../../../../../images/MainSection/ms4-menu/carbconcious/ChickenTaco/4.1.jpg'

import LCImg1 from '../../../../../../../images/MainSection/ms4-menu/lowcal/BBQShrimpPizzas/1.1.jpg'
import LCImg2 from '../../../../../../../images/MainSection/ms4-menu/lowcal/GreekSpinach-FetaChicken/2.1.jpg'
import LCImg3 from '../../../../../../../images/MainSection/ms4-menu/lowcal/PorkTenderloin/3.1.jpg'
import LCImg4 from '../../../../../../../images/MainSection/ms4-menu/lowcal/RoastedSalmon/4.1.jpg'

import VegImg1 from '../../../../../../../images/MainSection/ms4-menu/vegetarian/FigGoatCheeseFlatbread/1.1.jpg'
import VegImg2 from '../../../../../../../images/MainSection/ms4-menu/vegetarian/TomatoPestoSpaghetti/2.1.jpg'
import VegImg3 from '../../../../../../../images/MainSection/ms4-menu/vegetarian/BrusselsBrownButterRisotto/3.1.jpg'
import VegImg4 from '../../../../../../../images/MainSection/ms4-menu/vegetarian/CrispyTeriyakiTofuTacos/4.1.jpg'

const TopMenuAllImages = (props) => {

    let img;
    let img1, img2, img3, img4;
    if (props.menuName === "Adventurous") {
        img1 = AdvImg1;
        img2 = AdvImg2;
        img3 = AdvImg3;
        img4 = AdvImg4;
    } else if (props.menuName === "CarbConscious") {
        img1 = CCImg1;
        img2 = CCImg2;
        img3 = CCImg3;
        img4 = CCImg4;
    } else if (props.menuName === "LowCal") {
        img1 = LCImg1;
        img2 = LCImg2;
        img3 = LCImg3;
        img4 = LCImg4;
    } else if (props.menuName === "QuickAndSimple") {
        img1 = QASImg1;
        img2 = QASImg2;
        img3 = QASImg3;
        img4 = QASImg4;
    } else if (props.menuName === "vegetarian") {
        img1 = VegImg1;
        img2 = VegImg2;
        img3 = VegImg3;
        img4 = VegImg4;
    }

    if (props.imgNumber) {
        if (props.imgNumber === "1") {
            img = img1;
        } else if (props.imgNumber === "2") {
            img = img2;
        } else if (props.imgNumber === "3") {
            img = img3;
        } else if (props.imgNumber === "4") {
            img = img4;
        }
    }

    return (
        <img className={"ms4-" + props.shortenMenuNameLowercase + "img-" + props.imgNumber}
             src={img}
             alt={props.alt}
             width="100%"
             height="100%"
        />
    )

};


export default TopMenuAllImages;


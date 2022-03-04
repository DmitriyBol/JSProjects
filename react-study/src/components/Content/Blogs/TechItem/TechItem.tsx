import React, {useState} from "react";
import TechTitleEnum from "./TechItemEnum";


interface ITechItem {
    type: TechTitleEnum;
    active: boolean;
    notUsed?: boolean;
}

const TechItem = (props: ITechItem) => {

    return (
        <div className={props.active ? 'tech_used_item-active' : props.notUsed ? 'tech_used_item-notUsed' : 'tech_used_item'}>
            {props.type}
        </div>
    )
}

export default TechItem;
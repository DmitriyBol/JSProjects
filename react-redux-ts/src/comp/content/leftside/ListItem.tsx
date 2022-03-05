import React from "react";

interface ItemData {
    country: string;
    name: string;
    price: number;
    val: string;
}

const ListItem = (props: ItemData) => {
    return (
        <li className='main-content_left-cont_list_item'>
            <span className='main-content_left-cont_list_item_image' />
            <div className='main-content_left-cont_list_item_info'>
                <span>Цена: {props.price} {props.val}</span>
                <span>Название: {props.name}</span>
                <span>Страна: {props.country}</span>
            </div>

        </li>
    )
}

export default ListItem;
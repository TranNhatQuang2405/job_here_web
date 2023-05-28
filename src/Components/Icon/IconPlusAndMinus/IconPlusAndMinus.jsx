import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import "./IconPlusAndMinus.css"


function IconPlusAndMinus() {
    return (
        <div className="IconPlusAndMinus__box">
            <PlusCircleOutlined />
            <MinusCircleOutlined />
        </div>
    )
}

export default IconPlusAndMinus
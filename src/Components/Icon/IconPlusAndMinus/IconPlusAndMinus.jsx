import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import "./IconPlusAndMinus.css"


function IconPlusAndMinus({ onAdd, onDel }) {
    return (
        <div className="IconPlusAndMinus__box">
            <PlusCircleOutlined onClick={onAdd} />
            <MinusCircleOutlined onClick={onDel} />
        </div>
    )
}

export default IconPlusAndMinus
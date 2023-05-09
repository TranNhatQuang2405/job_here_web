import React from 'react'
import { Spinner } from 'react-bootstrap'
import "./IconSpinner.css"
function IconSpinner() {
    return (
        <div className="IconSpinner__box">
            <Spinner variant='danger' animation='border' />
        </div>
    )
}

export default IconSpinner
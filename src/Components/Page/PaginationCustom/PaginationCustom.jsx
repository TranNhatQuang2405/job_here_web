import React from 'react'
import _ from 'underscore'
import { Pagination } from 'react-bootstrap'

function PaginationCustom({ totalPage, onChangePage, currentPage }) {
    
    return (
        <div className="d-flex justify-content-center align-items-center my-3">
            {totalPage > 0 && (
                <Pagination>
                    <Pagination.First onClick={onChangePage(0)} />
                    <Pagination.Prev onClick={onChangePage(currentPage - 1)} />
                    {_.map([...Array(totalPage)], (item, index) => (
                        <Pagination.Item
                            key={index}
                            active={index === currentPage}
                            onClick={onChangePage(index)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={onChangePage(currentPage + 1)} />
                    <Pagination.Last onClick={onChangePage(totalPage - 1)} />
                </Pagination>
            )}
        </div>
    )
}

export default PaginationCustom
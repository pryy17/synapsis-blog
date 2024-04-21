import next from 'next'
import React from 'react'

type Props = {
    pageNumber: number,
    next: () => void,
    back: () => void
}

const Paginate = (props: Props) => {
    const {pageNumber, next, back} = props
    return (
        <div className="join mx-auto">
            <button onClick={() => back()} className="join-item btn bg-blue-700 text-white">«</button>
            <button className="join-item btn bg-white">Page {pageNumber}</button>
            <button onClick={() => next()} className="join-item btn bg-blue-700 text-white">»</button>
        </div>
    )
}

export default Paginate
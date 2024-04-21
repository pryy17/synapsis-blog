import { Post } from '@/type/dataType'
import Link from 'next/link'
import React from 'react'

type Props = {
    class?: string | undefined,
    post: Post
}

const CardBlog = (props: Props) => {
    const { body, title, id } = props.post
    return (
        <div className={props.class}>
            <div className="card w-fit md:w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>
                        {
                            body.length >= 100 ?
                                body.substring(0, 100) + '...'
                                : body}
                    </p>
                    <div className="card-actions justify-end">
                        <Link href={`/blog/${id}`}>
                            <button className="btn btn-primary">Read More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardBlog
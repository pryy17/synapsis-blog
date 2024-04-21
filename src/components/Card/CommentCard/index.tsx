import { CommentType } from '@/type/dataType'
import React from 'react'

type Props = {
    className?: string | null,
    dataComment: CommentType
}

const CommentCard = (props: Props) => {
    const {body, email, name} = props.dataComment
    return (
        <div className='mb-4'>
            <div className="chat chat-start">
                <div className="chat-header">
                    {name}
                    <time className="text-xs opacity-50"> ({email})</time>
                </div>
                <div className="chat-bubble text-xl">{body}</div>
            </div>
        </div>
    )
}

export default CommentCard
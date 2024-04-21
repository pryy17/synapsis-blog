'use client'
import CommentCard from '@/components/Card/CommentCard'
import Navbar from '@/components/Navbar'
import { getComment, getPostDetail } from '@/services/api'
import { Post, CommentType } from '@/type/dataType'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}
type Params = {
  idBlog: string
}

const idBlog = (props: Props) => {
  const [dataPost, setDataPost] = useState<Post>();
  const [dataComment, setDataComment] = useState<CommentType[]>();
  const params = useParams<Params>()
  useEffect(() => {
    getPostDetail(params.idBlog).then((res: Post) => {
      setDataPost(res)
    })
    getComment(params.idBlog).then((res: CommentType[]) => {
      setDataComment(res)
    })
  }, [])
  return (
    <div>
      <Navbar />
      <section className='md:px-24 px-5 mt-5'>
        <div className="text-xl breadcrumbs">
          <ul>
            <li><a>{dataComment?.length} comments</a></li>
          </ul>
        </div>
        <h1 className='text-5xl'>
          {dataPost?.title}
        </h1>
      </section>
      <section className='md:px-24 px-5 mt-5'>
        <div className='background_blog bg-no-repeat bg-cover bg-center px-5 py-10 backdrop-blur-md rounded-lg' style={{ backgroundImage: "url('https://c1.wallpaperflare.com/preview/438/417/247/skyscraper-architecture-city-futuristic.jpg')" }}>
          <div className="card w-9/12 glass shadow-xl">
            <div className="card-body">
              <p className=''>{dataPost?.body}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="divider divider-accent text-2xl my-9">Comments</div>
      <section className='md:px-24 px-5 mt-5'>
        {
          dataComment?.map(item => (
            <CommentCard key={item.id} dataComment={item} />
          ))
        }

      </section>
    </div>
  )
}

export default idBlog
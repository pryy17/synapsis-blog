"use client"
import CardBlog from '@/components/Card/CardBlog'
import Navbar from '@/components/Navbar'
import Paginate from '@/components/Pagination/Paginate'
import { getPost } from '@/services/api'
import { Post } from '@/type/dataType'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

type Props = {}

const blog = (props: Props) => {
    const [dataPosts, setDataPosts] = useState<Post[]>();
    const [paginate, setPaginate] = useState<{ pageNumber: number, totalPages: number }>({
        pageNumber: 1,
        totalPages: 0
    })
    function handlePaginate(array: Post[] | undefined, page_size: number, page_number: number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array?.slice((page_number - 1) * page_size, page_number * page_size);
    }
    const handleNextBack = {
        next: () => {
            if (paginate.pageNumber < paginate.totalPages) {
                setPaginate({
                    ...paginate,
                    pageNumber: paginate.pageNumber + 1
                })
            }
        },
        back: () => {
            if (paginate.pageNumber !== 1) {
                setPaginate({
                    ...paginate,
                    pageNumber: paginate.pageNumber - 1
                })
            }
        }
    }
    useEffect(() => {
        if (!dataPosts) toast.loading('loading content...')
        getPost().then((res: Post[]) => {
            setDataPosts(res)
            setPaginate({
                ...paginate,
                totalPages: Math.ceil(res.length / 6)
            })
            toast.dismiss()
        })
    }, [])
    return (
        <div className='min-h-screen'>
            <div>
                <Navbar />
                <section className='md:px-24 px-5 my-5'>
                    <p className='font-light text-lg'>{dataPosts?.length} ARTICLES</p>
                    <h1 className='font-semibold text-5xl'>Article</h1>
                </section>
                <section className='md:px-24 px-5 grid md:grid-cols-3 grid-cols-1 gap-4'>
                    {
                        handlePaginate(dataPosts, 6, paginate.pageNumber)?.map(item => (
                            <CardBlog key={item.id} class="mb-5" post={item} />
                        ))
                    }

                </section>
                <section className='w-full flex justify-center mt-10'>
                    <Paginate back={() => handleNextBack.back()} next={() => handleNextBack.next()} pageNumber={paginate.pageNumber} />
                </section>
            </div>
            <Toaster />
        </div>
    )
}

export default blog
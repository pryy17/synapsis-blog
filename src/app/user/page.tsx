"use client"
import UserCard from '@/components/Card/UserCard'
import ModalForm from '@/components/Modal/ModalForm'
import Navbar from '@/components/Navbar'
import Paginate from '@/components/Pagination/Paginate'
import { getUsers } from '@/services/api'
import { UserType } from '@/type/dataType'
import React, { useEffect, useState } from 'react'

type Props = {}

const User = (props: Props) => {
    const [dataUsers, setDataUsers] = useState<UserType[]>()
    const currentDataUser = () => {
        getUsers().then((res: UserType[]) => {
            setDataUsers(res)
            setPaginate({
                ...paginate,
                totalPages: Math.ceil(res.length / 6)
            })
        })
    }

    const [paginate, setPaginate] = useState<{ pageNumber: number, totalPages: number }>({
        pageNumber: 1,
        totalPages: 0
    })
    function handlePaginate(array: UserType[] | undefined, page_size: number, page_number: number) {
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
        currentDataUser()
    }, [])
    return (
        <div>
            <Navbar />
            <section className='md:px-24 px-5 mt-5'>
                <div className="text-lg breadcrumbs">
                    <ul>
                        <li><a>Users Management</a></li>
                        <li><a>0 users</a></li>
                    </ul>
                </div>
            </section>
            <section className='md:px-24 px-5 mt-7'>
                <ModalForm updateData={() => { currentDataUser() }} />
            </section>
            <section className='md:px-24 px-5 mt-7 grid grid-cols-1 md:grid-cols-2 gap-3'>
                {
                    handlePaginate(dataUsers, 6, paginate.pageNumber)?.map(item => (
                        <UserCard key={item.id} dataUser={item} updateData={() => { currentDataUser() }} />
                    ))
                }
            </section>
            <section className='w-full flex justify-center mt-10'>
                <Paginate back={() => handleNextBack.back()} next={() => handleNextBack.next()} pageNumber={paginate.pageNumber} />
            </section>
        </div>
    )
}

export default User
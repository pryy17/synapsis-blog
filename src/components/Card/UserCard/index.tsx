import ModalForm from '@/components/Modal/ModalForm'
import { deleteUser, getUserDetail, updateUser } from '@/services/api'
import { UserType } from '@/type/dataType'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type Props = {
    dataUser: UserType,
    updateData : () => void
}

const UserCard = (props: Props) => {
    const { name, email, status, gender, id } = props.dataUser;
    const [dataUser, setDataUser] = useState<UserType>();

    useEffect(() => {
        getUserDetail(id).then((res: UserType) => {
            setDataUser(res)
        })
    }, [])
    const handleDeleteUser = () => {
        deleteUser(id).then(()=> {
            props.updateData()
            toast.success('success delete data')
        })
    }
    return (
        <div className='mt-4'>
            <div className="card md:card-side bg-base-100 shadow-xl max-w-[35em] min-h-60">
                <figure className='overflow-hidden md:w-48 rounded-md mt-4 md:mt-0'><img src="https://user.marks222.com/uploads/editors/default-avatar.png" alt="anonym" className='w-80 md:w-64' /></figure>
                <div className="card-body text-sm">
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
                    <p>Gender : {gender}</p>
                    <p>Status : {status}</p>
                    <div className="card-actions justify-end">
                        <ModalForm textButton='Edit' userEdit={dataUser} updateData={() => {props.updateData()}}/>
                        <button className="btn btn-error text-white" onClick={handleDeleteUser}>Delete</button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default UserCard
"use client"
import { getUsers, postNewUser, updateUser } from '@/services/api'
import { UserType, UserTypeNoId } from '@/type/dataType'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type Props = {
    userEdit?: UserType,
    textButton?: string,
    updateData: () => void
}

const ModalForm = (props: Props) => {
    const { textButton = "Add User", userEdit, updateData } = props
    const [user, setUser] = useState<UserTypeNoId>({
        name: props.userEdit?.name,
        email: props.userEdit?.email,
        gender: props.userEdit?.gender,
        status: props.userEdit?.status
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === "name") {
            setUser({
                ...user,
                name: e.currentTarget.value,
            })
        }
        if (e.currentTarget.name === "email") {
            setUser({
                ...user,
                email: e.currentTarget.value,
            })
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading('waiting...')
        if (userEdit) {
            updateUser(userEdit.id, user).then(() => {
                toast.remove()
                setIsOpen(false)
                updateData()
                toast.success('data has been change ')
            })
        } else {
            postNewUser(user).then(() => {
                toast.remove()
                setIsOpen(false)
                updateData()
                toast.success('data has been saved')
            }).catch(() => {
                toast.remove()
                toast.error('error data saved')
            })
        }
    }
    return (
        <div>
            <button className="btn btn-primary text-white" onClick={() => {
                setIsOpen(true); if (userEdit) {
                    setUser(
                        {
                            ...user,
                            gender: userEdit.gender,
                            status: userEdit.status
                        }
                    )
                }
            }}>{textButton}</button>
            <dialog id="my_modal_1" className="modal shadow-lg backdrop-blur-md" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add User</h3>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit}>
                            <label className="input input-bordered flex items-center gap-2 mb-4">
                                Name
                                <input defaultValue={props.userEdit && props.userEdit?.name} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeInput(e)} name='name' type="text" className="grow" placeholder="Joko" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-4">
                                Email
                                <input defaultValue={props.userEdit && props.userEdit?.email} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeInput(e)} name='email' type="text" className="grow" placeholder="joko@example.com" />
                            </label>
                            <select value={user.gender? user.gender : ""} onChange={(option: React.FormEvent<HTMLSelectElement>) => { setUser({ ...user, gender: option.currentTarget.value }) }} name='gender' className="select select-bordered w-full max-w-lg mb-4">
                                <option value="" disabled>Select gender</option>
                                <option value="male" >Male</option>
                                <option value="female">Female</option>
                            </select>

                            <select value={user.status? user.status : ""} onChange={(option: React.FormEvent<HTMLSelectElement>) => { setUser({ ...user, status: option.currentTarget.value }) }} name='status' className="select select-bordered w-full max-w-lg mb-4">
                                <option value="" disabled>Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button className='btn btn-primary me-3' type='submit'> Submit </button>
                            <button className="btn" type='button' onClick={() => { setIsOpen(false) }}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <Toaster />
        </div>
    )
}

export default ModalForm
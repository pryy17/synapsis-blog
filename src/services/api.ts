import { CommentType, Post, UserType, UserTypeNoId } from "@/type/dataType"
import request from "./config"
// get
export const getPost = () => request.get<Post[]>('/public/v2/posts')
export const getPostDetail = (postId : string | number) => request.get<Post>(`/public/v2/posts/${postId}`)
export const getComment = (postId : string | number) => request.get<CommentType[]>(`/public/v2/posts/${postId}/comments`)
export const getUsers = () => request.get<UserType[]>('/public/v2/users')
export const getUserDetail = (userId: string | number) => request.get<UserType>(`/public/v2/users/${userId}`)

// post
export const postNewUser = (body: UserTypeNoId) => request.post<UserType>('/public/v2/users', body)

// put
export const updateUser = (idUser: string | number, body: UserTypeNoId) => request.put<UserType>(`/public/v2/users/${idUser}`, body)

// delete
export const deleteUser = (idUser: string | number) => request.del<UserType>(`/public/v2/users/${idUser}`)
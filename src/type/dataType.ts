export type Post = {
    id: string | number,
    user_id: string | number,
    title: string,
    body: string
}

export type UserType = {
    id: string | number,
    name: string,
    email: string,
    gender: string,
    status: string
}

export type UserTypeNoId = {
    name?: string,
    email?: string,
    gender?: string,
    status?: string
}

export type CommentType = {
    id: string | number,
    post_id: string | number,
    name: string,
    email: string,
    body: string
}
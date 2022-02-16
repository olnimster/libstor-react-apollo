import React from "react";

export type BooksType = {
    books: [BookType]
}

export type BookType = {
    id: number
    title: string
    author: string
    cover: string
    likesCount: number
    annotation: string
    price: number
    looks: number
    genre: [string: boolean]
}

export type DataBookType = {
    book: {
        id: number
        title: string
        author: string
        cover: string
        likesCount: number
        annotation: string
        price: number
        looks: number
        genre: [string: boolean]
    }
}

export type CommentsType = {
    id: number
    body: string
    createdAt: string
    publicName: string
    user: number
    avatar: string
}

export type commType = {
    avatar: string
    publicName: string
    user: number
    body: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
    id: number
    createdAt: string
}

export type idParamType = {
    id: string
}

export type userContextType = {
    login: (userData: any) => void
    logout: () => void
    user?: userType | null
}

export type userType = {
    avatar: string | null | undefined
    createdAt: string
    email: string
    exp: number
    iat: number
    id: string
    publicName: string
    username: string
    writer: boolean
}
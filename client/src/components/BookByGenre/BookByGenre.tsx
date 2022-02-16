import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import {GET_BOOK_BY_GENRE, GET_BOOKSHELF} from "../Util/graphql";
import Grid from "@material-ui/core/Grid";
import BigCard from "../Card/BigCard";
import {useParams} from "react-router";
import {AuthContext} from "../Authorization/auth";
import Loader from "../Util/Loader/Loader";
import ErrorMessage from "../Util/ErrorMessage/ErrorMessage";
import {BookType} from "../types/types";

type useParamsType = {
    genre: string
}



export const BookByGenre = (): JSX.Element => {

    let {genre}: useParamsType = useParams();
    const {user} = useContext(AuthContext);
    const {loading, error, data: {getBooksByGenre: books} = {}} = useQuery(GET_BOOK_BY_GENRE, {variables: {genre}});
    const {loading: loadingBS, data: {getBooksFormBookshelf} = {}} = useQuery(GET_BOOKSHELF, {skip: (!user)});

    if (loading || loadingBS) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;

    return (
        <Grid container direction="column" alignItems="center" >
            {books && books.map((book:  BookType ) => (
                <BigCard key={book.id} book={book}
                         isBookInBookshelf = {getBooksFormBookshelf  && (!!(getBooksFormBookshelf.find((el: BookType) => el.id === book.id)))}
                />
            ))}
        </Grid>
    );
};
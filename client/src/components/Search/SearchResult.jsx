import React from 'react';
import {useParams} from "react-router";
import {useQuery} from "@apollo/client";
import {GET_BOOKS_BY_AUTHOR_AND_TITLE} from "../Util/graphql";
import Grid from "@material-ui/core/Grid";
import BigCard from "../Card/BigCard";
import Loader from "../Util/Loader/Loader";
import ErrorMessage from "../Util/ErrorMessage/ErrorMessage";


export const SearchResult = () => {
    let {author, title} = useParams();

    if (author === 'false'){ author = ''}
    if (title === 'false'){ title = ''}

    const {loading, error, data: {getBooksByAuthorAndTitle: books} = {}} =
        useQuery(GET_BOOKS_BY_AUTHOR_AND_TITLE, {variables: {author: author, title: title}});

    if (loading) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;

    return (
        <Grid container direction="column" alignItems="center" >
            {books && books.map((book) => (
                <BigCard key={book.id} book={book}/>
            ))}
        </Grid>
    );
};
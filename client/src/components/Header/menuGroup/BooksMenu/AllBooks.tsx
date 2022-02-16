import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import {BOOKS_QUERY, GET_BOOKSHELF} from "../../../Util/graphql";
import Grid from "@material-ui/core/Grid";
import BigCard from "../../../Card/BigCard";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {AuthContext} from "../../../Authorization/auth";
import Loader from "../../../Util/Loader/Loader";
import ErrorMessage from "../../../Util/ErrorMessage/ErrorMessage";
import {BookType} from "../../../types/types";

const useStyles = makeStyles(() => ({
    textHeader: {
        textAlign: 'center',
        margin: '10px'
    },
}));

export const AllBooks: React.FC = () => {
    const {user} = useContext(AuthContext);
    const classes = useStyles();
    const {loading, error, data: {getBooks: books} = {}} = useQuery(BOOKS_QUERY);
    const {loading: loadingBS, data: {getBooksFormBookshelf} = {}} = useQuery(GET_BOOKSHELF, {skip: (!user)});

    if (loading || loadingBS) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;

    return (
        <Grid>
            <Grid className={classes.textHeader}>
                <Typography variant="h5" component="h4">
                    All books
                </Typography>
            </Grid>
            {books && books.map((book: BookType) => (
                <BigCard key={book.id} book={book}
                         isBookInBookshelf={getBooksFormBookshelf && (!!(getBooksFormBookshelf.find((el: BookType) => el.id === book.id)))}/>
            ))}
        </Grid>
    );
};
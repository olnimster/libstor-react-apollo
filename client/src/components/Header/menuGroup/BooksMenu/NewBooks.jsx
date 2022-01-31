import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import {GET_BOOKS_SORT_BY_DATA_DESCENDING, GET_BOOKSHELF} from "../../../Util/graphql";
import Grid from "@material-ui/core/Grid";
import BigCard from "../../../Card/BigCard";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {AuthContext} from "../../../Authorization/auth";
import Loader from "../../../Util/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    textHeader: {
        textAlign: 'center',
        margin: '10px'
    },
}));

const NewBooks = () => {
    const classes = useStyles();
    const {user} = useContext(AuthContext);
    const {
        loading,
        error,
        data: {getBooksSortByDataDescending: books} = {}
    } = useQuery(GET_BOOKS_SORT_BY_DATA_DESCENDING);
    const {loading: loadingBS, data: {getBooksFormBookshelf} = {}} = useQuery(GET_BOOKSHELF, {skip: (!user)});

    if (loading || loadingBS) return <Loader/>;
    if (error) return `Error! ${error.message}`;

    return (
        <Grid>
            <Grid className={classes.textHeader}>
                <Typography variant="h5" component="h4">
                    New books
                </Typography>
            </Grid>
            {books && books.map((book) => (
                <BigCard key={book.id} book={book}
                         isBookInBookshelf={getBooksFormBookshelf && (!!(getBooksFormBookshelf.find((el) => el.id === book.id)))}/>
            ))}
        </Grid>
    );
};
export default NewBooks;
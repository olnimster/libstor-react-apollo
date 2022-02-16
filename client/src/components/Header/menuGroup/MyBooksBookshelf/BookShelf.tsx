import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_BOOKSHELF} from "../../../Util/graphql";
import Grid from "@material-ui/core/Grid";
import BigCard from "../../../Card/BigCard";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Loader from "../../../Util/Loader/Loader";
import {BookType} from "../../../types/types";
import ErrorMessage from "../../../Util/ErrorMessage/ErrorMessage";

const useStyles = makeStyles(() => ({
    textHeader: {
        textAlign: 'center',
        margin: '10'
    },
}));

export const BookShelf: React.FC = () => {
    const classes = useStyles();
    const {loading, error, data: {getBooksFormBookshelf} = {}} = useQuery(GET_BOOKSHELF);
    if (loading) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;


    return (
        <Grid>
            <Grid className={classes.textHeader}>
                    <Typography variant="h5" component="h4">
                        My bookshelf
                    </Typography>
            </Grid>
            {getBooksFormBookshelf && getBooksFormBookshelf.map((book: BookType) => (
                (
                    book&&<BigCard key={book.id} book={book} isBookInBookshelf={true}/>
                )
            ))}
        </Grid>
    );
};


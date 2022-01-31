import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import Comment from "../Comments/Comment";
import {BOOK_QUERY, GET_BOOKSHELF} from "../Util/graphql";
import CommentCreator from "../Comments/CommentCreator";
import {AuthContext} from "../Authorization/auth";
import BiggestCard from "../Card/BiggestCard";
import Loader from "../Util/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        width: 228,
        height: 328,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    additionalInformation: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const Book = () => {
    const {user} = useContext(AuthContext);
    let {id} = useParams();
    const classes = useStyles();
    let isBookInBookshelf;

    const {loading, error, data: {getBook: book} = {}} = useQuery(BOOK_QUERY, {variables: {id: id}});
    const {loading: loadingU, data: {getBooksFormBookshelf} = {}} = useQuery(GET_BOOKSHELF,  {skip: (!user)} );

    if (loading || loadingU) return <Loader/>;
    if (error) return `Loading error! ${error.message}`;

    if (getBooksFormBookshelf) {
        isBookInBookshelf = (!!(getBooksFormBookshelf.find((el) => el.id === book.id)));
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <BiggestCard book={book} isBookInBookshelf={isBookInBookshelf} />
                <Grid item>
                    <div variant="body2" color="textSecondary">
                        <Typography gutterBottom variant="h5" component={'div'}>
                            Comments
                        </Typography>
                        <CommentCreator bookId={id}/>
                        {book.comments && book.comments.map((comm) => (
                            <Typography key={comm.id} component={'div'}>
                                <Comment comm={comm} bookId={id}/>
                            </Typography>
                        ))}
                    </div>
                </Grid>
            </Paper>
        </div>
    );
}

export default Book;
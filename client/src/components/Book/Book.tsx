import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import Comment from "../Comments/Comment";
import {BOOK_QUERY} from "../Util/graphql";
import CommentCreator from "../Comments/CommentCreator";
import BiggestCard from "../Card/BiggestCard";
import Loader from "../Util/Loader/Loader";
import ErrorMessage from "../Util/ErrorMessage/ErrorMessage";
import {CommentsType, idParamType} from "../types/types";

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

const Book = (): JSX.Element => {
    let {id}: idParamType = useParams();
    const classes = useStyles();
    const {loading, error, data: {getBook: book} = {}} = useQuery(BOOK_QUERY, {variables: {id: id}});

    if (loading) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;

    return (
        <div>
            <Paper className={classes.paper}>
                <BiggestCard book={book} />
                <Grid item>
                        <Typography gutterBottom variant="h5" component={'div'}>
                            Comments
                        </Typography>
                        <CommentCreator bookId={id}/>
                        {book.comments && book.comments.map((comm: CommentsType) => (
                            <Typography key={comm.id} component={'div'}>
                                <Comment comm={comm} bookId={id}/>
                            </Typography>
                        ))}
                </Grid>
            </Paper>
        </div>
    );
}

export default Book;
import React from 'react';
import {useMutation} from "@apollo/client";
import {BOOK_QUERY, DELETE_COMMENT_MUTATION} from "../Util/graphql";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from "../Util/Loader/Loader";


const DeleteCommentButton = ({commentId, bookId}) => {

    const [deleteComment, {loading}] = useMutation(DELETE_COMMENT_MUTATION, {
        refetchQueries: [
            BOOK_QUERY, {variables: {id: bookId}}
        ],
        variables: {
            bookId,
            commentId
        }
    });
    if (loading) return <Loader/>;

    return (
        <div>
            <IconButton aria-label="delete" onClick={deleteComment}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default DeleteCommentButton;
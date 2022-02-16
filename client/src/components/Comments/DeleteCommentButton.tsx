import React from 'react';
import {useMutation} from "@apollo/client";
import {BOOK_QUERY, DELETE_COMMENT_MUTATION} from "../Util/graphql";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from "../Util/Loader/Loader";


type propsType = {
    commentId: number
    bookId: string
}

const DeleteCommentButton = ({commentId, bookId}: propsType): JSX.Element => {

    const [deleteComment, {loading}]: any = useMutation(DELETE_COMMENT_MUTATION, {
        refetchQueries: [
            BOOK_QUERY, bookId
        ],
        variables: {
            bookId,
            commentId
        },
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
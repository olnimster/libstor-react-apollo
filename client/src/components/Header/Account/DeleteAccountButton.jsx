import React from 'react';
import {useMutation} from "@apollo/client";
import {GET_BOOKS_BY_PUBLISHER, MUTATION_DELETE_BOOK} from "../../Util/graphql";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../../Util/Loader/Loader";



const DeleteAccountButton = ({bookId, userId}) => {
    const [deleteBook, {loading}] = useMutation(MUTATION_DELETE_BOOK, {
        refetchQueries: [
            GET_BOOKS_BY_PUBLISHER, {variables: {user: userId}}
        ],
        variables: {
            bookId
        }
    });
    if (loading) return <Loader/>;

    return (
        <div>
            <IconButton aria-label="delete" color="secondary" onClick={deleteBook}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default DeleteAccountButton;
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './reader.module.css';
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {BOOK_QUERY_READ} from "../../Util/graphql";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Editor} from "react-draft-wysiwyg";
import Loader from "../../Util/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '1200px',
        margin: 'auto',
        textAlign: 'justify'
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1100,
        color: 'black',
        fontSize: 'large'
    },
}));

export const Reader = () => {
    const classes = useStyles();
    let { id } = useParams();

    const { loading, error, data: {getBookRead} = {}} = useQuery(BOOK_QUERY_READ,  {variables: {id: id}});
    if (loading) return <Loader />;
    if (error) return `Error! ${error.message}`;

    return (
        <div className={classes.root}>
            <Paper  className={classes.paper}>
                <Editor
                    defaultContentState={getBookRead.body}
                    readOnly={true}
                    toolbarHidden={true}
                />
            </Paper>
        </div>
    )
}

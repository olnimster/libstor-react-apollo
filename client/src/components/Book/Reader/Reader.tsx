import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {BOOK_QUERY_READ} from "../../Util/graphql";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Editor} from "react-draft-wysiwyg";
import Loader from "../../Util/Loader/Loader";
import {idParamType} from "../../types/types";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";

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

export const Reader = (): JSX.Element => {
    const classes = useStyles();
    let { id }: idParamType = useParams();

    const { loading, error, data: {getBookRead} = {}} = useQuery(BOOK_QUERY_READ,  {variables: {id: id}});
    if (loading) return <Loader />;
    if (error) return <ErrorMessage err={error.message}/>;

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

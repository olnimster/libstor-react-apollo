import React from 'react';
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    loader: {
        marginTop: 50,
        margin: 'auto',
        textAlign: 'center'
    },
}));

const Loader = () => {
    const classes = useStyles();
    return (
        <div  className={classes.loader}>
            <CircularProgress />
        </div>
    );
};

export default Loader;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Popular from "./Popular";
import New from "./New";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '1200px',
        margin: 'auto'
    },
}));

const Main: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={1} justifyContent="space-evenly" className={classes.root}>
            <Grid item xs={10}>
                <Popular />
            </Grid>
            <Grid item xs={10}>
                <New />
            </Grid>
        </Grid>
    )
}

export default Main;
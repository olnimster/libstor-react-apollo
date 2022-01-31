import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AuthContext} from "../../Authorization/auth";
import AccountCard from "../../Card/AccountCard";
import {useQuery} from "@apollo/client";
import { GET_BOOKS_BY_PUBLISHER} from "../../Util/graphql";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Loader from "../../Util/Loader/Loader";


const useStyles = makeStyles((theme) => ({
    textHeader: {
        textAlign: 'center',
        margin: '10px'
    },
}));

export const Account = () => {
    const classes = useStyles();
    const {user} = useContext(AuthContext);
    const userId = user.id;

    const {loading, error, data: {getBooksByPublisher} = {}} = useQuery(GET_BOOKS_BY_PUBLISHER, {variables: {user: userId}});
    if (loading) return <Loader/>;
    if (error) return `Error! ${error.message}`;

    return (
        <Grid>
            <Grid className={classes.textHeader}>
                <Typography variant="h5" component="h4">
                    My account
                </Typography>
            </Grid>
            {getBooksByPublisher && getBooksByPublisher.map((book) => (
                <AccountCard key={book.id} book={book} userId={userId}/>
            ))}
        </Grid>
    );
};
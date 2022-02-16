import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AuthContext} from "../../Authorization/auth";
import AccountCard from "../../Card/AccountCard";
import {useQuery} from "@apollo/client";
import { GET_BOOKS_BY_PUBLISHER} from "../../Util/graphql";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Loader from "../../Util/Loader/Loader";
import {BookType} from "../../types/types";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";


const useStyles = makeStyles(() => ({
    textHeader: {
        textAlign: 'center',
        margin: '10px'
    },
}));

export const Account: React.FC = () => {
    const classes = useStyles();
    const {user}: any = useContext(AuthContext);
    const userId = user.id;

    const {loading, error, data: {getBooksByPublisher} = {}} = useQuery(GET_BOOKS_BY_PUBLISHER, {variables: {user: userId}});
    if (loading) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;

    return (
        <Grid>
            <Grid className={classes.textHeader}>
                <Typography variant="h5" component="h4">
                    My account
                </Typography>
            </Grid>
            {getBooksByPublisher && getBooksByPublisher.map((book: BookType) => (
                <AccountCard key={book.id} book={book} userId={userId}/>
            ))}
        </Grid>
    );
};
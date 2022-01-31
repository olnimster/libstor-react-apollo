import React, {useContext} from "react";

import logo from "../../assets/libstor_logo.png"
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BooksButton from "./menuGroup/BooksButton";
import {MyBooksButton} from "./menuGroup/MyBooksButton";
import SearchButton from "./menuGroup/SearchButton";
import NotificationsButton from "./menuGroup/NotificationsButton";
import MailButton from "./menuGroup/MailButton";
import {NavLink} from "react-router-dom";
import AuthGroup from "./menuGroup/AuthGroup";
import {AuthContext} from "../Authorization/auth";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '1200px',
        margin: 'auto'
    },
    logo: {
        width: '150px'
    }
}));

const Header = () => {

    const classes = useStyles();
    const {user} = useContext(AuthContext);
    const isWriter = (user && user.writer);

    return (
        <header className={classes.root}>
            <div>
                <NavLink to='/'>
                    <img className={classes.logo} src={logo} alt="LibStor"/>
                </NavLink>
            </div>
            <hr/>
            <Grid container spacing={3}>
                <Grid item xs>
                    <BooksButton/>
                    {user&&<MyBooksButton userId={user.id}/>}
                </Grid>
                <Grid container
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center" item xs>
                    {isWriter &&
                    (<NavLink to='/addbook' >
                        <Button variant="outlined">Add Book</Button>
                    </NavLink>)
                    }
                    <SearchButton/>
                    {user&&<NotificationsButton/>}
                    {user&&<MailButton/>}
                    <AuthGroup avatar={user && user.avatar}/>
                </Grid>
            </Grid>
            <hr/>
        </header>
    );
}

export default Header;
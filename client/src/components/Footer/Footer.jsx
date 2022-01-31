import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {useHistory} from "react-router";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'CopyrightAuth © '}
            <Link color="inherit" to={'/'}>
                Libstor
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh',
        maxWidth: '1000px',
        margin: 'auto'
    },
    main: {
        display: 'flex',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        textDecorator: ' none',
        '& a': {cursor: 'pointer'}
    },
    socialSection: {
        '& a': {cursor: 'pointer', color: 'black' }
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
    },
}));



export default function Footer() {
    const history = useHistory();
    const onLink = (e) => {
        history.push(`/${e.target.name}`);
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Grid item className={classes.footer}>
                <Grid container item xs={12} className={classes.main}>
                    <Grid item xs className={classes.section}>
                        <Typography variant="h6">SECTIONS</Typography>
                        <Link name={'work'} onClick={onLink} >Selections of works</Link>
                        <Link name={'news'} onClick={onLink} >News</Link>
                        <Link name={'people'} onClick={onLink} >People</Link>
                        <Link name={'detailsearch'} onClick={onLink} >Search</Link>
                    </Grid>
                    <hr/>
                    <Grid item xs className={classes.section}>
                        <Typography variant="h6">INFO</Typography>
                        <Link name={'about'} onClick={onLink} >About the project</Link>
                        <Link name={'help'} onClick={onLink} >Help</Link>
                        <Link name={'conditions'} onClick={onLink} >Conditions</Link>
                    </Grid>
                    <hr/>
                    <Grid item xs className={classes.section}>
                        <Typography variant="h6">WRITE TO US</Typography>
                        <Link name={'ideas'} onClick={onLink} >Suggestions and ideas</Link>
                        <Link name={'support'} onClick={onLink} >Support: support@libstor</Link>

                        <Typography variant="subtitle2">Subscribe to us</Typography>
                        <Grid item xs className={classes.socialSection}>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <FacebookIcon fontSize="large" style={{ padding: 5 }}/>
                            </a>
                            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                                <TwitterIcon fontSize="large" style={{ padding: 5 }}/>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
                <Copyright/>
            </Grid>
        </div>
    );
}
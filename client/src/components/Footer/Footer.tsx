import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';


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
        '& a': {cursor: 'pointer'},
        '& button': {
            border: 'none',
            padding: 0,
            margin: 0,
            fontSize: 15,
            color: theme.palette.primary.main,
            backgroundColor: "transparent"
        }
    },
    socialSection: {
        '& a': {cursor: 'pointer', color: 'black'}
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        '& button': {
            border: 'none',
            padding: 0,
            margin: 0,
            fontSize: 15,
            color: theme.palette.primary.main,
            backgroundColor: "transparent"
        }
    },
}));

const Footer = (): JSX.Element => {
    const history = useHistory();
    const onLink = (e: any) => {
        history.push(`/${e.target.name}`);
    }
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid item className={classes.footer}>
                <Grid container item xs={12} className={classes.main}>
                    <Grid item xs className={classes.section}>
                        <Typography variant="h6">SECTIONS</Typography>
                        <button name={'work'} onClick={onLink}>Selections of works</button>
                        <button name={'news'} onClick={onLink}>News</button>
                        <button name={'people'} onClick={onLink}>People</button>
                        <button name={'detailsearch'} onClick={onLink}>Search</button>
                    </Grid>
                    <hr/>
                    <Grid item xs className={classes.section}>
                        <Typography variant="h6">INFO</Typography>
                        <button name={'about'} onClick={onLink}>About the project</button>
                        <button name={'help'} onClick={onLink}>Help</button>
                        <button name={'conditions'} onClick={onLink}>Conditions</button>
                    </Grid>
                    <hr/>
                    <Grid item xs className={classes.section}>
                        <Typography variant="h6">WRITE TO US</Typography>
                        <button name={'ideas'} onClick={onLink}>Suggestions and ideas</button>
                        <button name={'support'} onClick={onLink}>Support: support@libstor</button>
                        <Typography variant="subtitle2">Subscribe to us</Typography>
                        <Grid item xs className={classes.socialSection}>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <FacebookIcon fontSize="large" style={{padding: 5}}/>
                            </a>
                            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                                <TwitterIcon fontSize="large" style={{padding: 5}}/>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography variant="body2" >
                    {'CopyrightAuth © '}
                    <button name={''} onClick={onLink}>
                        Libstor
                    </button>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Grid>
        </div>
    );
}

export default Footer;
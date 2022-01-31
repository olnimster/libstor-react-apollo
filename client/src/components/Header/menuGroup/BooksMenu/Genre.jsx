import React from 'react';
import Grid from "@material-ui/core/Grid";
import genresList from "../../../../assets/GenresList";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'black',
        paddingBottom: '10px'
    },
    root: {
        textAlign: 'center',
        margin: '10px'
    },
    header: {
        paddingBottom: '10px'
    },
}));

export const Genre = () => {

    const GenreLink = ({genre}) => {
        const classes = useStyles();
        return (
            <Typography variant="body1" component="h5" className={classes.link}>
                <Link to={`/genre/${genre}`} className={classes.link}>
                    {genre}
                </Link>
            </Typography>
        )
    }

    const classes = useStyles();
    return (

        <Grid container direction="column" alignItems="center" className={classes.root}>
            <Grid>
                <Typography variant="h5" component="h4" className={classes.header}>
                    Genres
                </Typography>
            </Grid>
            <Grid container direction="column">
                {
                    Object.keys(genresList).map((key, index) => {
                        return <GenreLink genre={key} key={index}/>
                    })
                }
            </Grid>
        </Grid>
    );
}
;

import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'black',
        paddingRight: '5px'
    }
}));
const GenreLink = ({genre}) => {
    const classes = useStyles();
    return (
        <Link to={`/genre/${genre}`} className={classes.link}>
            #{genre}
        </Link>)
}

const GenreTeg = ({book}) => {
    return (
        <Typography variant="body2" color="textSecondary">
            Genre: {Object.keys(book.genre).filter((key, index) =>
            book.genre[key]).map((key, index) => {
            return <GenreLink genre={key} key={index}/>
        })
        }
        </Typography>
    );
}

export default GenreTeg;
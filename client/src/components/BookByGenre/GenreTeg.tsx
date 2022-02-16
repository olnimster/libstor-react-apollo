import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

type PropsType = {
    genre?: string
    book?: any
    key?: number

}

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'black',
        paddingRight: '5px'
    }
}));
const GenreLink: FC<PropsType> = ({genre}):JSX.Element => {
    const classes = useStyles();
    return (
        <Link to={`/genre/${genre}`} className={classes.link}>
            #{genre}
        </Link>)
}

const GenreTeg = ({book}: PropsType): JSX.Element => {
    return (
        <Typography variant="body2" color="textSecondary">
            Genre: {Object.keys(book.genre).filter((key) =>
            book.genre[key]).map((key, index) => {
            return (
                <GenreLink genre={key} key={index} />
            )
        })
        }
        </Typography>
    );
}

export default GenreTeg;
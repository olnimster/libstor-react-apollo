import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import {IMGPATH, PLUG} from "../Util/config";

const useStyles = makeStyles({
    root: {
        width: 180,
        height: 400,
        margin: 10,
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    }
});

const CardOne = ({book}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Link to={`/book/${book.id}`} className={classes.link}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Book Title"
                        height="250"
                        image={!book.cover ? `${IMGPATH}${PLUG}` : `${IMGPATH}${book.cover}`}
                        title={book.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {book.title}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="h3">
                            {book.author}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}

export default CardOne;
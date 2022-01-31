import React, {useContext} from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddToBookshelf from "../Header/menuGroup/MyBooksBookshelf/AddToBookshelf";
import {AuthContext} from "../Authorization/auth";
import {useQuery} from "@apollo/client";
import {GET_BOOKSHELF} from "../Util/graphql";
import GenreTeg from "../BookByGenre/GenreTeg";
import LikeButton from "../Like/LikeButton";
import {IMGPATH, PLUG} from "../Util/config";
import Loader from "../Util/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 5
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        width: 180,
        height: 240,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    additionalInformation: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    footerCard: {
        placeContent: "space-between"
    }
}));

const BiggestCard = ({book}) => {
    const classes = useStyles();
    const {user} = useContext(AuthContext);
    let isBookInBookshelf;
    const {loading, data: {getBooksFormBookshelf} = {}} = useQuery(GET_BOOKSHELF, {skip: (!user)});

    if (loading) return <Loader/>;

    if (getBooksFormBookshelf) {
        isBookInBookshelf = (!!(getBooksFormBookshelf.find((el) => el.id === book.id)));
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex"
                                 src={!book.cover ? `${IMGPATH}${PLUG}` : `${IMGPATH}${book.cover}`}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h5">
                                    {book.title}
                                </Typography>
                                <Link className={classes.link} to={`/search/${(book.author)}${('/' + false)}`}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        {book.author}
                                    </Typography>
                                </Link>
                                <Typography variant="body1" color="textSecondary">
                                    {book.annotation&&book.annotation}
                                </Typography>
                                <Typography variant="body2" color="textSecondary"
                                            className={classes.additionalInformation}>
                                    looks: {book.looks}
                                    <LikeButton bookId={book.id} likesCount={book.likesCount}/>
                                </Typography>
                                <GenreTeg book={book}/>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">$ {book.price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid className={classes.footerCard} container>
                    <Grid item>
                        <Link to={`/reader/${book.id}`} className={classes.link}>
                            <Button>Read book</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        {user && <AddToBookshelf isBookInBookshelf={isBookInBookshelf} bookId={book.id}/>}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default BiggestCard;
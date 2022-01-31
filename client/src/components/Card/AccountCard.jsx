import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import GenreTeg from "../BookByGenre/GenreTeg";
import {Link} from "react-router-dom";
import ConfirmationDialog from "../Header/Account/ConfirmationDialog";
import {IMGPATH, PLUG} from "../Util/config";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
        width: 128,
        height: 180,
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
    button: {
        color: '#3F51B5'
    },
    footerCard: {
        placeContent: "space-between"
    }
}));

const AccountCard = ({book, userId}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Link className={classes.link} to={`/book/${book.id}`}>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex"
                                     src={!book.cover ? `${IMGPATH}${PLUG}` : `${IMGPATH}${book.cover}`}/>
                            </ButtonBase>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Link className={classes.link} to={`/book/${book.id}`}>
                                    <Typography gutterBottom variant="h5">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        {book.author}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        looks: {book.looks}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {(book.annotation.length < 400) ? (book.annotation) : (book.annotation.slice(0, 222) + '...')}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" color="textSecondary"
                                            className={classes.additionalInformation}>
                                    <VisibilityIcon style={{color: "blue", fontSize: 16, paddingRight: 5}}/>
                                    looks: {book.looks}
                                </Typography>
                                <Typography variant="body2" color="textSecondary"
                                            className={classes.additionalInformation}>
                                    <FavoriteIcon style={{color: "red", fontSize: 14, paddingRight: 5}}/>
                                    likes: {book.likesCount}
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
                        <Link to={`/editor/${book.id}`} className={classes.link}>
                            <Button>Edit</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <ConfirmationDialog userId={userId} book={book}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default AccountCard;